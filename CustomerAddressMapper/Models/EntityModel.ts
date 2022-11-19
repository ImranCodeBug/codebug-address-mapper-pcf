export type DynamicsEntity = {
    entityLogicalName : string,
    entityId : string
}

export type AddressMap = {
    line1? : AddressPart,
    line2? : AddressPart,
    line3? : AddressPart,
    postcode? : AddressPart,
    city? : AddressPart, 
    county? : AddressPart,
    province? : AddressPart,
    country? : AddressPart
}

export type AddressPart = {
    schemaName : string,
    value? : string
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