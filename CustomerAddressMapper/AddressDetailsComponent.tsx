import { IStackStyles, Stack, TextField } from '@fluentui/react';
import * as React from 'react';
import { Address } from './Models/EntityModel';

interface IAddressDetailsComponentProps {
    address : Address
}

const stackTokens = { childrenGap: 10 };

const AddressDetailsComponent: React.FunctionComponent<IAddressDetailsComponentProps> = (props) => {
  return (
  <>
    <Stack tokens={stackTokens} style={{"textAlign" : "start"}} >
        <TextField readOnly label='Line 1' value='test'></TextField>
        <TextField readOnly label='Line 2'></TextField>
        <TextField readOnly label='Line 3'></TextField>
        <TextField readOnly label='Postcode'></TextField>
        <TextField readOnly label='City'></TextField>
        <TextField readOnly label='Province'></TextField>
        <TextField readOnly label='County'></TextField>
        <TextField readOnly label='Country'></TextField>
    </Stack>
  </>) ;
};

export default AddressDetailsComponent;
