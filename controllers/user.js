const express = require("express");
const router = express.Router();
const path = require("path");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");

// ===================== SMTP =====================
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "aa1e9b001@smtp-brevo.com",
    pass: "xsmtpsib-965e7b458d1441f64bd86722bb65c4cc94bac57795a94d25dbf7e96a4477b122-dJPGwyC3oR36mwRf"
  }
});


// ===================== TEMSİLCİ =====================
exports.temsilci_basvuru_post = async (req, res) => {
  const { adsoyad, telefon, il, unvan, kurum, aciklama } = req.body;

  const msg = {
    to: "sosyalhizmetsen@gmail.com",

    // 🔥 DÜZELTİLDİ
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


// ===================== ÜYELİK =====================
exports.üyelik_basvuru_post = async (req, res) => {
  const { adsoyad, telefon, il, unvan, gorev_kurum, aciklama } = req.body;

  const msg = {
    to: "sosyalhizmetsen@gmail.com",

    // 🔥 DÜZELTİLDİ
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