import { mainConnection } from "../connection";

import { Schema } from "mongoose";
const collection = "Samples";
import ISample from "../interfaces/sample";

const schemaObject = {
  // ++++++++++++++ Modify to your own schema ++++++++++++++++++
  sample: {
    type: "String",
    unique: true,
    required: true,
    uppercase: true,
  },

  // ++++++++++++++ Modify to your own schema ++++++++++++++++++
};

// Let us define our schema
const schema: Schema = new Schema(schemaObject, { timestamps: true });

schema.pre<ISample>("save", function (next) {
  next();
});

const model = mainConnection.model<ISample>(collection, schema);

export default model;
