var express=require("express");
var router=express.Router();
var exe=require("./conection");
router.get("/",async function(req,res){
    var data=await exe(`SELECT * FROM services LIMIT4`);
    //
    //SELECT * FROM services LIMIT4
    var slider =await exe(`SELECT * FROM slider`);
    var data2=await exe(`SELECT * FROM blog LIMIT 3 `);
    var data3=await exe(`SELECT * FROM team_members LIMIT 5`);
    var data4=await exe(`SELECT * FROM features LIMIT 4`);
    var data5=await exe(`SELECT * FROM about_counter LIMIT 4`);
    var data6=await exe(`SELECT * FROM faq`);
   
   
   
    var obj={"data":data,"slider":slider,"blog":data2,"team_member":data3,"features":data4,"about_counter":data5,"faq":data6}
    res.render("user/home.ejs",obj);
});

router.get("/about",function(req,res){
    res.render("user/abount.ejs");
});

router.get("/service",async function(req,res){
    
    
    res.render("user/service.ejs");
});

router.get("/blog",function(req,res){
    res.render("user/blog.ejs")
});

router.get("/contact",function(req,res){
    res.render("user/contact.ejs")
})

module.exports = router;
