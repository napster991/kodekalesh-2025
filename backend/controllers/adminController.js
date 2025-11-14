import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken"

const addDoctor = async(req,res)=>{

    try {
        const {name,email,password,speciality,degree,experience,about,fees,address} = req.body
        const imageFile = req.file
        
        if(!imageFile || !name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false,message:"fill all details"})
        }

        if(!validator.isEmail(email)){
            return res.json({message:"invalid email"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            password:hashedPassword,
            image:imageUrl,
            speciality,
            degree,
            experience,
            fees,
            // We are getting address in object format we need to convert it into string
            address:JSON.parse(address),
            about,
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true,message:"doctor added"})

        
    } catch (error) {
        res.json(error.message)
        throw new Error(error.message)
    }
}

const loginAdmin = async(req,res)=>{
    try {
        const {email,password} = req.body

        if(!email || !password){
            res.json({message:"fill all fields"})
        }
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)

            res.json({message:"Admin logged in",token,success:"true"})
        }
        else{
            res.json({message:"Invalid credentials"})
        }

    } catch (error) {
        res.json(error.message)
        console.log(error.message)
    }
}

const allDoctors = async(req,res)=>{
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})

    } catch (error) {
        res.json(error.message)
        console.log(error.message)
    }
}

export {addDoctor,loginAdmin,allDoctors} 