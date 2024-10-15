import { Schema, model } from "mongoose";
import { User } from "../interfaces/user.interface";
import { CategoryPlan } from "../enums/categoryPlan.enum";
import { Role } from "../enums/role.enum";

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    phoneEmergency: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    categoryPlan: {
      type: String,
      enum: CategoryPlan,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      required: true,
    },
    routines: {
      type: [Schema.Types.ObjectId],
      ref: "Routines",
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = model("Users", UserSchema);

export default UserModel;
