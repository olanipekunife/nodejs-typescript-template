import log from '../logger'
import queue from '../queue'
import { Response }  from'express'

export default function serverError(this: Response,data?:any, message?:string):Response {
    
    log.error('sending server error response: ', data, message || 'server error');

    const req:any = this.req;
    // Dump it in the queue
    const response:{requestId:any,response:Record<string, unknown>} = { response: { status: 'error', data: data, message: message ? message : 'server error' },requestId :null };
    response.requestId = req.requestId;
    queue.add('logResponse', response)

    if (data !== undefined && data !== null) {
        if (Object.keys(data).length === 0 && JSON.stringify(data) === JSON.stringify({})) {
            data = data.toString();
        }
    }
    let statusCode;
    if (data.statusCode) {
        statusCode = data.statusCode;
    } else {
        statusCode = 500;
    }

    if (data) {
      return  this.status(statusCode).json({ status: 'error', data: data, message: message ? message : 'server error' });
    } else {
      return  this.status(statusCode).json({ status: 'error', message: message ? message : 'server error' });
    }
};
