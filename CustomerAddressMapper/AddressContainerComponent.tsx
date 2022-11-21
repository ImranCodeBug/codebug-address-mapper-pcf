import { IStackStyles, IStackTokens, Stack } from '@fluentui/react';
import * as React from 'react';
import ButtonComponent from './ButtonComponent';
import { Address, DynamicsEntity } from './Models/EntityModel';
import { IEntityRepository } from './Repositories/IEntityRepository';
import { useEffect, useState } from 'react';
import InformationComponent from './InformationComponent';
import { ResponseStatus } from './Models/ResponseModel';
import AddressDetailsComponent from './AddressDetailsComponent';


export interface IAddressComponentProps {
  parentEntity: DynamicsEntity  
  showButton: boolean,
  buttonLabelText : string,
  entityRepository: IEntityRepository
}

const stackStyles: IStackStyles = {
}

const stackTokens: IStackTokens = {

}

export const AddressContainerComponent: React.FunctionComponent<IAddressComponentProps> = (props) => { 
  const [responseStatus, setResponseStatus] = useState<ResponseStatus | null>(null)
  const [queryIsRunning, setQueryRunning] = useState<boolean>(false);
  const [customerAddress, setCustomerAddress] = useState<Address | null | undefined>(null);
  const { parentEntity, showButton, entityRepository, } = props  

  useEffect(() =>{    
    const executeSetAddressFromParent = async() =>{
      if(!showButton && parentEntity){
        await getAddressFromParent();
      }
    }
    executeSetAddressFromParent();
  }, [parentEntity, showButton])

  useEffect(() => {
    if(customerAddress){
      // call the address update method in the index
    }    
  },[customerAddress])
  
  const getAddressFromParent = async () => {           
    setQueryRunning(true)

    const response = await entityRepository.GetAddressValueFromParent(parentEntity)

    if(response){
      setQueryRunning(false);
      setResponseStatus(response.status);
    }
    setCustomerAddress(response.address)
  }
  return (
    <Stack styles={stackStyles} tokens={stackTokens}>
      {props.showButton ?
        <ButtonComponent setAddressField={getAddressFromParent} 
        buttonLabelText={props.buttonLabelText} 
        isRunning={queryIsRunning}></ButtonComponent>
        : null}

      {responseStatus != null ?
        <InformationComponent queryStatus={responseStatus!}></InformationComponent>
        : null}

        <AddressDetailsComponent></AddressDetailsComponent>
    </Stack>
  );
};


