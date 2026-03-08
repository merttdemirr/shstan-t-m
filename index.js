const express=require("express")
const app=express()

const path=require("path")
const userRoutes=require("./routes/user")

// SITEMAP PAKETLERİ
const { SitemapStream, streamToPromise } = require('sitemap');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/libs",express.static(path.join(__dirname,"node_modules")))
app.use("/static",express.static(path.join(__dirname,"public")))

app.set("view engine","ejs")

// --- SITEMAP ROUTE EKLENDİ ---
const pages = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/hakkimizda', changefreq: 'monthly', priority: 0.8 },
    { url: '/faaliyet', changefreq: 'weekly', priority: 0.9 },
    { url: '/temsilci/basvuru', changefreq: 'weekly', priority: 0.9 },
    // İleride yeni sayfaları buraya ekleyebilirsin
];

app.get('/sitemap.xml', async (req, res) => {
    try {
        const smStream = new SitemapStream({ hostname: 'https://www.shsen.org' });
        pages.forEach(page => smStream.write(page));
        smStream.end();

        const sitemap = await streamToPromise(smStream);
        res.header('Content-Type', 'application/xml');
        res.send(sitemap.toString());
    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
});

// --- ROUTES ---
app.use(userRoutes)

app.listen(3000,function(){
    console.log("listening on port 3000")
})