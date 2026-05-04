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
router.get("/faaliyetler/3asdep-izin", controllersUser.faaliyet_asdep_izin)
router.get("/faaliyetler/4risk-aile", controllersUser.faaliyet_risk_aile)
router.get("/",controllersUser.anasayfa)

//online üyelik

router.get("/onlineuyelik",controllersUser.onlineüyelik)
router.get("/kvkk",controllersUser.kvkk)
router.post("/onlineuyelik", controllersUser.üyelik_basvuru_post)
router.get("/onlineuyelikalindi", controllersUser.üyelik_basvuru_alındı)
router.get("/mail-test", controllersUser.mail_test)

module.exports=router;

