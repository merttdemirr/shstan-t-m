const express=require("express")
const router=express.Router()
const path=require("path")
const {Op}=require("sequelize")
const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.about=function(req,res){
    res.render(path.join(__dirname,"../views/users","about2"))
}


exports.contact=function(req,res){
    res.render(path.join(__dirname,"../views/users","komisyonlarımız"))
}

exports.blog=function (req, res) {
    db.query("select * from blog")
        .then(result=>{
            res.render("users/blog",{
                title:"Bloglar",
                blogs:result[0],
               
            });
        })
        .catch(err=>console.log(err))
}

exports.faaliyet=function(req,res){
    res.render(path.join(__dirname,"../views/users","faaliyet"))
}

exports.amac=function(req,res){
    res.render(path.join(__dirname,"../views/users","amac"))
}

exports.komisyon=function(req,res){
    res.render(path.join(__dirname,"../views/users","komisyonlarımız"))
}

exports.engbakanasayfa=function(req,res){
    res.render(path.join(__dirname,"../views/users/komisyonlar/engellibakicilar/engellibakicilaranasayfa.ejs"))
}

exports.asdepanasayfa=function(req,res){
    res.render(path.join(__dirname,"../views/users/komisyonlar/asdep/asdepanasayfa.ejs"))
}
// temsilci
exports.temsilci_basvuru=function(req,res){
    res.render(path.join(__dirname,"../views/users/temsilci","basvuru"))
}




exports.temsilci_basvuru_post = async (req, res) => {
  const { adsoyad, tc, telefon, email, il, kurum, aciklama } = req.body;

  const msg = {
    to: 'sosyalhizmetsen@gmail.com', // mailin gideceği adres
    from: 'ashbkomisyon3@gmail.com',  // verified SendGrid sender
    subject: 'Yeni İş Yeri Temsilcisi Başvurusu',
    html: `
      <h3>Yeni Başvuru</h3>
      <p><b>Ad Soyad:</b> ${adsoyad}</p>
      <p><b>TC:</b> ${tc}</p>
      <p><b>Telefon:</b> ${telefon}</p>
      <p><b>E-Posta:</b> ${email}</p>
      <p><b>İl:</b> ${il}</p>
      <p><b>Kurum:</b> ${kurum}</p>
      <p><b>Açıklama:</b> ${aciklama}</p>
    `
  };

  try {
    await sgMail.send(msg);
    res.send("Başvurunuz başarıyla gönderildi.");
  } catch (error) {
    console.error(error);
    res.send("Mail gönderilirken hata oluştu.");
  }
};


exports.anasayfa=function(req,res){
     res.render(path.join(__dirname,"../views/users","anasayfa"))
}

