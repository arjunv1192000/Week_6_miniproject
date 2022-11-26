var express = require('express');
var router = express.Router();
var userhelper=require('../helpers/user_helper')


function sessioncheck(req,res,next){
  if(req.session.user){
    next();
  }else{
    res.redirect('/')
  }
} 
function loginredirect(req,res,next){
  if(!req.session.user){
    req.session.loggedIn=false;

  }
  if(req.session.user){ 
    res.redirect('/home')
  }else{
    next();
  }
}

/* GET home page. */
router.get('/',loginredirect,function(req, res, next) {
  res.render('user/userlogin', { title: 'Express' });
});

/* GET  signup page*/
router.get('/signup',function(req,res){
  res.render('user/signup',{ title: 'Express' })

});

/* GET home page */
router.post('/loginuser', function(req,res){
userhelper.Dologin(req.body).then(()=>{
  req.session.loggledIn=true;
  req.session.user=req.body.Email 
  
  res.redirect('/home')
  
}).catch(()=>{

  
   
})


});
router.get('/home',sessioncheck, function(req,res){
  res.render('user/userhome')
})

router.post('/signupuser',function(req,res){
  userhelper.userSignup(req.body).then((userinfo)=>{
  
    req.session.loggledIn=true;
    req.session.user=req.body.username
    res.redirect('/home')
  }).catch((error)=>{
    res.render('user/signup',{error})
  })


});
router.get('/logout', function(req, res) {
  req.session.user=null;
  req.session.loggedIn=false;
  res.render('user/userlogin', { title: 'Express' });
});

module.exports = router;
