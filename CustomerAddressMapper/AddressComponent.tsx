import { ISpinnerStyles, IStackStyles, IStackTokens, Stack } from '@fluentui/react';
import * as React from 'react';
import ButtonComponent from './ButtonComponent';
import { AddressMap, 
  DynamicsEntity } from './Models/EntityModel';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { IEntityRepository } from './Repositories/IEntityRepository';
import { useState } from 'react';

export interface IAddressComponentProps {
    parentEntity : DynamicsEntity
    childEntity : DynamicsEntity,
    addressFieldMaps : AddressMap,
    showButton : boolean,
    entityRepository : IEntityRepository
}

const stackStyles : IStackStyles = {
}

const stackTokens : IStackTokens = {

}



export const AddressComponent: React.FunctionComponent<IAddressComponentProps> = (props) => {
  initializeIcons();

  const [isRunning, setIsRunning] = useState(false)
  
  const {parentEntity, childEntity, 
    addressFieldMaps, showButton, entityRepository } = props
  
  const setAddressFromParent = async() =>{
    setIsRunning(true);
    const response = await entityRepository.GetAddressValueFromParent(parentEntity, addressFieldMaps)
    setIsRunning(false)
  }
  return  (
    <Stack styles={stackStyles} tokens={stackTokens}> 
      {props.showButton ?  
        <ButtonComponent setAddressField={setAddressFromParent} isRunning={isRunning}></ButtonComponent>
      : null}      
    </Stack>
  );
};


