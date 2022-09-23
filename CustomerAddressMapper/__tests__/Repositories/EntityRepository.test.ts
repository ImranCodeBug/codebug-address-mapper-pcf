import { AddressMap, DynamicsEntity } from "../../Models/EntityModel";
import { EntityRepository } from "../../Repositories/EntityRepository";
import {describe, expect, test} from '@jest/globals';
import { ResponseStatus } from "../../Models/ResponseModel";


describe('Entity Repository', () =>{
    let _webApi : ComponentFramework.WebApi;
    let _fieldMap : AddressMap;    
    let _parentEntity : DynamicsEntity ={
        entityLogicalName : 'contact',
        entityId : '39269c3e-a55d-4eae-ae8d-3091818562d6'
    }

    const _errorResponse = {
        message : 'this is failed for no reason'
    }

    const _entityResponse = {        
        "address1_county": null,
        "address1_line3": null,
        "address1_postalcode": "85716",
        "address1_stateorprovince": null,
        "address1_city": "Munich",
        "address1_line1": "Konrad-Trey St 1000",
        "address1_country": "Germany",
        "address1_line2": "Dukes",
        "merged": false,
        "contactid": "b7a0e5b9-88df-e311-b8e5-6c3be5a8b200",
        "address1_composite": "Konrad-Trey St 1000\r\nDukes\r\n\r\n85716 Munich\r\nGermany"
    }

    beforeAll(() => {
        _fieldMap = {
            line1 : {schemaName : 'line1'},
            line2 : {schemaName : 'line2'},
            line3 : {schemaName : 'line3'},
            postcode : {schemaName : 'postcode'},
            county : {schemaName : 'county'},
            country : {schemaName : 'country'},
            city : {schemaName : 'city'},
            province : {schemaName : 'province'}
        };

        _webApi = {
            createRecord : jest.fn(),
            deleteRecord : jest.fn(),
            retrieveMultipleRecords : jest.fn(),
            retrieveRecord : jest.fn(),
            updateRecord : jest.fn()            
        }

    })

    test('initialized', () =>{
        let entityRepository = new EntityRepository(_webApi, _fieldMap);
        expect(entityRepository).toBeDefined();
    })

    test('When parent has data it will be succeeded', async() => {
        _webApi.retrieveRecord = jest.fn(
            () => Promise.resolve(_entityResponse));

        let entityRepository = new EntityRepository(_webApi, _fieldMap);

        var response = await entityRepository.GetAddressValueFromParent(_parentEntity);

        
        expect(response.status).toBe(ResponseStatus.Success);
        expect(_fieldMap.county).toBeDefined();        
        expect(_fieldMap.postcode).toBeDefined();
        expect(_fieldMap.city).toBeDefined();
        expect(_fieldMap.line1).toBeDefined();
        expect(_fieldMap.country).toBeDefined();
        expect(_fieldMap.line2).toBeDefined();
    })

    test('When it fails to execute it will have an error', async() => {
        _webApi.retrieveRecord = jest.fn(
            () => Promise.reject(_errorResponse));

        let entityRepository = new EntityRepository(_webApi, _fieldMap);

        var response = await entityRepository.GetAddressValueFromParent(_parentEntity);

        
        expect(response.status).toBe(ResponseStatus.Error);        
    })
})