import { DefaultButton, IIconProps, IStackItemStyles, Spinner, SpinnerSize, StackItem } from '@fluentui/react';
import * as React from 'react';
import { ResponseStatus } from './Models/ResponseModel';

interface IButtonComponentProps {
    setAddressField : () => Promise<void>,
    queryStatus : ResponseStatus | null,
    buttonLabelText : string   
}

const stackItemStyles : IStackItemStyles = {}
const contactInfo: IIconProps = { iconName: 'SearchAndApps' };

const ButtonComponent: React.FunctionComponent<IButtonComponentProps> = (props) => {
    const {setAddressField, queryStatus} = props;

    const isRunning = (queryStatus != null && queryStatus == ResponseStatus.Running)

    const buttonClick = async() =>{        
        await setAddressField();
    }    

  return (
    <StackItem styles={stackItemStyles}>
        <span>
            <DefaultButton text={props.buttonLabelText} onClick={()=> buttonClick()} iconProps={contactInfo} checked={isRunning}>
                {isRunning ? 
                    <Spinner size={SpinnerSize.medium} style={{color: 'white', marginRight : 2 }} />
                : null}
            </DefaultButton>            
        </span>
    </StackItem>
  )
};

export default ButtonComponent;
