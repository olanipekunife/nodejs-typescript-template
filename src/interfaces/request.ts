import { Document } from 'mongoose';



export default interface IRequest extends Document {
    RequestId:string;
    service:string;
    method:string;
    uri:string;
    responseStatusCode:number;
    response:any;
    headers:any;
    data:any;
    title: string;
    retriedAt: Date;
}