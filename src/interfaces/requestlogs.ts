import { Document,Types } from 'mongoose';



export default interface IRequestLogs extends Document {
    RequestId:string;
    ipAddress:string;
    url:string;
    method:string;
    service:string;
    body:any;
    app:Types.ObjectId;
    user:Types.ObjectId;
    device: string;
    response: any;
    owner:Types.ObjectId;
    createdBy:Types.ObjectId;
    client:Types.ObjectId;
    developer:Types.ObjectId;
}