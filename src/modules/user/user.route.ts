import { Router, type NextFunction, type Request, type Response } from "express";
import { pool } from "../../db/index.js";
import { userController } from "./user.controller.js";
import auth from "../../middleware/auth.js";

const router = Router();




router.post('/',userController.createuser);
router.get("/",auth(),userController.getAllusers);
router.delete("/:id",userController.deleteuser);

export const userRoute = router;