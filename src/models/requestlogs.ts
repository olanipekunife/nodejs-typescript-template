
import {logConnection} from '../connection'
const collection = 'RequestLogs';
import mongoose,{Schema} from 'mongoose'
const service = 'Users';
import IRequestLogs from '../interfaces/requestlogs';



const schemaObject = {
    RequestId: {
        type: 'String',
        unique: true
    },
    ipAddress: {
        type: 'String'
    },
    url: {
        type: 'String',
        index: true
    },
    method: {
        type: 'String',
        index: true
    },
    service: {
        type: 'String',
        default: service
    },
    body: {
        type: Schema.Types.Mixed
    },
    app: {
        type: Schema.Types.ObjectId,
        ref: 'Applications'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        index: true
    },
    device: {
        type: 'String'
    },
    response: {
        type: Schema.Types.Mixed
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Accounts',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Accounts',
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Clients',
    },
    developer: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
};

// Let us define our schema
const schema:Schema = new Schema(schemaObject,{timestamps:true});


const model = logConnection.model<IRequestLogs>(collection, schema);

export default model;
