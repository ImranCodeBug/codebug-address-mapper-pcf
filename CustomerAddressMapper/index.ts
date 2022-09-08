import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { AddressFieldSchemaName, DynamicsEntity } from "./Models/EntityModel";
import {AddressComponent, IAddressComponentProps } from "./AddressComponent";

export class CustomerAddressMapper implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        console.log(context);
        const props : IAddressComponentProps = this.ConstructProps(context);
        return React.createElement(AddressComponent, props);
    }

    private ConstructProps = (context : ComponentFramework.Context<IInputs>) =>{
        const parentEntity : DynamicsEntity = {
            entityLogicalName : 'lead',
            entityId : '42416478-bc04-4d16-9f92-26bc3296b6a0'
        };

        const childEntity : DynamicsEntity = {
            entityLogicalName  : 'dummyEntity',
            entityId : 'e7487b03-48ba-45f1-b231-54f2ab0b64dc'
        };

        const addressFields : AddressFieldSchemaName = {
            line1 : 'line1_field',
            line2 : 'line2_field',
            line3 : 'line3_field',
            city : 'city_field',
            postcode : 'postcode_field',
            country : 'country_field'
        }
        return {
            parentEntity : parentEntity,
            childEntity : childEntity,
            addressFieldMaps : addressFields,
            showButton : true
        }
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return { };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
