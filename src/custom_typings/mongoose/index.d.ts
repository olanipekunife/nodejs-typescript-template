import * as Q from "q";

declare module "mongoose" {
  type Promise<T> = Q.Promise<T>;
}
