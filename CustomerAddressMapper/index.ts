import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { AddressMap, DynamicsEntity } from "./Models/EntityModel";
import {AddressComponent, IAddressComponentProps } from "./AddressComponent";
import { EntityRepository } from "./Repositories/EntityRepository";

export class CustomerAddressMapper implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    public _boundField : string;

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
        const props : IAddressComponentProps = this.ConstructProps(context);
        return React.createElement(AddressComponent, props);
    }

    private ConstructProps = (context : ComponentFramework.Context<IInputs>) =>{
        const addressFieldMaps = this.ConstructAddressMapFromContext(context)
        const entityRepository = new EntityRepository(context.webAPI, addressFieldMaps)

        const parentEntity : DynamicsEntity = {
            entityLogicalName : (<any>context).parameters.Customer.raw[0].LogicalName,
            entityId : (<any>context).parameters.Customer.raw[0].Id._formattedGuid
            //entityId : '39269c3e-a55d-4eae-ae8d-3091818562d6'
        };

        const childEntity : DynamicsEntity = {
            entityLogicalName  : (<any>context).page.entityTypeName,
            entityId : (<any>context).page.entityId
        };

        return {
            parentEntity : parentEntity,
            childEntity : childEntity,            
            showButton : (context.parameters.ShowButton.raw === 'yes'),
            entityRepository : entityRepository,            
            customerAddressMapper : this,
            doSomething : this.doSomething
        }
    }

    private ConstructAddressMapFromContext = (context : ComponentFramework.Context<IInputs>) =>{
        const addressFieldMaps : AddressMap = {}

        if(context.parameters.Street1.raw){
            addressFieldMaps.line1 = {schemaName : context.parameters.Street1.raw}
        }

        if(context.parameters.Street2.raw){
            addressFieldMaps.line2 = {schemaName : context.parameters.Street2.raw}
        }

        if(context.parameters.Street3.raw){
            addressFieldMaps.line3 = {schemaName : context.parameters.Street3.raw}
        }

        if(context.parameters.Postcode.raw){
            addressFieldMaps.postcode = {schemaName : context.parameters.Postcode.raw}
        }

        if(context.parameters.County.raw){
            addressFieldMaps.county = {schemaName : context.parameters.County.raw}
        }

        if(context.parameters.City.raw){
            addressFieldMaps.city = {schemaName : context.parameters.City.raw}
        }

        if(context.parameters.Province.raw){
            addressFieldMaps.province = {schemaName : context.parameters.Province.raw}
        }

        if(context.parameters.Country.raw){
            addressFieldMaps.country = {schemaName : context.parameters.Country.raw}
        }

        return addressFieldMaps
    }


    public doSomething = (bdFiled : string) :void => {
        console.log(bdFiled)        
        this._boundField = bdFiled;
        this.notifyOutputChanged();
    }
    

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
