var express=require("express");
var router=express.Router();
var exe=require("./conection");

router.get("/",function(req,res){
    
    res.render("admin/home.ejs");
});

router.get("/slider",async function(req,res){
    var data =await exe(`SELECT * FROM slider`);
    var obj ={"slider_data":data};
    res.render("admin/slider.ejs",obj);
});

router.post("/add_slider",async function(req,res){
    var d=req.body;
    var save_image =new Date().getTime()+req.files.slider_image.name;
    req.files.slider_image.mv("public/uploads/"+save_image);

    var sql= `INSERT INTO slider(slider_heading,slider_content,slider_image,button_text,button_link)
    VALUES ('${d.slider_heading}','${d.slider_content}','${save_image}','${d.button_text}','${d.button_link}')`;

    var data = await exe(sql);
   //res.send(data);
   res.redirect("/admin/slider");
});

router.get("/delete/:id",async function(req,res){
    var id =req.params.id;
    var sql = `DELETE FROM slider WHERE slider_id = '${id}'`;
    
var data =await exe(sql);
   // res.send(data);
   res.redirect("/slider.ejs");
});

router.get("/update/:id",async function(req,res){
    var id=req.params.id;
   var data=await exe(`SELECT * FROM slider WHERE slider_id='${id}'`);
    var obj={"old_data":data[0]};
    //res.send(data);
    res.render("admin/update.ejs",obj);
});

router.post("/update_slider",async function(req,res){
    var d=req.body;
    if(req.files != null){
        var files_name = new Date().getTime() + req.files.slider_image.name;
        req.files.slider_image.mv("public/uploads/"+files_name);
        var sql=`UPDATE slider
SET slider_image = '${files_name}' WHERE slider_id='${d.slider_heading

    
}'`;
var data2=await exe(sql);
res.send(data2);
    }

    var sql=`UPDATE slider
SET slider_heading = '${d.slider_heading}', slider_content = '${d.slider_content}',button_text ='${d.button_text}',
button_link = '${d.button_link}' 
WHERE slider_id='${d.slider_heading}';`;
var data=await exe(sql)
    //res.send(data);
    res.redirect("/admin/update");
});

router.get("/service",async function(req,res){
    var data=await exe(`SELECT * FROM services`);
    var obj={"data":data}
   res.render("admin/service.ejs",obj);
});

router.post("/add-service",async function(req,res){
    var d=req.body;
    var save_files = new Date().getTime() + req.files.service_image.name;
    req.files.service_image.mv("public/uploads/"+save_files);

    
    var sql =`INSERT INTO services(service_title,service_details,service_image) VALUES
    ('${d.service_title}','${d.service_details}','${save_files}')`;

    var data=await exe(sql);
    //res.send(data);
    res.redirect("/admin/service");
});

router.get("/deletes/:id",async function(req,res){
    var id=req.params.id;
    var sql= `DELETE FROM services WHERE service_id='${id}'`
    var data =await exe(sql);
    //res.send(data);
    res.redirect("/admin/service");
})
router.get("/edit/:id",async function(req,res){
   

    var id=req.params.id;
    var data=await exe(`SELECT * FROM services WHERE service_id='${id}'`);
     var obj={"old_data":data[0]};
     //res.send(data);
    // res.render("admin/update.ejs",obj);
    res.render("admin/updates.ejs",obj);
    //res.send(data);

    
});

router.post("/edite_from",async function(req,res){
    var d = req.body;
if (req.files != null) {
    // Generate the file name using the current timestamp and the original file name
    var files_name = new Date().getTime() + req.files.service_image.name;
    
    // Move the uploaded file to the desired location
    req.files.service_image.mv("public/uploads/" + files_name);
    
    // Use the correct variable name in the SQL query
    var sql2 = `UPDATE services SET service_image='${files_name}' WHERE service_id='${d.updets}'`;
    var data2 = await exe(sql2);
    
    // Send the response
    res.send(data2);
}


    var sql=`UPDATE services
SET service_title = '${d.service_title}', service_details = '${d.service_details}'
WHERE service_id='${d.updets}'`;

var data=await exe(sql);
    //res.send(data);
    //res.redirect("admin/edite");
})

