import { Stack, TextField } from '@fluentui/react';
import * as React from 'react';
import { Address } from './Models/EntityModel';

interface IAddressDetailsComponentProps {
    address : Address
}

const stackTokens = { childrenGap: 10 };

const AddressDetailsComponent: React.FunctionComponent<IAddressDetailsComponentProps> = (props) => {
  const {line1, line2, line3, postcode, city, county, province, country} = props.address

  return (
  <>
    <Stack tokens={stackTokens} style={{"textAlign" : "start"}} >
        <TextField readOnly label='Line 1' value={line1}></TextField>
        <TextField readOnly label='Line 2' value={line2}></TextField>
        <TextField readOnly label='Line 3' value={line3}></TextField>
        <TextField readOnly label='Postcode' value={postcode}></TextField>
        <TextField readOnly label='City' value={city}></TextField>
        <TextField readOnly label='Province' value={province}></TextField>
        <TextField readOnly label='County' value={county}></TextField>
        <TextField readOnly label='Country' value={country}></TextField>
    </Stack>
  </>) ;
};

export default AddressDetailsComponent;
