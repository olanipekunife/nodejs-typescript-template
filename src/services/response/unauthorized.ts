import log from "../logger";
import queue from "../queue";
import { Response } from "express";

// interface IModifiedResponse extends Response {
//     // define your properties here
//     unProcessable: (data: Record<string, unknown>, message: string) => void
//   }

export default function unAuthorized(
  this: Response,
  data?: any,
  message?: string
): Response {
  log.warn("sending unAuthorized response: ", data, message || "unAuthorized");
  const req: any = this.req;

  // Dump it in the queue
  const response: { requestId: any; response: Record<string, unknown> } = {
    response: {
      status: "error",
      data: data,
      message: message ? message : "unAuthorized",
    },
    requestId: null,
  };
  response.requestId = req.requestId;

  queue.add("logResponse", response);

  if (data !== undefined && data !== null) {
    if (
      Object.keys(data).length === 0 &&
      JSON.stringify(data) === JSON.stringify({})
    ) {
      data = data.toString();
    }
  }

  if (data) {
    return this.status(401).json({
      status: "error",
      data: data,
      message: message ? message : "unAuthorized",
    });
  } else {
    return this.status(401).json({
      status: "error",
      message: message ? message : "unAuthorized",
    });
  }
}
