import { Router } from "express";

const router = Router();

router.post('/',profileController.createprofile);


export const profileRoute = router;