const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { SitemapStream, streamToPromise } = require('sitemap');

const userRoutes = require("./routes/user");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/libs", express.static(path.join(__dirname,"node_modules")));
app.use("/static", express.static(path.join(__dirname,"public")));
app.get("/robots.txt", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "robots.txt"));
});


app.set("view engine", "ejs");

// --- DİNAMİK SITEMAP ---
app.get('/sitemap.xml', async (req, res) => {
    try {
        const smStream = new SitemapStream({ hostname: 'https://www.shsen.org' });

        const viewsPath = path.join(__dirname, "views");

        const walk = (dir) => {
            const list = fs.readdirSync(dir);
            list.forEach(file => {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);

                if(stat && stat.isDirectory()){
                    walk(filePath); // alt klasörleri gez
                } else if(path.extname(file) === ".ejs") {
                    // Relative path al
                    const relativePath = path.relative(viewsPath, filePath).replace(/\\/g, "/");

                    // Partial ve layout klasörlerini hariç tut
                    if(!relativePath.startsWith("partials/") && !relativePath.startsWith("layouts/")) {
                        let url = "/" + relativePath.replace(".ejs","");
                        if(url === "/index") url = "/"; // index sayfası ana dizin
                        smStream.write({ url, changefreq: 'weekly', priority: 0.8 });
                    }
                }
            });
        }

        walk(viewsPath);

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
app.use(userRoutes);

app.listen(3000, function(){
    console.log("listening on port 3000");
});