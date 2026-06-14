import type { Request, Response } from "express";
import { pool } from "../../db/index.js";
import { userService } from "./user.service.js";

const createuser=async(req:Request,res:Response)=>{
   const {name,email,password,age} = req.body;

   try{
   const result = await userService.createuserintodb(req.body);

    res.status(201).json({
      success:true,
      message:"User created successfully",
      data: result.rows[0],
    });
   } catch(error: any){
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    })
   }
}

const getAllusers= async(req:Request,res:Response)=>{
 try{

  const fetchdata = await userService.getAllusersfromdb();
 

  res.status(200).json({
    success: true,
    message:"users fetched successfully from neondb",
    data: fetchdata.rows,
  });
 }
 catch(error:any){

     res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
    
 }
}


const deleteuser = async(req:Request,res:Response)=>{

   const { id } = req.params;
 try {

  const result = await userService.deleteuserfromdb(id as string);
   

   

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user: result.rows[0],
    });
  } catch (error:any) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

export const userController ={
    createuser,
    getAllusers,
    deleteuser
}