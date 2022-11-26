var db=require('../configuration/connection')
var collection=require('../configuration/collection')
const bcrypt=require('bcrypt')
const { response } = require('express')
const { ObjectId } = require('mongodb')

module.exports={
    adduser:(userinfo)=>{
        return new Promise(async(resolve,reject)=>{
            let use=db.get().collection(collection.USER_Collection).findOne({username:userinfo.username})
            if(use){
                reject({error:'username allready exsist'})
            }else{
                userinfo.pass=await bcrypt.hash(userinfo.pass,10)
            db.get().collection(collection.USER_Collection).insertOne(userinfo).then((data)=>{
                resolve(data)
            })


            }
            
        })
        
        

    },
    GetAlluserdata:()=>{
        return new Promise(async(resolve,reject)=>{
            let userdata=await db.get().collection(collection.USER_Collection).find().toArray()
            console.log(userdata);
            resolve(userdata)
        })

    },
    deleteuser:(useId)=>{
        console.log(useId);
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_Collection).deleteOne({_id:ObjectId(useId)}).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })
    },
    getUserData:(useId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_Collection).findOne({_id:ObjectId(useId)}).then((data)=>{
                resolve(data)
            })
        })

    },
    updateuserdata:(userdata)=>{
        console.log(">>>>>>",userdata);
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_Collection).updateOne({_id:ObjectId(userdata._id)},{$set:{
                username:userdata.username,
                email:userdata.email
            }}).then((response)=>{
                resolve()
            })
        })
    },
    AdminSignup:(admininfo)=>{
        return new Promise(async(resolve,reject)=>{
            let admin=await db.get().collection(collection.Admin_Collecction).findOne({admin_user:admininfo.admin_user})
            if(admin){
                bcrypt.compare(admininfo.admin_pass,admin.admin_pass).then((status)=>{
                    if(status){
                        resolve( )
                    }else{
                        reject({error:"password"} )
                    }
                })

                
            }else{
                reject( {error:"username"})
            }
            
           

        })
        
        

    }
}