router.get("/Blog",async function(req,res){
    var data=await exe(`SELECT * FROM blog `);
    var obj={"data":data};
    res.render("admin/blog.ejs",obj);
});
router.post("/blog_titale",async function(req,res){
    var d=req.body;
    if(req.files != null){

        var files_name= new Date().getTime()+req.files.blog_image.name;
        req.files.blog_image.mv("public/uploads/"+files_name);
    }
    var sql=`INSERT INTO blog(blog_title,blog_details,blog_post_by,blog_image,blog_date) VALUES ('${d.blog_title}','${d.blog_details}','${d.blog_post_by}',
    '${files_name}','${d.blog_date}')`;
    var data=await exe(sql);
   // res.send(data);
   res.redirect("/admin/blog");
});

router.get("/dele/:id",async function(req,res){
    var id=req.params.id;

    var sql=`DELETE FROM blog WHERE blog_id='${id}'`;
    var data=await exe(sql);
    //res.send(data);
  // res.redirect("/admin/blog");
  res.redirect("/admin/blog");
});


router.get("/edite_from/:id",async function(req,res){
   var id=req.params.id;
   var data=await exe(`SELECT * FROM blog WHERE blog_id='${id}'`);
   var obj={"old_data":data[0]};
   res.render("admin/from.ejs",obj);
});


router.post("/edit_from",async function(req,res){
var d=req.body;

if(req.files != null){

    var file_save=new Date().getTime()+req.files.blog_image.name;
    req.files.blog_image.mv("public/uploads/"+file_save);

    var sql2=`UPDATE blog 
SET blog_image='${file_save}'WHERE 
    blog_id ='${d.id}' `;

    var data2=await exe(sql2);
    res.send(data2);
}
    var sql=`UPDATE blog 
SET 
    blog_title = '${d.blog_title}', 
    blog_details = '${d.blog_details}', 
    blog_date = '${d.blog_date}',
    blog_post_by = '${d.blog_post_by}'
WHERE 
    blog_id = 'id'`;

    var data=await exe(sql);
    //res.send(data);

    res.redirect("admin/edit_from");
   

});

router.get("/company_info",async function(req,res){
   var data=await exe(`SELECT * FROM company_info WHERE company_id='1' `);
   var obj={"old_data":data[0]};

   res.render("admin/company_info.ejs",obj);
});

router.post("/submit_company_info",async function(req,res){

    
    var d=req.body;
    if(req.files != null){
        var file_save =new Date().getTime()+req.files.company_logo.name;
        req.files.company_logo.mv("public/uploads/"+file_save);
    
        var sql2 = `UPDATE company_info 
        SET company_logo = '${d.file_save}' 
        WHERE company_id = '1'`;
            var data2=await exe(sql2);
           res.send(sql2);
    }
    
        //res.send(req.body);
        
    
    var sql=`UPDATE company_info 
    SET 
    company_name ='${d.company_name}',
	
	company_mobile ='${d.company_mobile}',
	company_email ='${d.company_email}',
	company_address ='${d.company_address}',
	company_sub_details  ='${d.company_sub_details}',
	company_fb_link  ='${d.company_fb_link}',
	company_insta_link  ='${d.company_insta_link }',
	company_linkedin_link  ='${d.company_linkedin_link }',
	company_twitter_link ='${d.company_twitter_link }',
	company_whatsapp_no ='${d.company_whatsapp_no }'
    WHERE 
        company_id = '${d.company_id}'`;

    var data=await exe(sql);
    //res.send(data);
   res.redirect("/admin/company_info")
});

router.get("/about_counter",async function(req,res){
    var data=await exe(`SELECT * FROM about_counter WHERE counter_id='1'`);
    var obj={"old_data":data[0]};
    res.render("admin/about_counter.ejs",obj);
});

router.post("/about_counter",async function(req,res){

    if(req.files != null){

        var save_files=new Date().getTime()+req.files.about_counter_image.name;
        req.files.about_counter_image.mv("public/uploads/"+ save_files);

        var sql=`UPDATE about_counter
SET about_counter_image='${save_files}'
WHERE counter_id = 1; `;

var data=await exe(sql);
//res.send(data);
    }
    var d=req.body;

    var sql2 = `UPDATE about_counter
SET 
    total_insurance_policies=${d.total_insurance_policies},
    total_awards_won=${d.total_awards_won},
    total_skilled_agent=${d.total_skilled_agent},
    total_team_members=${d.total_team_members}
WHERE counter_id = 1;`;

var data2=await exe(sql2);
//res.send(data2);
res.redirect("/admin/about_counter");


    //res.send(req.body);
});

