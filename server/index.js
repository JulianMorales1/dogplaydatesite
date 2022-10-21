const express = require("express");
const app = express();
const User = require("./modal/User")
const connectDB = require("./db")
const cors = require("cors");
const Dog = require("./modal/Dog");


connectDB()
app.use(cors())
app.use(express.json())

app.listen(5000, () => console.log("Server is Running"));

app.post("/SignUp", async (req, res) => {
    console.log(req.body);
   const user = await User.create(req.body) 
   if(user){
    res.status(200).json({
        success: true, 
        data: user,
    });
   }
});

app.post("/signin", async (req, res) => {
    console.log(req.body);
   const user = await User.find({
    email:req.body.email,password:req.body.password
   }) 
   if(user){
    res.status(200).json({
        success: true, 
        data: user,
    });
   }
});


// Inserting dogs in Dtabase

app.post('/dogs',async(req,res)=>{
    const {user,dog} = req.body;
    console.log('user >>>',user)
    console.log('dog .>>>',dog)

       if(false){
        res.status(400).json({
            success:false,
            message:'user credentials not correct!'
        })
       }else{
        dog['user']=user._id;
        const createdDog = await Dog.create(dog)

        if(createdDog){
            res.status(201).json(({
                success:true,
                data:createdDog
            }))
        }else{
            res.status(400).json({
                success:false,
                message:'Dog was not created!'
            })
        }
       }
})


app.put('/dogs/:id',async(req,res)=>{
    const {user,dog} = req.body;
    // const existingUser = await User.find({
    //     email:req.body.email,password:req.body.password
    //    }) 

       if(false){
        res.status(400).json({
            success:false,
            message:'user credentials not correct!'
        })
       }else{
        dog['user']=user._id;
        const updatedDog = await Dog.findByIdAndUpdate(req.params.id,dog)

        if(updatedDog){
            res.status(201).json(({
                success:true,
                data:updatedDog
            }))
        }else{
            res.status(400).json({
                success:false,
                message:'Dog was not updated!'
            })
        }
       }
})


app.delete('/dogs/:id',async(req,res)=>{
    //const {user,dog} = req.body;
    // const existingUser = await User.find({
    //     email:req.body.email,password:req.body.password
    //    }) 

       if(false){
        res.status(400).json({
            success:false,
            message:'user credentials not correct!'
        })
       }else{
        //dog['user']=user._id;
        const deletedDog = await Dog.findByIdAndDelete(req.params.id)

        if(deletedDog){
            res.status(201).json(({
                success:true,
                message:'deleted'
            }))
        }else{
            res.status(400).json({
                success:false,
                message:'Dog was not deleted!'
            })
        }
       }
})

// get dogs
app.get('/dogs/:userId',async (req,res)=>{

   
    // const existingUser = await User.find({
    //     email:req.params.email,password:req.params.password
    //    }) 

       if(false){
        res.status(400).json({
            success:false,
            message:'user credentials not correct!'
        })
       }else{
  
        const allDogs = await Dog.find({
            user:req.params.userId
        })

        if(allDogs){
            res.status(200).json(({
                success:true,
               data:allDogs
            }))
        }else{
            res.status(400).json({
                success:false,
                message:'No Dog was found!'
            })
        }
       }
})


