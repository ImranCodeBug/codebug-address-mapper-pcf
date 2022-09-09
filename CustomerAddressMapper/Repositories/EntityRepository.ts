import { DynamicsEntity, AddressMap } from "../Models/EntityModel";
import { QueryReponse, ResponseStatus } from "../Models/ResponseModel";
import { IEntityRepository } from "./IEntityRepository";

export class EntityRepository implements IEntityRepository{
    constructor(private readonly _webApi : ComponentFramework.WebApi, private readonly _fieldMap : AddressMap){}
    GetAddressValueFromParent = async(parentRecord: DynamicsEntity ) => {        
        return await this._webApi.retrieveRecord(parentRecord.entityLogicalName, parentRecord.entityId, "?$select=address1_county,address1_line3,address1_postalcode,address1_stateorprovince,address1_city,address1_line1,address1_country,address1_line2")
            .then(response => {
                this.MapEntityResultToAddress(response)
                const result : QueryReponse = {
                    status : ResponseStatus.Success
                }
                console.log(this._fieldMap)
                return result
            })
            .catch((error : any) => {
                const result : QueryReponse = {
                    status : ResponseStatus.Error,
                    errorText : error.message
                }
                return result
            })        
    };
    SetAddressValueInChild: (childRecord: DynamicsEntity) => Promise<QueryReponse>;

    private MapEntityResultToAddress = (result : any) => {
        if(this._fieldMap.line1){
            this._fieldMap.line1.value = result.address1_line1
        }

        if(this._fieldMap.line2){
            this._fieldMap.line2.value = result.address1_line2
        }

        if(this._fieldMap.line3){
            this._fieldMap.line3.value = result.address1_line3
        }

        if(this._fieldMap.postcode){
            this._fieldMap.postcode.value = result.postcode
        }

        if(this._fieldMap.city){
            this._fieldMap.city.value = result.city
        }

        if(this._fieldMap.county){
            this._fieldMap.county.value = result.county
        }

        if(this._fieldMap.province){
            this._fieldMap.province.value = result.province
        }

        if(this._fieldMap.country){
            this._fieldMap.country.value = result.country
        }
    }
}