router.get("/contact_us",async function(req,res){
    var data=await exe(`SELECT * FROM contact_us WHERE contact_id='1'`);
    var obj={"old_data":data[0]};
    res.render("admin/contact_us.ejs",obj);

});

router.post("/submit-contact",async function(req,res){
   if(req.files != null){
    var save_files=new Date().getTime()+req.files.contact_img.name;
    req.files.contact_img.mv("public/uploads/"+ save_files);

    var sql=`UPDATE contact_us
SET contact_img='${save_files}'
WHERE contact_id = 1; `;

var data=await exe(sql);
//res.send(data);
   }
   var d=req.body;
   var sql2=`UPDATE contact_us
SET 
    contact_map_link = '${d.contact_map_link}'
WHERE contact_id = 1;`;
var data2=await exe(sql2);
//res.send(data2);
res.redirect("/admin/contact_us");
})

router.get("/team_Member",async function(req,res){
    var data=await exe(`SELECT * FROM team_members`);
var obj={"old_data":data};
    res.render("admin/team_menber.ejs",obj);
})

router.post("/submit-team-member",async function(req,res){

    if(req.files != null){
        var save_files=new Date().getTime()+req.files.team_image.name;
        req.files.team_image.mv("public/uploads/"+save_files);
    }
    var d=req.body;
    var sql=`INSERT INTO team_members(team_image,team_name,team_position,team_fb_link,team_insta_link,team_twitter_link,team_linkedin_link)
    VALUES ('${save_files}','${d.team_name}','${d.team_position}','${d.team_fb_link}','${d.team_insta_link}','${d.team_twitter_link}','${d.team_linkedin_link}')`;
    var data=await exe(sql);
   // res.send(data);
   res.redirect("admin/team_Menber");
});

router.get("/team_delete/:id",async function(req,res){
   var id=req.params.id;
   var sql=`DELETE FROM team_members WHERE team_member_id='${id}'`;
   var data=await exe(sql);
   //res.send(data);
   res.redirect("admin/team_member");
});

router.get("/team_update/:id",async function(req,res){
    var id=req.params.id;
   var data=await exe(`SELECT * FROM team_members WHERE team_member_id='${id}' `);
   var obj={"old_data":data[0]};
   res.render("admin/team_update.ejs",obj);
});

router.post("/update_team_member",async function(req,res){
   if(req.files){

    var save_file=new Date().getTime()+req.files.team_image.name;
    req.files.team_image.mv("public/uploads/"+save_file);
   }
   var d=req.body;
   var sql=`UPDATE team_members
SET team_image = '${save_file}', team_name = '${d.team_name}', team_position='${d.team_position}',team_fb_link='${d.team_fb_link}',
team_insta_link='${d.team_insta_link}',team_twitter_link='${d.team_twitter_link}',team_linkedin_link='${d.team_linkedin_link}'
WHERE team_member_id='${d.team_member_id}'`;

var data=await exe(sql);
//res.send(data)
res.redirect("admin/update_team_member");
});

router.get("/testimonial",async function(req,res){
    var data=await exe(`SELECT * FROM testimonial`);
var obj={"old_data":data};
   res.render("admin/testimonial.ejs",obj);
});

router.post("/testimonial",async function(req,res){
   if(req.files != null){
    var save_files=new Date().getTime()+req.files.customer_image.name;
    req.files.customer_image.mv("public/uploads/"+save_files);
   }
   var d=req.body;
   var sql=`INSERT INTO testimonial(customer_image,customer_name,customer_position,customer_review_rating,customer_review_details)
   VALUES (
	'${save_files}' ,
	'${d.customer_name}' ,
	'${d.customer_position}' ,
	'${d.customer_review_rating }' ,
	'${d.customer_review_details}'
)`
var data=await exe(sql);
//res.send(data);
res.redirect("admin/testimonial");
});

router.get("/delet/:id",async function(req,res){
    var id=req.params.id;
    var data=await exe(`DELETE FROM testimonial WHERE testimonial_id='${id}'`);
    //res.send(data);
    res.redirect("admin/delet");
    

});

router.get("/update_data/:id",async function(req,res){
    var id=req.params.id;
    var data=await exe(`SELECT * FROM testimonial WHERE testimonial_id='${id}' `);
    var obj={"old_data":data[0]};
    res.render("admin/update_data.ejs",obj);
});

