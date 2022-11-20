import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { Address, AddressMap, DynamicsEntity } from "./Models/EntityModel";
import {AddressComponent, IAddressComponentProps } from "./AddressComponent";
import { EntityRepository } from "./Repositories/EntityRepository";
import MainComponent, { IMainComponentProps } from "./MainComponent";

export class CustomerAddressMapper implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private _address : Address

    /**
     * Empty constructor.
     */
    constructor() {         
    }

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
        const props : IMainComponentProps = this.ConstructProps(context);
        return React.createElement(MainComponent, props);
    }

    private ConstructProps = (context : ComponentFramework.Context<IInputs>) : IMainComponentProps =>{        
        const entityRepository = new EntityRepository(context.webAPI)
 
        const buttonLabel = context.parameters.ButtonLabel.raw ? context.parameters.ButtonLabel.raw : "Set Address from Parent";
        const showButton = context.parameters.ShowButton.raw === 'yes';

        const parentEntity : DynamicsEntity = {
            entityLogicalName : (<any>context).parameters.Customer.raw[0].LogicalName,
            entityId : (<any>context).parameters.Customer.raw[0].Id._formattedGuid
            //entityId : '39269c3e-a55d-4eae-ae8d-3091818562d6'
        };

        return {
            parentEntity : parentEntity,            
            showButton : showButton,
            buttonLabelText : buttonLabel,
            entityRepository : entityRepository
        }
    }
    
    public updateAddressFields = (address : Address) :void => {
        this._address = address;
        this.notifyOutputChanged();
    }
    
    public getOutputs(): IOutputs {
        return{
            Street1 : this._address.line1,
            Street2 : this._address.line2,
            Street3 : this._address.line3,
            Postcode : this._address.postcode,
            Province : this._address.province,
            Country : this._address.country,
            County : this._address.county
        }
    }


    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
