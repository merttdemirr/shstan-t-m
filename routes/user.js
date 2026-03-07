const express=require("express")
const router=express.Router()
const controllersUser=require("../controllers/user")
const path=require("path")

router.get("/about",controllersUser.about)

router.get("/komisyon",controllersUser.komisyon)

router.get("/contact",controllersUser.contact)

router.get("/blog",controllersUser.blog );

router.get("/amac",controllersUser.amac );

router.get("/faaliyet",controllersUser.faaliyet)

router.get("/uyelik",controllersUser.üyelik)

router.get("/komisyonlar/engbak/anasayfa",controllersUser.engbakanasayfa)

router.get("/komisyonlar/asdep/anasayfa",controllersUser.asdepanasayfa)
// Temsilcilik İşlemleri

router.get("/temsilci/basvuru",controllersUser.temsilci_basvuru)
router.post("/temsilci/basvuru", controllersUser.temsilci_basvuru_post)
router.get("/temsilci/basvurualindi", controllersUser.temsilci_basvuru_alındı)

//Faaliyetler

router.get("/faaliyetler/asdep-ek-odeme", controllersUser.faaliyet_asdep_ek_ödeme)
router.get("/faaliyetler/2huzurevi-ek-odeme", controllersUser.faaliyet_huzurevi_ek_ödeme)
router.get("/",controllersUser.anasayfa)






module.exports=router;

