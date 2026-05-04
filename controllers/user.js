const express=require("express")
const router=express.Router()
const path=require("path")
const {Op}=require("sequelize")
const nodemailer = require("nodemailer");

// ===================== SMTP =====================
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});


// ===================== SAYFALAR =====================

exports.about = (req, res) => {
  res.render(path.join(__dirname, "../views/users", "about2"));
};

exports.contact = (req, res) => {
  res.render(path.join(__dirname, "../views/users", "komisyonlarımız"));
};

exports.blog = (req, res) => {
  db.query("select * from blog")
    .then(result => {
      res.render("users/blog", {
        title: "Bloglar",
        blogs: result[0],
      });
    })
    .catch(err => console.log(err));
};

exports.faaliyet = (req, res) => {
  res.render(path.join(__dirname, "../views/users", "faaliyet"));
};

exports.amac = (req, res) => {
  res.render(path.join(__dirname, "../views/users", "amac"));
};

exports.üyelik = (req, res) => {
  res.render(path.join(__dirname, "../views/users", "üyelik"));
};

exports.komisyon = (req, res) => {
  res.render(path.join(__dirname, "../views/users", "komisyonlarımız"));
};

exports.engbakanasayfa = (req, res) => {
  res.render(path.join(__dirname, "../views/users/komisyonlar/engellibakicilar/engellibakicilaranasayfa.ejs"));
};

exports.asdepanasayfa = (req, res) => {
  res.render(path.join(__dirname, "../views/users/komisyonlar/asdep/asdepanasayfa.ejs"));
};

exports.anasayfa = (req, res) => {
  res.render(path.join(__dirname, "../views/users", "anasayfa"));
};


// ===================== TEMSİLCİ =====================

exports.temsilci_basvuru = (req, res) => {
  res.render(path.join(__dirname, "../views/users/temsilci", "basvuru"));
};

exports.temsilci_basvuru_post = async (req, res) => {
  const { adsoyad, telefon, il, unvan, kurum, aciklama } = req.body;

  const msg = {
    to: "sosyalhizmetsen@gmail.com",
    from: '"SHS Başvuru Sistemi" <aa1e9b001@smtp-brevo.com>',
    subject: "Yeni İş Yeri Temsilcisi Başvurusu",
    html: `
      <h3>Yeni Başvuru</h3>
      <p><b>Ad Soyad:</b> ${adsoyad}</p>
      <p><b>Telefon:</b> ${telefon}</p>
      <p><b>İl:</b> ${il}</p>
      <p><b>Unvan:</b> ${unvan}</p>
      <p><b>Kurum:</b> ${kurum}</p>
      <p><b>Açıklama:</b> ${aciklama}</p>
    `
  };

  try {
    const info = await transporter.sendMail(msg);
    console.log("MAIL SENT:", info.response);

    return res.redirect("/temsilci/basvurualindi");
  } catch (error) {
    console.log("MAIL ERROR:", error);
    return res.status(500).send("Mail gönderilirken hata oluştu.");
  }
};

exports.temsilci_basvuru_alındı = (req, res) => {
  res.render(path.join(__dirname, "../views/users/temsilci", "basvurualındı"));
};


// ===================== FAALİYETLER =====================

exports.faaliyet_asdep_ek_ödeme = (req, res) => {
  res.render(path.join(__dirname, "../views/users/faaliyetler", "1asdepeködeme"));
};

exports.faaliyet_huzurevi_ek_ödeme = (req, res) => {
  res.render(path.join(__dirname, "../views/users/faaliyetler", "2huzurevieködeme"));
};

exports.faaliyet_asdep_izin = (req, res) => {
  res.render(path.join(__dirname, "../views/users/faaliyetler", "3asdepizin"));
};

exports.faaliyet_risk_aile = (req, res) => {
  res.render(path.join(__dirname, "../views/users/faaliyetler", "4riskAile"));
};


// ===================== ONLINE ÜYELİK =====================

exports.onlineüyelik = (req, res) => {
  res.render(path.join(__dirname, "../views/users/online", "onlineüyelik"));
};

exports.üyelik_basvuru_post = async (req, res) => {
  const { adsoyad, telefon, il, unvan, gorev_kurum, aciklama } = req.body;

  const msg = {
    to: "sosyalhizmetsen@gmail.com",
    from: '"SHS Üyelik Sistemi" <aa1e9b001@smtp-brevo.com>',
    subject: "Yeni Üyelik Başvurusu",
    html: `
      <h3>Yeni Başvuru</h3>
      <p><b>Ad Soyad:</b> ${adsoyad}</p>
      <p><b>Telefon:</b> ${telefon}</p>
      <p><b>İl:</b> ${il}</p>
      <p><b>Unvan:</b> ${unvan}</p>
      <p><b>Kurum:</b> ${gorev_kurum}</p>
      <p><b>Açıklama:</b> ${aciklama}</p>
    `
  };

  try {
    const info = await transporter.sendMail(msg);
    console.log("MAIL SENT:", info.response);

    return res.redirect("/onlineuyelikalindi");
  } catch (error) {
    console.log("MAIL ERROR:", error);
    return res.status(500).send("Mail gönderilirken hata oluştu.");
  }
};

exports.üyelik_basvuru_alındı = (req, res) => {
  res.render(path.join(__dirname, "../views/users/online", "üyelikbasvurualındı"));
};

exports.kvkk = (req, res) => {
  res.render(path.join(__dirname, "../views/users/online", "kvkk"));
};