import { initializeIcons } from '@fluentui/react';
import * as React from 'react';
import { AddressContainerComponent } from './AddressContainerComponent';
import { Address, DynamicsEntity } from './Models/EntityModel';
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
    
    return (
        <>
            {parentEntity ? <AddressContainerComponent parentEntity={parentEntity!} showButton={showButton} 
            entityRepository={entityRepository} showCustomAddressFields={showCustomFields} 
            buttonLabelText={buttonLabelText}
            updateAddress={updateAddress}></AddressContainerComponent> : null}
           
        </>
    )
};

export default MainComponent;
