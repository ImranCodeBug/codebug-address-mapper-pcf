import { initializeIcons } from '@fluentui/react';
import * as React from 'react';
import { AddressContainerComponent } from './AddressContainerComponent';
import { Address, DynamicsEntity } from './Models/EntityModel';
import { ResponseStatus } from './Models/ResponseModel';
import { IEntityRepository } from './Repositories/IEntityRepository';

export interface IMainComponentProps {
    parentEntity?: DynamicsEntity
    showButton: boolean
    buttonLabelText: string
    showCustomFields : boolean
    entityRepository: IEntityRepository
    updateAddress : (customerAddress : Address) => void
}

const MainComponent: React.FunctionComponent<IMainComponentProps> = (props) => {
    initializeIcons();
    const { parentEntity, showButton, buttonLabelText, showCustomFields, entityRepository, updateAddress } = props;

    const [responseStatus, setResponseStatus] = React.useState<ResponseStatus | null>(null)
    const [queryIsRunning, setQueryRunning] = React.useState<boolean>(false);
    const [customerAddress, setCustomerAddress] = React.useState<Address | null | undefined>(null);
    

    React.useEffect(() =>{    
        const executeSetAddressFromParent = async() =>{
        if(!showButton && parentEntity){
            await getAddressFromParent();
        }
        }
        executeSetAddressFromParent();
    }, [parentEntity, showButton])

    React.useEffect(() => {
        if(customerAddress){
        updateAddress(customerAddress);
        }    
    },[customerAddress])
    
    const getAddressFromParent = async () => {           
        setQueryRunning(true)

        const response = await entityRepository.GetAddressValueFromParent(parentEntity!)

        if(response){
        setQueryRunning(false);
        setResponseStatus(response.status);
        }
        setCustomerAddress(response.address)
    }

    
    return (
        <>
            {parentEntity ? <AddressContainerComponent 
            showButton={showButton} 
            showCustomAddressFields={showCustomFields} 
            buttonLabelText={buttonLabelText}
            getAddressFromParent ={getAddressFromParent}
            queryIsRunning={queryIsRunning}
            responseStatus={responseStatus}
            customerAddress={customerAddress}>                
            </AddressContainerComponent> : null}           
        </>
    )
};

export default MainComponent;
