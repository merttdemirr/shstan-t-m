const express=require("express")
const router=express.Router()
const controllersUser=require("../controllers/user")
const path=require("path")

router.use("/about",controllersUser.about)

router.use("/komisyon",controllersUser.komisyon)

router.use("/contact",controllersUser.contact)

router.use("/blog",controllersUser.blog );

router.use("/amac",controllersUser.amac );

router.use("/faaliyet",controllersUser.faaliyet)

router.use("/komisyonlar/engbak/anasayfa",controllersUser.engbakanasayfa)

router.use("/komisyonlar/asdep/anasayfa",controllersUser.asdepanasayfa)
// Temsilcilik İşlemleri

router.get("/temsilci/basvuru",controllersUser.temsilci_basvuru)
router.post("/temsilci/basvuru", controllersUser.temsilci_basvuru_post)
router.post("/temsilci/basvurualındı", controllersUser.temsilci_basvuru_post)

router.use("/",controllersUser.anasayfa)




module.exports=router;

