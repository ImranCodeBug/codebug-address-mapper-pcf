import { Address } from "./EntityModel"

export enum ResponseStatus {
    Success = 0, 
    Error = 1,     
}

export type QueryReponse={
    status : ResponseStatus,
    errorText? : string,
    address ? : Address
} 