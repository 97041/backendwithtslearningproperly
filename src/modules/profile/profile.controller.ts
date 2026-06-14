


const createprofile = async(req:Request, res:Response)=>{

    

    try{
       const result = await profileService.createuserprofileintodb(req.body);
    
        res.status(201).json({
          success:true,
          message:"UserProfile created successfully",
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

export const profileController ={
    createprofile,
}