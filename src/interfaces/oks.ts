import { Document } from "mongoose";

export default interface IOks extends Document {
  name: string;
  [key:string]:any
}