router.post("/testimonial_data",async function(req,res){
    if(req.files != null){
        var save_files=new Date().getTime()+req.files.customer_image.name;
        req.files.customer_image.mv("public/uploads/"+save_files);
       }
       var d=req.body;
   var sql=`UPDATE testimonial
SET  customer_image= '${save_files}' ,
	customer_name='${d.customer_name}' ,
	customer_position='${d.customer_position}' ,
	customer_review_rating='${d.customer_review_rating }' ,
	customer_review_details='${d.customer_review_details}'
WHERE testimonial_id='${d.testimonial_id}'`;

var data=await exe(sql);
res.send(data);
res.redirect("admin/testimonial_data")
});

router.get("/features",async function(req,res){
    var data=await exe(`SELECT * FROM features`);
    var obj={"feature_data":data};
    res.render("admin/features.ejs",obj);
})

router.post("/Feature",async function(req,res){
    if(req.files){
        var save_files=new Date().getTime()+req.files.feature_icon_image.name;
        req.files.feature_icon_image.mv("public/uploads/"+save_files);
    }
var d=req.body;
    var sql=`INSERT INTO features(feature_icon_image,feature_label,feature_details) values('${save_files}',
    '${d.feature_label}','${d.feature_details}')`;
    var data=await exe(sql);
    //res.send(data);
    res.redirect("admin/feature");
});

router.get("/feature_delete/:id",async function(req,res){
    var id=req.params.id;
    var data=await exe(`DELETE FROM features WHERE feature_id='${id}'`);
        //res.send(data);
        res.redirect("admin/feature_delete");

});

router.get("/feature_edite/:id",async function(req,res){
    var data=await exe(`SELECT * FROM features`);
    var obj={"feture_data":data[0]};
    res.render("admin/feature_edite.ejs",obj);
});

router.post("/feature_data",async function(req,res){
    if(req.files){
        var save_files=new Date().getTime()+req.files.feature_icon_image.name;
        req.files.feature_icon_image.mv("public/uploads/"+save_files);
    }
var d=req.body;
   var sql=` UPDATE features
SET feature_icon_image='${save_files}', feature_label = '${d.feature_label}', feature_details = '${d.feature_details}'
WHERE feature_id ='${d.feature_id}'`;

var data=await exe(sql);

//res.send(data);
res.redirect("/admin/feature_data");
});

router.get("/about_company",async function(req,res){
    var data=await exe(`SELECT * FROM about_company `);
    var obj={"data":data};
    res.render("admin/about_company.ejs",obj);
});

router.post("/about_company",async function(req,res){
    var d=req.body;
    var sql=`INSERT INTO about_company(about_heading,about_details,about_point1,about_point2,about_point3)
    VALUES('${d.about_heading}','${d.about_details}','${d.about_point1}','${d.about_point2}','${d.about_point3}')`;
    var data=await exe(sql);
   // res.send(data);
   res.redirect("/admin/about_company");
});

router.get("/about_company_delete/:id",async function(req,res){
    var id=req.params.id;
    var data=await exe(`DELETE FROM about_company WHERE about_id='${id}'`);
    //res.send(data);
    res.redirect("/admin/about_company");
   
});
router.get("/about_company_update/:id",async function(req,res){
    var id=req.params.id;
   var data=await exe(`SELECT * FROM about_company WHERE about_id='${id}'`);
   var obj={"old_data":data[0]};
   res.render("admin/about_company_update.ejs",obj);
});
router.post("/about_company_update",async function(req,res){
    var d=req.body;
   var sql= `UPDATE about_company
SET about_heading = '${d.about_heading}', about_details = '${d.about_details}', about_point1='${d.about_point1}',
about_point2='${d.about_point2}',about_point2='${d.about_point3}'
WHERE about_id='${d.abount_compny_id}'`;
var data=await exe(sql);
//res.send(data); 
res.redirect("/admin/about_company");
});
router.get("/instagram_images",async function(req,res){
    var data=await exe(`SELECT * FROM instagram_images`);
    var obj={"data":data};
    res.render("admin/instagram_images.ejs",obj);
});
router.post("/insta_image",async function(req,res){
   if(req.files != null){
    var file_save=new Date().getTime()+req.files.insta_image.name;
    req.files.insta_image.mv("public/uploads/"+file_save);
   }
var d=req.body;
   var sql=`INSERT INTO instagram_images(insta_image,insta_link)VALUES('${file_save}','${d.insta_link}')`;
   var data=await exe(sql);
   //res.send(data);
   res.redirect("/admin/instagram_images");
});

