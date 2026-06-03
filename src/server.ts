import Express, { type Request, type Response } from "express";
const app = Express();
const port = 3000
import {Pool} from "pg"

app.use(Express.json())


const pool = new Pool({
  connectionString : "postgresql://neondb_owner:npg_tfLjlB4Mvk7x@ep-rough-frog-aqro4uwh-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

const initDB = async()=>{
  try{
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      email VARCHAR(20) NOT NULL,
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

app.post('/users',async(req:Request,res:Response)=>{
   console.log(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})