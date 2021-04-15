import log from "../logger";
import queue from "../queue";

import { Response } from "express";

// interface IModifiedResponse extends Response {
//     // define your properties here
//     unProcessable: (data: Record<string, unknown>, message: string) => void
//   }

export default function unProcessable(
  this: Response,
  data?: any,
  message?: string
): Response {
  log.warn(
    "Sending unProcessable entity response: ",
    data,
    message || "unProcessable entity"
  );
  const req: any = this.req;
  // const res = this;

  // Dump it in the queue
  const response: { requestId: any; response: Record<string, unknown> } = {
    requestId: null,
    response: {
      status: "error",
      data: data,
      message: message ? message : "unProcessable entity",
    },
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
    return this.status(422).json({
      status: "error",
      data: data,
      message: message ? message : "unProcessable entity",
    });
  } else {
    return this.status(422).json({
      status: "error",
      message: message ? message : "unProcessable entity",
    });
  }
}
