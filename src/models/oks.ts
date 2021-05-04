import { mainConnection } from "../connection";

import { Schema } from "mongoose";
const collection = 'Oks';
import IOk from "../interfaces/oks";
import logging from "../services/logger";

const schemaObject = {
  // ++++++++++++++ Modify to your own schema ++++++++++++++++++
  name: {
    type: "String",
   // unique: true,
    required: true,
    uppercase: true,
  },

  // ++++++++++++++ Modify to your own schema ++++++++++++++++++
};

// Let us define our schema
const schema: Schema = new Schema(schemaObject, { timestamps: true });

schema.pre<IOk>("save", function (next) {
  next();
});

schema.post<IOk>("save", function () {
  logging.debug("Mongo", "Checkout the ok we just saved: ", this);
});

const model = mainConnection.model<IOk>(collection, schema);

export default model;
