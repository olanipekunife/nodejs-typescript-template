'use strict';
import log from '../logger'
import queue from '../queue'
import { Response }  from'express'

export default function serverError(this: Response):Response {
    log.warn('Sending 404 response: ' + 'not found');
    const req:any = this.req;

    // Dump it in the queue
    const response:{requestId:any,response:Record<string, unknown>} = { response: { status: 'error', message: 'not found' },requestId:null };
    response.requestId = req.requestId;

    queue.add('logResponse', response)

  return  this.status(404).json({ status: 'error', message: 'not found' });
};
