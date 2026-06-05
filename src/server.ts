import Express, { type Application, type Request, type Response } from "express";

// const port = 3000
import {Pool, Result} from "pg"
import config from "./config/index.js";


const app:Application = Express();

const port= config.port;




app.use(Express.json())


const pool = new Pool({
  connectionString : config.connection_string,
  
});

const initDB = async()=>{
  try{
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      email VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(20) NOT NULL,
      is_active BOOLEAN DEFAULT true,
      age INT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )`)
  }catch(error){
    console.log("database connected successfully");
  }
}

initDB();

app.get('/', (req, res) => {
  
  res.status(200).json({
    "message" : "Express Server",
    "author" : "Next Level"
  })
})


app.delete('/user/:id',async(req:Request,res:Response)=>{
  const {id}=req.params;

  try{

    const results= await pool.query(
      `Delete from users where id=$1`,
      [id]
    );
      res.status(201).json({
      success:true,
      message:"User created successfully",
      data: {},
    });

  }
  catch(error:any){

       res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    })

  }
})


app.put("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email,password,age,is_active} = req.body;

  // console.log("Id : ", id);
  // console.log({ name, password, age, is_active });

  try {
    const result = await pool.query(
      `
    UPDATE users 
    SET 
    name=COALESCE($1,name),
    email=COALESCE($2,email),
    password=COALESCE($3,password),
    is_active=COALESCE($4,is_active),
    
    age=COALESCE($5,age)                                                 
    
                                      
    WHERE id=$6 RETURNING *
    `,
      [name,email, password, is_active, age,id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found!",
      });
    }

    // console.log(result);
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

app.post('/users',async(req:Request,res:Response)=>{
   const {name,email,password,age} = req.body;

   try{
    const result = await pool.query(
      `Insert INTO users(name,email,password,age) VALUES($1,$2,$3,$4) RETURNING *`,
      [name,email,password,age],
    );

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
})
app.get('/allusers',async(req:Request,res:Response)=>{
 try{
  const fetchdata= await pool.query(
    `select *from users`,
  );

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
})

app.get('/singleusers/:id',async(req:Request,res:Response)=>{
  const {id}=req.params;
 try{
  const fetchdata= await pool.query(
    `select *from users where id=$1`,
    [id],
  );

     if (fetchdata.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found!",
        data: {},
      });
    }

  res.status(200).json({
    success: true,
    message:"single user fetched successfully",
    data: fetchdata.rows[0],
  });
 }
 catch(error:any){

     res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
    
 }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})