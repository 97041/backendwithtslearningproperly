import { profile } from "node:console";

const createuserprofileintodb= async(payload:any)=>{

    const {user_id,bio,address,phone,gender} = payload;

    const result = await pool.query(
        `
        INSERT INTO profiles(user_id,bio,address,phone,gender) VALUES($1,$2,$3,$4,$5) RETURNING *
       `,
       
        , 
    )

}