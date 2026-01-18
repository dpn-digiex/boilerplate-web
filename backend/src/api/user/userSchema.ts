import { Schema, model, type Types } from "mongoose";

// Mongoose document interface (what's stored in DB)
export interface IUser {
  name: string;
  email: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}

// Lean query result (includes _id from MongoDB)
export type UserLean = IUser & {
  _id: Types.ObjectId;
  __v?: number;
};

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    collection: "users",
  },
);

userSchema.index({ email: 1 });

export const UserModel = model<IUser>("User", userSchema);
