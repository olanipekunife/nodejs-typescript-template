
import {logConnection} from '../../connection'
import mongoose,{Schema} from 'mongoose'
const collection = 'Clock';
import IClock from '../../interfaces/clock'


const schemaObject = {
    job: {
        type: 'String'
    },
    crontab: {
        type: 'String'
    },
    name: {
        type: 'String',
        unique: true
    },
    enabled: {
        type: 'Boolean',
        default: true
    },
    arguments: {
        type: mongoose.Schema.Types.Mixed
    },
    lastRunAt: Date
};


// Let us define our schema
const schema:Schema = new mongoose.Schema(schemaObject, {
    timestamps: true
});


const model = logConnection.model<IClock>(collection, schema);

export default model;
