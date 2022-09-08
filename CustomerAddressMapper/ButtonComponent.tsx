import { IIconProps, IStackItemStyles, PrimaryButton, StackItem } from '@fluentui/react';
import * as React from 'react';
import { useState } from 'react';

interface IButtonComponentProps {
    setAddressField : () => Promise<void>    
}

const stackItemStyles : IStackItemStyles = {}
const contactInfo: IIconProps = { iconName: 'SearchAndApps' };

const ButtonComponent: React.FunctionComponent<IButtonComponentProps> = (props) => {
    const [isRunning, setIsRunning] = useState(false)
    
    const buttonClick = async() =>{
        setIsRunning(true);
        await props.setAddressField();
        setIsRunning(false)
    }    

  return (
    <StackItem styles={stackItemStyles}>
        <span>
            <PrimaryButton text="Set Address from Parent" onClick={()=> buttonClick()} iconProps={contactInfo} checked={isRunning} />
            
        </span>
    </StackItem>
  )
};

export default ButtonComponent;
