

// const port= config.port;





import Express, { type Application, type Request, type Response } from "express";

// const port = 3000
import {Pool, Result} from "pg"
import config from "./config/index.js";
import { initDB, pool } from "./db/index.js";
import { userRoute } from "./modules/user/user.route.js";


const app:Application = Express();

const port= config.port;




app.use(Express.json())






app.get('/', (req, res) => {
  
  res.status(200).json({
    "message" : "Express Server",
    "author" : "Next Level"
  })
})


app.get('/getuser/:id',async(req,res)=>{
  const {id}=req.params;

  try{

        const results= await pool.query(
      `Select * from users where id=$1`,
      [id]
    );
      res.status(200).json({
      success:true,
      message:"User created successfully",
      data: results.rows[0],
    });

  }
  catch(error:any){
    res.status(500).json({

      success: false,
      message: error.message,
      error: error,

    })
  }
  // res.status(200).json({

  // })
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


app.use('/users',userRoute);

// app.post('/users',async(req:Request,res:Response)=>{
//    const {name,email,password,age} = req.body;

//    try{
//     const result = await pool.query(
//       `Insert INTO users(name,email,password,age) VALUES($1,$2,$3,$4) RETURNING *`,
//       [name,email,password,age],
//     );

//     res.status(201).json({
//       success:true,
//       message:"User created successfully",
//       data: result.rows[0],
//     });
//    } catch(error: any){
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       error: error,
//     })
//    }
// })
// app.get('/allusers',)

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


//     app.listen(config.port, () => {
//   console.log(`Example app listening on port ${config.port}`)
// })

export default app;