export type DynamicsEntity = {
    entityLogicalName : string,
    entityId : string
}

export type Address = {
    line1? : string,
    line2? : string,
    line3? : string,
    postcode? : string,
    city? : string, 
    county? : string,
    province? : string,
    country? : string
}