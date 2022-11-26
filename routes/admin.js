var express = require('express');
var router = express.Router();
var adminhelper=require('../helpers/admin-helper')

function sessioncheck(req,res,next){
  if(req.session.admin){
    next();
  }else{
    res.redirect('/admin')
  }
} 

function loginredirect(req,res,next){
  if(!req.session.admin){
    req.session.loggedIn=false;

  }
  if(req.session.admin){ 
    res.redirect('/admin/dashboard')
  }else{
    next();
  } 
}



/* GET admin login. */
router.get('/',loginredirect, function(req, res, next) {
  res.render('admin/adminlogin', { title: 'Express' });
});




/* GET admin login to home */
router.post('/adminlog',function(req,res){
 adminhelper.AdminSignup(req.body).then( ()=>{
  req.session.loggledIn=true;
  req.session.admin=req.body.admin_user
  res.redirect('/admin/dashboard') 

 }).catch((error)=>{

  res.render('admin/adminlogin', { error: `invalid ${error.error}` })
  

 })
    
});





/*  router to get the admin page */
router.get('/dashboard',sessioncheck,(req,res)=>{
  adminhelper.GetAlluserdata().then((userdata)=>{
    res.render('admin/adminhome',{admin:true,userdata}) 

  })
})




/*  admin add new user page */

router.get('/adminadd',sessioncheck, function(req, res, next) {
  res.render('admin/adminadduser', { title: 'Express'});

});





/*  admin add new user */

router.post('/useradddata',function(req,res,next){
  console.log(req.body);
  adminhelper.adduser(req.body).then(()=>{
    res.redirect('/admin/dashboard')
  }).catch((error)=>{
    res.render('admin/adminadduser',{error})
  })
    

})




/* GET admin   after user delete */

router.get('/user_delete/:id',(req,res)=>{
  let useId=req.params.id
  // console.log(useId);

  adminhelper.deleteuser(useId).then((response)=>{
    res.redirect('/admin/dashboard')
  })

})




/* GET admin user edit page. */
router.get('/edituser/:id',sessioncheck, async(req, res)=> {
  let data=await adminhelper.getUserData(req.params.id)
  // console.log(data._id);
  res.render('admin/edituser',{data});
});
  





/* GET admin after edit */

router.post('/user_edit_data',(req,res)=>{
  // console.log(req.body);
  adminhelper.updateuserdata(req.body).then(()=>{
    res.redirect('/admin/dashboard')
  })
})



router.get('/logoutadmi', function(req, res) {
  req.session.admin=null;
  req.session.loggedIn=false;
  res.render('admin/adminlogin', { title: 'Express' });
});


module.exports = router;