router.get("/instagram_img_delete/:id",async function(req,res){
    var id=req.params.id;
   var data=await exe(`DELETE FROM instagram_images WHERE insta_img_id='${id}'`);
  // res.send(data);
  res.redirect("/admin/instagram_images")
});

router.get("/instagram_img_update/:id",async function(req,res){
    var id=req.params.id;
   var data=await exe(`SELECT * FROM instagram_images WHERE  insta_img_id='${id}'`);
   var obj={"old_data":data[0]};
   res.render("admin/instagram_img_update.ejs",obj)
});

router.post("/insta_image_uploads",async function(req,res){
    if(req.files != null){
        var file_save=new Date().getTime()+req.files.insta_image.name;
        req.files.insta_image.mv("public/uploads/"+file_save);
       }
       var d=req.body;
    var sql=`UPDATE instagram_images
SET insta_image ='${file_save}', insta_link='${d.insta_link}'
WHERE  insta_img_id='${d.instagram_id}'`;

var data=await exe(sql);
//res.send(data);
res.redirect("/admin/instagram_images")
});

router.get("/faq_image",async function(req,res){
    var data=await exe(`SELECT * FROM faq_image WHERE faq_img_id='1'`);
    var obj={"old_data":data[0]};
    res.render("admin/faq_image.ejs",obj);
});

router.post("/upload_faq_image",async function(req,res){
    if(req.files != null){
        var file_save=new Date().getTime()+req.files.faq_img.name;
        req.files.faq_img.mv("public/uploads/"+file_save);
var d=req.body;
        var sql=`UPDATE faq_image
SET faq_img ='${file_save}'
WHERE faq_img_id='${d.fqe_img_id}' `;
var data=await exe(sql);
//res.send(data);
res.redirect("/admin/faq_image")
       }
});

router.get("/faq_question",async function(req,res){
    var data=await exe(`SELECT * FROM faq`);
    var obj={"data":data};
   res.render("admin/faq_question.ejs",obj);
});

router.post("/faq_question",async function(req,res){
    var d=req.body;
var sql=`INSERT INTO faq(faq_question,faq_answer) VALUES('${d.faq_question}','${d.faq_answer}')`;
var data=await exe(sql);
    //res.send(data);
    res.redirect("/admin/faq_question")
});

router.get("/faq_question_delete/:id",async function(req,res){
    var id=req.params.id;
   var data=await exe(`DELETE FROM faq WHERE faq_id='${id}'`);
   //res.send(data);
   res.redirect("/admin/faq_question")
});

router.get("/faq_question_update/:id",async function(req,res){
    var id=req.params.id;
   var data=await exe(`SELECT * FROM faq WHERE  faq_id='${id}'`);
   var obj={"old_data":data[0]};
   res.render("admin/faq_question_update.ejs",obj);
});

router.post("/faq_question_update",async function(req,res){
   var d=req.body;
   var  sql=`UPDATE faq
SET faq_question ='${d.faq_question}', faq_answer ='${d.faq_answer}'
WHERE faq_id='${d.faq_quition_id}'`;
var data=await exe(sql);
//res.send(data);
res.redirect("/admin/faq_question")

});

router.get("/newsletter",async function(req,res){
    var data=await exe(`SELECT * FROM newsletter`);
    var obj={"data":data};
    res.render("admin/newsletter.ejs",obj);
})

router.post("/newsletter_form",async function(req,res){
    var d=req.body;
var sql=`INSERT INTO newsletter(customer_email) VALUES('${d.customer_email}')`;
var data=await exe(sql);
//res.send(data);
res.redirect("/admin/newsletter")
});

router.get("/newsletter_delete/:id",async function(req,res){
    var id=req.params.id;
   var data=await exe(`DELETE FROM newsletter WHERE newsletter_id='${id}'`);
   //res.send(data);
   res.redirect("/admin/newsletter");
});

router.get("/newsletter_update/:id",async function(req,res){
    var id=req.params.id;
    var data=await exe(`SELECT * FROM newsletter WHERE newsletter_id='${id}'`);
    var obj={"old_data":data[0]};
    res.render("admin/newsletter_update.ejs",obj);
});

router.post("/newsletter_form_update",async function(req,res){
    var d=req.body;
    var sql=`UPDATE newsletter
SET customer_email = '${d.customer_email}'
WHERE newsletter_id='${d.newsletter_form_id}'`;
var data=await exe(sql);
//res.send(data);
res.redirect("/admin/newsletter");
})

module.exports = router;


