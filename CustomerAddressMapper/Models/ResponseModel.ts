export enum ResponseStatus {
    Success, Error
}

export type QueryReponse={
    status : ResponseStatus,
    errorText? : string
}