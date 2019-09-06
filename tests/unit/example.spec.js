import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import SimpleDialog from '../../src/components/SimpleDialog.vue';
function getDialog( propsData )
{
    const _SimpleDialog = Vue.extend( SimpleDialog );
    return new _SimpleDialog( { propsData : propsData } );
}

describe( 'SimpleDialog.vue', () =>
{
    it( "renders message.title when passed", () =>
    {
        const msg = { title : "Hello!", text : "Hello, world." };
        const dialog = shallowMount( SimpleDialog, {
            propsData : { message : msg }
        } );
        expect( dialog.text() ).to.include( msg.title );
    } );
    it( "resolves as true when accept is called", done =>
    {
        new Promise( resolve =>
        {
            getDialog( {
                message : { title : "Hello!", text : "Hello, world." },
                resolve : resolve
            } ).accept();
        } ).then( res =>
        {
            expect( res ).to.equal( true );
            done();
        } );
    } );
    it( "resolves with user input when accept is called and type === 'prompt'", done =>
    {
        new Promise( resolve =>
        {
            const dlog = getDialog( {
                type : "prompt",
                message : { title : "Hello!", text : "Hello, world." },
                resolve : resolve
            } );
            dlog.user_input = "Hello hello";
            dlog.accept();
        } ).then( res =>
        {
            expect( res ).to.equal( "Hello hello" );
            done();
        } );
    } );
    it( "resolves as false when cancel is called", done =>
    {
        new Promise( resolve =>
        {
            getDialog( {
                message : { title : "Hello!", text : "Hello, world." },
                resolve : resolve
            } ).cancel();
        } ).then( res =>
        {
            expect( res ).to.equal( false );
            done();
        } );
    } );
} );
