import { AddressMap, DynamicsEntity } from "../Models/EntityModel";
import { QueryReponse } from "../Models/ResponseModel";

export interface IEntityRepository{
    GetAddressValueFromParent : (parentRecord : DynamicsEntity, fieldMap : AddressMap) => Promise<QueryReponse>
    SetAddressValueInChild : (childRecord : DynamicsEntity, fieldMap: AddressMap) => Promise<QueryReponse>

}