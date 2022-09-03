import express from "express";
import { UserIndex } from "../controllers/UserCon.js";

export const UserRt = express.Router();
    UserRt.get("/", UserIndex);



    