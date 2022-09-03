import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
import { NoteModel } from "../models/Notes.js";

class UserClass {
    Create = async (req, res, next) => {
        const { username, password, roles } = req.body;
        try {
            if (!username || !password || 
                !Array.isArray(roles) || !roles.length) {
                    return res.status(400)
                    .json({msg: "All fields are Required!"});
            };
            const duplicate = await UserModel
            .findOne({ username }).lean().exec();
            if (duplicate) {
                return res.status(409)
                .json({msg: "Duplicate Username!"});
            };
            const hashPassword = await bcrypt.hash(password, 10);
            const userObject = { 
                roles, username, "password": hashPassword
            };
            const user = await UserModel.create(userObject);
            if (user) {
                res.status(201).json({msg: `New user ${username} created`});
            } else {
                res.status(400).json({msg: "Invalude User"});
            }
        } catch (error) {
            res.status(400).json({msg: "User failed to Create"});
            next(error);
        }
    };

    GetAll = async (req, res, next) => {
        try {
            const users = await UserModel.find()
            .select("-password")
            .lean();
            if (!users?.length) {
                return res.status(400)
                .json({msg: "No Users Found!"});
            };
            res.json(users);
        } catch (error) {
            res.status(400).json({msg: error.message});
            next(error);
        }
    };

    Update = async (req, res, next) => {
        const { _id, username, roles, active, password } = req.body;
        try {
            if (!_id || !username || !Array.isArray(roles) 
                || !roles.length || typeof active !== "boolean") {
                    return res.status(400)
                    .json({msg: "Please fill out all fields"});
            };
            const user = await UserModel.findById(_id).exec()
            if (!user) {
                return res.status(400)
                .json({msg: "User not found!"});
            };
            const duplicate = await UserModel.findOne({ username })
            .lean().exec()
            if (duplicate && duplicate?._id.toString() !== _id) {
                return res.status(400)
                .json({msg: "Duplicate Username"});
            };
            user.username = username;
            user.roles = roles;
            user.active = active;
            if (password) {
                user.password = await bcrypt.hash(password, 10);
            };
            const updatedUser = await user.save();
            res.json({msg: `${updatedUser.username} updated`});
        } catch (error) {
            res.status(400).json({msg: error.message});
            next(error);
        }
    };

    Delete = async (req, res, next) => {
        const { _id } = req.body;
        try {
            if (!_id) {
                return res.status(400)
                .json({msg: "User ID Required!"});
            };
            const note = await NoteModel.findOne({ user: _id })
            .lean().exec();
            if (note) {
                return res.status(400)
                .json({msg: "User has assigned notes"});
            };
            const user = await UserModel.findById(_id).exec();
            if (!user) {
                return res.status(400)
                .json({msg: "User Not Found!"});
            };
            const result = await user.deleteOne();
            const reply = `Username ${result.username} 
                with ID ${result._id} deleted`;
            res.json(reply);
        } catch (error) {
            res.status(400).json({msg: error.message});
            next(error);
        }
    };
};

export const USER = new UserClass();






