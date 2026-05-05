const express = require("express");
const router = express.Router();
const path = require("path");

// ================= MAILGUN =================
const FormData = require("form-data");
const Mailgun = require("mailgun.js");

const mailgun = new Mailgun(FormData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

async function sendMail({ to, subject, html }) {
  return await mg.messages.create(process.env.MAILGUN_DOMAIN, {
    from: `Sendika <noreply@${process.env.MAILGUN_DOMAIN}>`,
    to,
    subject,
    html,
  });
}

// ================= SAFE TEXT =================
function clean(text) {
  return String(text || "")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ================= SAYFALAR =================

exports.about = (req, res) => {
  res.render(path.join(__dirname, "../views/users/about2"));
};

exports.contact = (req, res) => {
  res.render(path.join(__dirname, "../views/users/komisyonlarımız"));
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
  res.render(path.join(__dirname, "../views/users/faaliyet"));
};

exports.amac = (req, res) => {
  res.render(path.join(__dirname, "../views/users/amac"));
};

exports.üyelik = (req, res) => {
  res.render(path.join(__dirname, "../views/users/üyelik"));
};

exports.komisyon = (req, res) => {
  res.render(path.join(__dirname, "../views/users/komisyonlarımız"));
};

exports.engbakanasayfa = (req, res) => {
  res.render(path.join(__dirname, "../views/users/komisyonlar/engellibakicilar/engellibakicilaranasayfa"));
};

exports.asdepanasayfa = (req, res) => {
  res.render(path.join(__dirname, "../views/users/komisyonlar/asdep/asdepanasayfa"));
};

exports.anasayfa = (req, res) => {
  res.render(path.join(__dirname, "../views/users/anasayfa"));
};

// ================= TEMSİLCİ =================

exports.temsilci_basvuru = (req, res) => {
  res.render(path.join(__dirname, "../views/users/temsilci/basvuru"));
};

exports.temsilci_basvuru_post = async (req, res) => {
  const { adsoyad, telefon, il, unvan, kurum, aciklama } = req.body;

  try {
    await sendMail({
      to: ["sosyalhizmetsen@gmail.com"],
      subject: "Yeni Temsilci Başvurusu",
      html: `
        <h3>Yeni Başvuru</h3>
        <p><b>Ad Soyad:</b> ${clean(adsoyad)}</p>
        <p><b>Telefon:</b> ${clean(telefon)}</p>
        <p><b>İl:</b> ${clean(il)}</p>
        <p><b>Unvan:</b> ${clean(unvan)}</p>
        <p><b>Kurum:</b> ${clean(kurum)}</p>
        <p><b>Açıklama:</b> ${clean(aciklama)}</p>
      `
    });

    res.redirect("/temsilci/basvurualindi");
  } catch (error) {
    console.log("MAIL ERROR:", error);
    return res.status(500).send("Mail gönderilemedi");
  }
};

exports.temsilci_basvuru_alındı = (req, res) => {
  res.render(path.join(__dirname, "../views/users/temsilci/basvurualındı"));
};

// ================= FAALİYETLER =================

exports.faaliyet_asdep_ek_ödeme = (req, res) => {
  res.render(path.join(__dirname, "../views/users/faaliyetler/1asdepeködeme"));
};

exports.faaliyet_huzurevi_ek_ödeme = (req, res) => {
  res.render(path.join(__dirname, "../views/users/faaliyetler/2huzurevieködeme"));
};

exports.faaliyet_asdep_izin = (req, res) => {
  res.render(path.join(__dirname, "../views/users/faaliyetler/3asdepizin"));
};

exports.faaliyet_risk_aile = (req, res) => {
  res.render(path.join(__dirname, "../views/users/faaliyetler/4riskAile"));
};

// ================= ONLINE ÜYELİK =================

exports.onlineüyelik = (req, res) => {
  res.render(path.join(__dirname, "../views/users/online/onlineüyelik"));
};

exports.üyelik_basvuru_post = async (req, res) => {
  const { adsoyad, telefon, il, unvan, gorev_kurum, aciklama } = req.body;

  try {
    await sendMail({
      to: ["sosyalhizmetsen@gmail.com"],
      subject: "Yeni Üyelik Başvurusu",
      html: `
        <h3>Yeni Başvuru</h3>
        <p><b>Ad Soyad:</b> ${clean(adsoyad)}</p>
        <p><b>Telefon:</b> ${clean(telefon)}</p>
        <p><b>İl:</b> ${clean(il)}</p>
        <p><b>Unvan:</b> ${clean(unvan)}</p>
        <p><b>Kurum:</b> ${clean(gorev_kurum)}</p>
        <p><b>Açıklama:</b> ${clean(aciklama)}</p>
      `
    });

    res.redirect("/onlineuyelikalindi");
  } catch (error) {
    console.log("MAIL ERROR:", error);
    return res.status(500).send("Mail gönderilemedi");
  }
};

exports.üyelik_basvuru_alındı = (req, res) => {
  res.render(path.join(__dirname, "../views/users/online/üyelikbasvurualındı"));
};

exports.kvkk = (req, res) => {
  res.render(path.join(__dirname, "../views/users/online/kvkk"));
};