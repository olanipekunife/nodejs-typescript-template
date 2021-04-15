import { Document } from 'mongoose';



export default interface IClock extends Document {
 

    job:string;
    crontab:string;
    name:string;
    enabled:boolean;
    arguments:any;
    lastRunAt: Date;
}