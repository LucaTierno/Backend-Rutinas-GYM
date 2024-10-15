import { Schema, Types, model } from "mongoose";
import { Routine } from "../interfaces/routine.interface";
import { WeekDay } from "../enums/weekDay.enum";

const RoutineSchema = new Schema<Routine>(
  {
    user_id: {
      type: Types.ObjectId,
      ref: "Users",
      required: true,
    },
    weekDay: {
      type: String,
      enum: Object.values(WeekDay),
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const RoutineModel = model("Routines", RoutineSchema);

export default RoutineModel;
