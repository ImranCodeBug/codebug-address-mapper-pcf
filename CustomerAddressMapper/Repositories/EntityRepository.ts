import { DynamicsEntity, AddressMap } from "../Models/EntityModel";
import { QueryReponse, ResponseStatus } from "../Models/ResponseModel";
import { IEntityRepository } from "./IEntityRepository";

export class EntityRepository implements IEntityRepository{
    constructor(private readonly _webApi : ComponentFramework.WebApi){}
    GetAddressValueFromParent = async(parentRecord: DynamicsEntity, fieldMap: AddressMap) => {
        console.log(parentRecord)
        const res = await this._webApi.retrieveRecord(parentRecord.entityLogicalName, parentRecord.entityId, "?$select=address1_county,address1_line3,address1_postalcode,address1_stateorprovince,address1_city,address1_line1,address1_country,address1_line2")
            .then(response => {
                console.log(response)
            })
        
        const result : QueryReponse = {
            status : ResponseStatus.Error,
            errorText : "This is a demo"
        }

        return result;
    };
    SetAddressValueInChild: (childRecord: DynamicsEntity, fieldMap: AddressMap) => Promise<QueryReponse>;
}