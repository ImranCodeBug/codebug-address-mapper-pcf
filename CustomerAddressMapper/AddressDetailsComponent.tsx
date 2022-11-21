import { IStackStyles, Stack, TextField } from '@fluentui/react';
import * as React from 'react';
import { Address } from './Models/EntityModel';

interface IAddressDetailsComponentProps {
    //address : Address
}

const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };

const AddressDetailsComponent: React.FunctionComponent<IAddressDetailsComponentProps> = (props) => {
  return (
  <>
    <Stack tokens={stackTokens} styles={stackStyles}>
        <TextField label='Line 1'></TextField>
        <TextField label='Line 2'></TextField>
        <TextField label='Line 3'></TextField>
        <TextField label='Postcode'></TextField>
        <TextField label='City'></TextField>
        <TextField label='Province'></TextField>
        <TextField label='County'></TextField>
        <TextField label='Country'></TextField>
    </Stack>
  </>) ;
};

export default AddressDetailsComponent;
