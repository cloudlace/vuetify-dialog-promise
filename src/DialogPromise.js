import Vue from 'vue';
import VueI18n from "vue-i18n";
import dlogI18n from "./i18n";

import Dialog from './components/Dialog';
import Snackbar from './components/Snackbar';
const _Dialog= Vue.extend( Dialog );
const _Snackbar = Vue.extend( Snackbar );

Vue.use( VueI18n );
const locale = window.location.pathname.indexOf( '/fi/' ) !== -1 ? "fi" : "en";
const i18n = new VueI18n( {
    locale : locale,
    fallbackLocale : "en",
    messages : dlogI18n
} );
const vue = new Vue( { i18n } );

function _showDialog( type, message )
{
    return new Promise( ( resolve, reject ) =>
    {
        let dlog;
        new Promise( _resolve =>
        {
            if( typeof message === "string" )
            {
                message = {
                    title : "",
                    text : message
                };
            }
            message.acceptText = message.acceptText || vue.$t( "message.Accept" );
            message.cancelText = message.cancelText || vue.$t( "message.Cancel" );
            dlog = new _Dialog( {
                propsData : {
                    type : type,
                    message : message,
                    complete : _resolve
                }
            } );
            dlog.$mount();
            dlog.show();
        } ).then( result =>
        {
            dlog.hide();
            setTimeout( () => dlog.$destroy, 300 );
            resolve( result );
        } );
    } );
}

function _showSnackbar( color, message )
{
    if( typeof message === "string" )
    {
        message = {
            text : message
        }
    }
    const _message = Object.assign( {
        text : "",
        x : "right",
        y : "top",
        color : color,
        timeout : 3000,
        closeText : vue.$t( "message.Close" )
    }, message );
    const sbar = new _Snackbar( {
        propsData : _message
    } );
    const dNode = document.getElementById( 'app' ).appendChild( document.createElement( "div" ) );
    sbar.$mount( dNode );
    sbar.show();
    sbar.$on( "close", () =>
    {
        sbar.$destroy();
    } );
}

const DialogPromise = {
    name : "DialogPromise",
    install( Vue, options )
    {
        Vue.prototype.$alert = _showDialog.bind( this, "alert" );
        Vue.prototype.$confirm = _showDialog.bind( this, "confirm" );
        Vue.prototype.$prompt = _showDialog.bind( this, "prompt" );
        Vue.prototype.$inform = _showSnackbar.bind( this, "info" );
        Vue.prototype.$warn = _showSnackbar.bind( this, "warning" );
        Vue.prototype.$error = _showSnackbar.bind( this, "error" );
    }
};
export default DialogPromise;
