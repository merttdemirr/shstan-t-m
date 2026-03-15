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

exports.üyelik=function(req,res){
    res.render(path.join(__dirname,"../views/users","üyelik"))
}
// KOMİSYONLAR
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



// Başvuru gönderim kısmıı
exports.temsilci_basvuru_post = async (req, res) => {
    const { adsoyad, telefon, il, unvan, kurum, aciklama } = req.body;

    const msg = {
        to: "sosyalhizmetsen@gmail.com",
        from: "ashbkomisyon3@gmail.com",
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
    await sgMail.send(msg);
    res.redirect("/temsilci/basvurualindi");
  } catch (error) {
    console.log(error);
    res.send("Mail gönderilirken hata oluştu.");
  }
};

exports.temsilci_basvuru_alındı=function(req,res){
    res.render(path.join(__dirname,"../views/users/temsilci","basvurualındı"))
}



// faaliyetler

exports.faaliyet_asdep_ek_ödeme=function(req,res){
    res.render(path.join(__dirname,"../views/users/faaliyetler","1asdepeködeme"))
}

exports.faaliyet_huzurevi_ek_ödeme=function(req,res){
    res.render(path.join(__dirname,"../views/users/faaliyetler","2huzurevieködeme"))
}


exports.anasayfa=function(req,res){
     res.render(path.join(__dirname,"../views/users","anasayfa"))
}

//online üyelik
exports.onlineüyelik=function(req,res){
    res.render(path.join(__dirname,"../views/users/online","onlineüyelik"))
}

exports.üyelik_basvuru_post = async (req, res) => {
    const { adsoyad, telefon, il, unvan, gorev_kurum, aciklama } = req.body;

    const msg = {
        to: "sosyalhizmetsen@gmail.com",
        from: "ashbkomisyon3@gmail.com",
        subject: " Başvurusu",
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
    await sgMail.send(msg);
    res.redirect("/online/üyelikbasvurualındı");
  } catch (error) {
    console.log(error);
    res.send("Mail gönderilirken hata oluştu.");
  }
};

exports.üyelik_basvuru_alındı=function(req,res){
    res.render(path.join(__dirname,"../views/users/online","üyelikbasvurualındı"))
}




exports.kvkk=function(req,res){
    res.render(path.join(__dirname,"../views/users/online","kvkk"))
}
