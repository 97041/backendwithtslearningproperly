import { Router, type Request, type Response } from "express";
import { pool } from "../../db/index.js";
import { userController } from "./user.controller.js";

const router = Router()


router.post('/',userController.createuser);
router.get("/",userController.getAllusers);
router.delete("/:id",userController.deleteuser);

export const userRoute = router;