var db=require('../configuration/connection')
var collection=require('../configuration/collection')
const bcrypt=require('bcrypt')
module.exports={

    userSignup:(userinfo)=>{
        return new Promise(async(resolve,reject)=>{
            let user=await db.get().collection(collection.USER_Collection).findOne({username:userinfo.username})
            console.log(">>>>>",user);
            if(user){
                reject({error:'username allready exsist'})
            }else{
                userinfo.pass=await bcrypt.hash(userinfo.pass,10)
            db.get().collection(collection.USER_Collection).insertOne(userinfo).then((data)=>{
                console.log(">>>..>",data);
                resolve(data)
            })

            }
            

        })
        
        

    },
    Dologin:(userinfo)=>{
        return new Promise(async(resolve,reject)=>{
            let user=await db.get().collection(collection.USER_Collection).findOne({email:userinfo.Email})
            if(user){
                bcrypt.compare(userinfo.password,user.pass).then((status)=>{
                    if(status){
                        resolve()
                    }else{
                        reject( )
                    }

                })

            }else{
                reject( )
            }


        })
    },




}