import { IStackStyles, IStackTokens, Stack } from '@fluentui/react';
import * as React from 'react';
import ButtonComponent from './ButtonComponent';
import InformationComponent from './InformationComponent';
import AddressDetailsComponent from './AddressDetailsComponent';
import { ResponseStatus } from './Models/ResponseModel';
import { Address } from './Models/EntityModel';


export interface IAddressComponentProps {  
  showButton: boolean,
  showCustomAddressFields : boolean
  buttonLabelText : string,
  getAddressFromParent : () => Promise<void>,
  queryIsRunning : boolean,
  responseStatus : ResponseStatus | null,
  customerAddress : Address | null | undefined,
  clearAddress : () => void
}

const stackStyles: IStackStyles = {
}

const stackTokens: IStackTokens = {

}

export const AddressContainerComponent: React.FunctionComponent<IAddressComponentProps> = (props) => { 
  const {showButton, showCustomAddressFields, buttonLabelText, getAddressFromParent, 
    queryIsRunning, responseStatus, customerAddress, clearAddress } = props;
  
  return (
    <Stack styles={stackStyles} tokens={stackTokens}>
      {showButton ?
        <ButtonComponent setAddressField={getAddressFromParent} 
        buttonLabelText={buttonLabelText} 
        isRunning={queryIsRunning}></ButtonComponent>
        : null}

      {responseStatus != null ?
        <InformationComponent queryStatus={responseStatus!}></InformationComponent>
        : null}
      
      {showCustomAddressFields && customerAddress ? 
        <AddressDetailsComponent address={customerAddress} clearAddress={clearAddress}></AddressDetailsComponent>
        :null}
    </Stack>
  );
};


