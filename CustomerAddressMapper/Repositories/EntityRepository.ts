import { DynamicsEntity, Address } from "../Models/EntityModel";
import { QueryReponse, ResponseStatus } from "../Models/ResponseModel";
import { IEntityRepository } from "./IEntityRepository";

export class EntityRepository implements IEntityRepository {
    constructor(private readonly _webApi: ComponentFramework.WebApi) { }

    GetAddressValueFromParent = async (parentRecord: DynamicsEntity) => {
        return await this._webApi.retrieveRecord(parentRecord.entityLogicalName, parentRecord.entityId, "?$select=address1_county,address1_line3,address1_postalcode,address1_stateorprovince,address1_city,address1_line1,address1_country,address1_line2")
            .then(response => {
                const address = this.MapEntityResultToAddress(response);
                const result: QueryReponse = {
                    status: ResponseStatus.Success,
                    address : address
                }
                return result
            })
            .catch((error: any) => {
                console.error(error);
                const result: QueryReponse = {
                    status: ResponseStatus.Error,
                    errorText: error.message
                }
                return result
            })
    };    
    
    private MapEntityResultToAddress = (result: any) => {
        const address : Address = {
            line1 : result.address1_line1,
            line2 : result.address1_line2,
            line3 : result.address1_line3,
            postcode : result.address1_postalcode,
            city : result.address1_city,
            county : result.address1_county,
            province : result.address1_stateorprovince,
            country : result.address1_country
        }
        return address;
    }
}