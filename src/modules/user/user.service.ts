import { pool } from "../../db/index.js";
import type { IUser } from "./user.interface.js";

const createuserintodb = async(payload:IUser)=>{
    const {name,email,password,age}= payload;
     const result = await pool.query(
      `Insert INTO users(name,email,password,age) VALUES($1,$2,$3,$4) RETURNING *`,
      [name,email,password,age],
    );
    return result;
}
export const userService ={
    createuserintodb,
}