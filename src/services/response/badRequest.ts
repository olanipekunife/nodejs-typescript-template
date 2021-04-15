'use strict';
import log from '../logger'
import queue from '../queue'
import { Response }  from'express'

export default function serverError(this: Response,data?:any, message?:string):Response {
    log.warn('Sending bad request response: ', data, message || 'bad request');
    const req:any = this.req;

    // Dump it in the queue
    const response:{requestId:any,response:Record<string, unknown>} = { response: { status: 'error', data: data, message: message ? message : 'bad request' } ,requestId:null};
    response.requestId = req.requestId;

    queue.add('logResponse', response)

    if (data !== undefined && data !== null) {
        if (Object.keys(data).length === 0 && JSON.stringify(data) === JSON.stringify({})) {
            data = data.toString();
        }
    }

    if (data) {
      return  this.status(400).json({ status: 'error', data: data, message: message ? message : 'bad request' });
    } else {
       return this.status(400).json({ status: 'error', message: message ? message : 'bad request' });
    }
};
