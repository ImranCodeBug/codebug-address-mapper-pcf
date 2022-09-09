import { AddressMap, DynamicsEntity } from "../Models/EntityModel";
import { QueryReponse } from "../Models/ResponseModel";

export interface IEntityRepository{
    GetAddressValueFromParent : (parentRecord : DynamicsEntity) => Promise<QueryReponse>
    SetAddressValueInChild : (childRecord : DynamicsEntity) => Promise<QueryReponse>

}