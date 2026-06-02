import Express, { type Request, type Response } from "express";
const app = Express();
const port = 3000

app.use(Express.json())

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