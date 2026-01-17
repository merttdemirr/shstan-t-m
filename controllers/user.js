const express=require("express")
const router=express.Router()
const path=require("path")
const {Op}=require("sequelize")

exports.about=function(req,res){
    res.render(path.join(__dirname,"../views/users","about2"))
}

exports.komisyon=function(req,res){
    db.query("select * from komisyon")
        .then(result=>{
            res.render("users/komisyon",{
                title:"Komisyonlar",
                komisyonlar:result[0],
            })
        })
        .catch(err=>console.log(err))
}

exports.contact=function(req,res){
    res.render(path.join(__dirname,"../views/users","komisyon"))
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

exports.online=function(req,res){
    res.render(path.join(__dirname,"../views/users","online"))
}