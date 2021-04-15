'use strict';
import config from '../../config'
import log from '../logger'
import queue from '../queue'
import { Response }  from'express'

export default function serverError(this: Response,data?:any, cache?:boolean, extraData?:any):Response {
   
    const req:any = this.req;
   
const res = this
    // Dump it in the queue
    const response:any = {};
    if (cache) {
        response.response = data;
        response.response.cached = cache;
    } else {
        response.response = { status: 'success', data: data };
    }

    if (extraData) {
        response.response = {...response.response, ...extraData};
    }

    response.requestId = req.requestId;
    // Encrypt response here
  
        log.info('Sending ok response: ', response.response);
        if (data) {
            // Only cache GET calls
            if (req.method === 'GET' && config.noFrontendCaching !== 'yes') {

                // If this is a cached response, show response else cache the response and show response.
                if (cache) {
                  return  res.status(200).json(response.response);
                } else {
                    // req.cacheKey
                    req.cache.set(req.cacheKey, response.response)
                        .then(function (resp) {
                          return  res.status(200).json(response.response);
                        })
                        .catch(function (err) {
                            log.error('Failed to cache data: ', err);
                            // This error shouldn't stop our response
                          return  res.status(200).json(response.response);
                        });
                }
            } else {
               return  res.status(200).json(response.response);
            }
        } else {
            return res.status(200).json(response.response);
        }
    
        return res.status(200).json(response.response);
    queue.add('logResponse', response)

};
