'use strict';
import log from '../logger'
import queue from '../queue'
import { Response }  from'express'

export default function forbidden(this: Response,data?:any, message?:string):Response {
    log.warn('Sending forbidden response: ', data, message || 'forbidden');
    const req:any = this.req;

    // Dump it in the queue
    const response:{requestId:any,response:Record<string, unknown>} = { response: { status: 'error', data: data, message: message ? message : 'forbidden' } ,requestId:null};
    response.requestId = req.requestId;

    queue.add('logResponse', response)

    if (data !== undefined && data !== null) {
        if (Object.keys(data).length === 0 && JSON.stringify(data) === JSON.stringify({})) {
            data = data.toString();
        }
    }

    if (data) {
       return this.status(403).json({ status: 'error', data: data, message: message ? message : 'forbidden' });
    } else {
       return this.status(403).json({ status: 'error', message: message ? message : 'forbidden' });
    }
};
