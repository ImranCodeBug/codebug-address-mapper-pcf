import * as React from 'react';
import { AddressFieldSchemaName, DynamicsEntity } from './Models/EntityModel';

export interface IAddressComponentProps {
    parentEntity : DynamicsEntity
    childEntity : DynamicsEntity,
    addressFieldMaps : AddressFieldSchemaName,
    showButton : boolean
}

const setAddressField = () =>{
    
}

export const AddressComponent: React.FunctionComponent<IAddressComponentProps> = (props) => {
  return  null;
};


