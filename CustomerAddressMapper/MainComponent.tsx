import { initializeIcons } from '@fluentui/react';
import * as React from 'react';
import { AddressComponent } from './AddressComponent';

import { DynamicsEntity } from './Models/EntityModel';
import { IEntityRepository } from './Repositories/IEntityRepository';

interface IMainComponentProps {
    parentEntity?: DynamicsEntity
    showButton: boolean
    buttonLabelText: null | string
    entityRepository: IEntityRepository
}

const MainComponent: React.FunctionComponent<IMainComponentProps> = (props) => {
    initializeIcons();
    const { parentEntity, showButton, buttonLabelText, entityRepository } = props;

    // const line1Ref = React.useRef<HTMLInputElement>(null);
    // const line2Ref = React.useRef<HTMLInputElement>(null);
    // const line3Ref = React.useRef<HTMLInputElement>(null);   
    // const cityRef = React.useRef<HTMLInputElement>(null);
    // const provinceRef = React.useRef<HTMLInputElement>(null);
    // const countyRef = React.useRef<HTMLInputElement>(null);    
    // const countryRef = React.useRef<HTMLInputElement>(null);

    return (
        <>
            {parentEntity ? <AddressComponent parentEntity={parentEntity!} showButton={showButton} entityRepository={entityRepository}></AddressComponent> : null}
        </>
    )
};

export default MainComponent;
