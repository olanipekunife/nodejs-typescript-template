    declare namespace Express {
   
        interface Response {
            unProcessable: (data?: any, message?: string) => Response;
            unAuthorized: (data?:any, message?: string) => Response
            serverError: (data?:any, message?: string) => Response
            ok: (data?:any, cache?:boolean, extraData?:any) => Response
            notFound:()=>Response
            forbidden: (data?:any, message?: string) => Response
            badrRequest: (data?:any, message?: string) => Response
        }
        interface Request {
            requestId:string;
        appId?:string;
        accountId?:string
        }
    }
