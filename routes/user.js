const express=require("express")
const router=express.Router()
const controllersUser=require("../controllers/user")
const path=require("path")

router.use("/about",controllersUser.about)

router.use("/komisyon",controllersUser.komisyon)

router.use("/contact",controllersUser.contact)

router.use("/blog",controllersUser.blog );

router.use("/amac",controllersUser.amac );

router.use("/komisyon",controllersUser.online)

router.use("/faaliyet",controllersUser.faaliyet)



module.exports=router;

