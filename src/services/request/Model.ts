'use strict';
import {logConnection} from '../../connection'
import mongoose,{Schema,Model} from 'mongoose'
const collection = 'APICalls';
import IRequest from '../../interfaces/request'

const schemaObject = {
    RequestId: {
        type: 'String',
    },
    uri: {
        type: 'String',
        index: true
    },
    method: {
        type: 'String'
    },
    service: {
        type: 'String'
    },
    data: {
        type: mongoose.Schema.Types.Mixed
    },
    headers: {
        type: mongoose.Schema.Types.Mixed
    },
    response: {
        type: mongoose.Schema.Types.Mixed
    },
    responseStatusCode: {
        type: 'Number',
        index:true
    },
    retriedAt:Date
};



// Let us define our schema
const schema:Schema = new mongoose.Schema(schemaObject, {
    timestamps: true
});

const model = logConnection.model<IRequest>(collection, schema);

export default model;
