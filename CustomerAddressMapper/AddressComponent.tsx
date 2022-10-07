import { IStackStyles, IStackTokens, Stack } from '@fluentui/react';
import * as React from 'react';
import ButtonComponent from './ButtonComponent';
import { DynamicsEntity } from './Models/EntityModel';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { IEntityRepository } from './Repositories/IEntityRepository';
import { useEffect, useState } from 'react';
import InformationComponent from './InformationComponent';
import { ResponseStatus } from './Models/ResponseModel';

export interface IAddressComponentProps {
  parentEntity: DynamicsEntity
  childEntity: DynamicsEntity
  showButton: boolean,
  entityRepository: IEntityRepository
}

const stackStyles: IStackStyles = {
}

const stackTokens: IStackTokens = {

}

export const AddressComponent: React.FunctionComponent<IAddressComponentProps> = (props) => {
  initializeIcons();

  const [queryStatus, setIsRunning] = useState<ResponseStatus | null>(null)

  const { parentEntity, childEntity, showButton, entityRepository } = props  

  useEffect(() =>{
    const executeSetAddressFromParent = async() =>{
      if(!showButton){
        await setAddressFromParent();
      }
    }
    executeSetAddressFromParent();
  }, [parentEntity, showButton])

  const setAddressFromParent = async () => {
    
    setIsRunning(ResponseStatus.Running);
    
    const response = await entityRepository.GetAddressValueFromParent(parentEntity)
    const response1 = await entityRepository.SetAddressValueInChild(childEntity);
    setIsRunning(ResponseStatus.Completed)
  }
  return (
    <Stack styles={stackStyles} tokens={stackTokens}>
      {props.showButton ?
        <ButtonComponent setAddressField={setAddressFromParent} queryStatus={queryStatus}></ButtonComponent>
        : null}

      {queryStatus != null ?
        <InformationComponent queryStatus={queryStatus!}></InformationComponent>
        : null}
    </Stack>
  );
};


