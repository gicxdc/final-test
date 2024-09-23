import express from "express";
import mongoose, { Error } from "mongoose";
import connectDatabase from "./db.js";
import movieModel from "./schema/movie.js";
import UserModel from "./schema/user.js";
import jwt from 'jsonwebtoken'
import cors from 'cors'

const app = express();

connectDatabase();

app.use(express.json());
app.use(cors())

app.post("",async (req,res)=>{
    const{ID,name,time,year,image,introduce}=req.body
    try {
        const newMovie= await movieModel.create({ID,name,time,year,image,introduce})
        res.status(201).send({message:"movie created",data:newMovie})
    } catch (error) {
        res.status(401).send({message:error.message,data:null})
    }
})

app.put("",async (req,res) => {
    const{ID,name,time,year,image,introduce}=req.body

    try {
        const checkMovie=await movieModel.findOne({ID})
        if(!checkMovie) throw new Error("movie does not exist");

        const updated=await movieModel.findOneAndUpdate({ID},{name,time,year,image,introduce})
        res.status(201).send({message:"updated",data:{ID,name,time,year,image,introduce}})

    } catch (error) {
        res.status(401).send({message:error.message,data:null})
    }
})

app.delete("",async (req,res) => {
    const {ID}=req.body

    try {
        const checkMovie=await movieModel.findOne({ID})
        if(!checkMovie) throw new Error("movie does not exist");

        const del=await movieModel.findOneAndDelete({ID});
        res.status(201).send({message:"del success",data:checkMovie})

    } catch (error) {
        res.status(401).send({message:error.message,data:null})
    }
})

app.get("/sort/:sorted",async (req,res)=>{
    const{sorted}=req.params
    try {
        const sortIndex=Number(sorted)
        const result=await movieModel.find().sort({year:sortIndex})
        
        res.status(201).send({message:"sorted",data:result})
    } catch (error) {
        res.status(401).send({message:error.message,data:null})
    }
})

app.get("/find/:name",async(req,res)=>{
    try {
        const {name}=req.params
        const result=await (await movieModel.find()).filter((movie)=>movie.name.toLowerCase().includes(name.toLocaleLowerCase()))
        if (result.length==0) throw new Error("no data found");
        res.status(201).send({message:"found",data:result})
    } catch (error) {
        res.status(401).send({message:error.message,data:null})
    }
    
    
})

app.get("/:pageNumber",async (req,res)=>{
    const {pageNumber}=req.params;
    const totalItems = await movieModel.countDocuments();
    const pageSize=4

    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (pageNumber - 1) * pageSize;
    const result = await movieModel.find().skip(skip).limit(pageSize);
  
    const data = {
    totalItems,
    totalPages,
    currentPage: pageNumber,
    items: result,
    }

    res.status(201).send({message:"got data",data:data})
})

app.post("/login",async(req,res)=>{
    const {userName,password}=req.body
 
    try {
        if(!userName||!password) throw new Error("missing name or password");
        const currUser=await UserModel.findOne({userName})
        if(!currUser) throw new Error("no user found");
        if(password!=currUser.password) throw new  Error("wrong password")
        
        const token=jwt.sign({
            _id:currUser._id,
            userName:currUser.userName
        },"kei",{
            expiresIn: 60*5
        })

        res.status(201).send({message:"login success",data:token})
    } catch (error) {
        res.status(401).send({message:error.message,data:null})
    }
    
    app.get("/logout",async (req,res) => {
            req.user=null
            req.headers['authorization']=null
    
            res.status(203).send({message:"log out success"})
            //yeah tot nhat la doi cai token expire
    })
    
})

const PORT = 8000;                                                                                  
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});