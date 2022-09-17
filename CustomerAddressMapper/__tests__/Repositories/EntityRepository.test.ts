import { AddressMap } from "../../Models/EntityModel";
import { EntityRepository } from "../../Repositories/EntityRepository";
import {describe, expect, test} from '@jest/globals';


describe('Entity Repository', () =>{
    // let _webApi : ComponentFramework.WebApi;
    // let _fieldMap : AddressMap;

    // beforeAll(() => {
    //     _fieldMap = {
    //         line1 : {schemaName : 'line1'},
    //         line2 : {schemaName : 'line2'},
    //         line3 : {schemaName : 'line3'},
    //         postcode : {schemaName : 'postcode'},
    //         county : {schemaName : 'county'},
    //         country : {schemaName : 'country'},
    //         city : {schemaName : 'city'},
    //         province : {schemaName : 'province'}
    //     };

    //     _webApi = {
    //         createRecord : jest.fn(),
    //         deleteRecord : jest.fn(),
    //         retrieveMultipleRecords : jest.fn(),
    //         retrieveRecord : jest.fn(),
    //         updateRecord : jest.fn()            
    //     }

    // })

    // test('initialized', () =>{
    //     let entityRepository = new EntityRepository(_webApi, _fieldMap);
    //     expect(entityRepository).toBeDefined();
    // })

    test('test', () => {
        expect( 1== 1).toBe(true);
    })
})