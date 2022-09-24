import { copyFile } from "fs";
import { DynamicsEntity, AddressMap } from "../Models/EntityModel";
import { QueryReponse, ResponseStatus } from "../Models/ResponseModel";
import { IEntityRepository } from "./IEntityRepository";

export class EntityRepository implements IEntityRepository {
    constructor(private readonly _webApi: ComponentFramework.WebApi, private readonly _fieldMap: AddressMap) { }

    GetAddressValueFromParent = async (parentRecord: DynamicsEntity) => {
        return await this._webApi.retrieveRecord(parentRecord.entityLogicalName, parentRecord.entityId, "?$select=address1_county,address1_line3,address1_postalcode,address1_stateorprovince,address1_city,address1_line1,address1_country,address1_line2")
            .then(response => {
                this.MapEntityResultToAddress(response)
                const result: QueryReponse = {
                    status: ResponseStatus.Success
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
    
    SetAddressValueInChild = async (childRecord: DynamicsEntity) => {
        const data = this.MapFieldMapToJson();
        return await this._webApi.updateRecord(childRecord.entityLogicalName, childRecord.entityId, data)
            .then((response) => {
                const result: QueryReponse = {
                    status: ResponseStatus.Success
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
    }

    private MapFieldMapToJson = () => {
        const jsonMap = new Map<string, string | undefined>();
        if (this._fieldMap.line1) {
            jsonMap.set(this._fieldMap.line1.schemaName, this._fieldMap.line1.value);
        }

        if (this._fieldMap.line2) {
            jsonMap.set(this._fieldMap.line2.schemaName, this._fieldMap.line2.value);
        }

        if (this._fieldMap.line3) {
            jsonMap.set(this._fieldMap.line3.schemaName, this._fieldMap.line3.value);
        }

        if (this._fieldMap.postcode) {
            jsonMap.set(this._fieldMap.postcode.schemaName, this._fieldMap.postcode.value);
        }

        if (this._fieldMap.city) {
            jsonMap.set(this._fieldMap.city.schemaName, this._fieldMap.city.value);
        }

        if (this._fieldMap.county) {
            jsonMap.set(this._fieldMap.county.schemaName, this._fieldMap.county.value);
        }

        if (this._fieldMap.province) {
            jsonMap.set(this._fieldMap.province.schemaName, this._fieldMap.province.value);
        }

        if (this._fieldMap.country) {
            jsonMap.set(this._fieldMap.country.schemaName, this._fieldMap.country.value);
        }

        return Object.fromEntries(jsonMap);
    }

    private MapEntityResultToAddress = (result: any) => {
        if (this._fieldMap.line1) {
            this._fieldMap.line1.value = result.address1_line1
        }

        if (this._fieldMap.line2) {
            this._fieldMap.line2.value = result.address1_line2
        }

        if (this._fieldMap.line3) {
            this._fieldMap.line3.value = result.address1_line3
        }

        if (this._fieldMap.postcode) {
            this._fieldMap.postcode.value = result.address1_postalcode
        }

        if (this._fieldMap.city) {
            this._fieldMap.city.value = result.address1_city
        }

        if (this._fieldMap.county) {
            this._fieldMap.county.value = result.address1_county
        }

        if (this._fieldMap.province) {
            this._fieldMap.province.value = result.address1_stateorprovince
        }

        if (this._fieldMap.country) {
            this._fieldMap.country.value = result.address1_country
        }
    }
}