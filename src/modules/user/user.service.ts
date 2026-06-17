import { pool } from "../../db/index.js";
import type { IUser } from "./user.interface.js";
import bcrypt from "bcryptjs";

const createuserintodb = async(payload:IUser)=>{
    const {name,email,password,age}= payload;

    const hashpassword = await bcrypt.hash(password, 10);
     const result = await pool.query(
      `Insert INTO users(name,email,password,age) VALUES($1,$2,$3,$4) RETURNING *`,
      [name,email,hashpassword,age],
    );
    return result;
}

const getAllusersfromdb= async()=>{
    const result = await pool.query(`
        SELECT * FROM users
        `);

        return result;
}


const deleteuserfromdb = async(id: string)=>{
     const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    return result;
}
export const userService ={
    createuserintodb,
    getAllusersfromdb,
    deleteuserfromdb
}