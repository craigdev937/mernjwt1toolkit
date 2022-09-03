import express from "express";
import { USER } from "../controllers/UserCon.js";

export const UserRt = express.Router();
    UserRt.post("/", USER.Create);
    UserRt.get("/", USER.GetAll);
    UserRt.put("/", USER.Update);
    UserRt.delete("/", USER.Delete);



    