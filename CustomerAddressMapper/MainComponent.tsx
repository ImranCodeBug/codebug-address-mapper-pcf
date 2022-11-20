import { initializeIcons } from '@fluentui/react';
import * as React from 'react';
import { AddressComponent } from './AddressComponent';
import { DynamicsEntity } from './Models/EntityModel';
import { IEntityRepository } from './Repositories/IEntityRepository';

export interface IMainComponentProps {
    parentEntity?: DynamicsEntity
    showButton: boolean
    buttonLabelText: string
    entityRepository: IEntityRepository
}

const MainComponent: React.FunctionComponent<IMainComponentProps> = (props) => {
    initializeIcons();
    const { parentEntity, showButton, buttonLabelText, entityRepository } = props;
    
    return (
        <>
            {parentEntity ? <AddressComponent parentEntity={parentEntity!} showButton={showButton} 
            entityRepository={entityRepository} buttonLabelText={buttonLabelText}></AddressComponent> : null}
        </>
    )
};

export default MainComponent;
