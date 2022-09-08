import { IStackItemStyles, IStackStyles, IStackTokens, Stack, StackItem } from '@fluentui/react';
import * as React from 'react';
import ButtonComponent from './ButtonComponent';
import { AddressFieldSchemaName, 
  DynamicsEntity } from './Models/EntityModel';
import { initializeIcons } from '@fluentui/font-icons-mdl2';

export interface IAddressComponentProps {
    parentEntity : DynamicsEntity
    childEntity : DynamicsEntity,
    addressFieldMaps : AddressFieldSchemaName,
    showButton : boolean
}

const stackStyles : IStackStyles = {
}

const stackTokens : IStackTokens = {

}

export const AddressComponent: React.FunctionComponent<IAddressComponentProps> = (props) => {
  initializeIcons();
  
  const setAddressFromParent = async() =>{
    console.log("called");
  }
  return  (
    <Stack styles={stackStyles} tokens={stackTokens}> 
      {props.showButton ?  
        <ButtonComponent setAddressField={setAddressFromParent}></ButtonComponent>
      : null}      
    </Stack>
  );
};


