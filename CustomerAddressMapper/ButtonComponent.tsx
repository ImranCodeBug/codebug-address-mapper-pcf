import { DefaultButton, FontWeights, IIconProps, ISpinnerStyles, IStackItemStyles, PrimaryButton, Spinner, SpinnerSize, StackItem } from '@fluentui/react';
import * as React from 'react';

interface IButtonComponentProps {
    setAddressField : () => Promise<void>,
    isRunning : boolean    
}

const stackItemStyles : IStackItemStyles = {}
const contactInfo: IIconProps = { iconName: 'SearchAndApps' };

const ButtonComponent: React.FunctionComponent<IButtonComponentProps> = (props) => {
    const {setAddressField, isRunning} = props;

    const buttonClick = async() =>{        
        await setAddressField();
    }    

  return (
    <StackItem styles={stackItemStyles}>
        <span>
            <DefaultButton text="Set Address from Parent"  onClick={()=> buttonClick()} iconProps={contactInfo} checked={isRunning}>
                {isRunning ? 
                    <Spinner size={SpinnerSize.medium} style={{color: 'white', marginRight : 2 }} />
                : null}
            </DefaultButton>
            
        </span>
    </StackItem>
  )
};

export default ButtonComponent;
