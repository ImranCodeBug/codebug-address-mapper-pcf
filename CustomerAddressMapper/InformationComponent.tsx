import { FontIcon, FontSizes, IStackItemStyles, IStackItemTokens, StackItem } from '@fluentui/react'
import * as React from 'react'
import { ResponseStatus } from './Models/ResponseModel'


export interface IInformationComponentProps {
    queryStatus : ResponseStatus
}

const stackItemStyles : IStackItemStyles = {    
    
}

const stackItemToken : IStackItemTokens = {

}

const getIconDetails = (queryStatus : ResponseStatus) => {    
    switch (queryStatus){
        case ResponseStatus.Error : {
            return {
                iconName : 'ErrorBadge',
                areaLabel : 'Error',
                iconStyle : {color : 'red', marginRight: 3, fontSize : FontSizes.size16},
                text : 'Error occured. Please see browser trace for more details'
            }
        }

        default : {
            return {
                iconName : 'SkypeCheck',
                areaLabel : 'Success',
                iconStyle : {color : 'Green', marginRight: 3, fontSize : FontSizes.size16},
                text : `Successfully updated the fields at ${new Date().toLocaleString()}`
            }
        }
    }
} 

const InformationComponent = (props: IInformationComponentProps) => {

    const iconDetails = getIconDetails(props.queryStatus);

  return (    
    <StackItem tokens={stackItemToken} >
        <div style={{
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent : 'center'
    }}>
            <FontIcon aria-label={iconDetails.areaLabel} iconName={iconDetails.iconName} style={iconDetails.iconStyle}/>
            <label>{iconDetails.text}</label>
        </div>
    </StackItem>    
  )
}

export default InformationComponent