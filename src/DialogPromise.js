import Vue from 'vue';
import VueI18n from "vue-i18n";
import dlogI18n from "./i18n";
import SimpleDialog from './components/SimpleDialog';
import SimpleSnackbar from './components/SimpleSnackbar';

const _SimpleDialog = Vue.extend( SimpleDialog );
const _SimpleSnackbar = Vue.extend( SimpleSnackbar );
const defaults = {
};
/**
 * Vue instance controlling i18n.
 */
let vue;

/**
 * Registry of snackbars at different corners so we can display several.
 */
const snackbars = {
    top_left : 0,
    top_right : 0,
    bottom_left : 0,
    bottom_right : 0
}
/**
 * Show a dialog of type "alert", "confirm", or "prompt." Returned promise is resolved with the dialog result when the
 * user dismisses or completes it. Message can be a string or an Object with the following properties:
 *
 * title : {string},
 * text : {string},
 * acceptText : {string}
 * cancelText : {string},
 * theme : {Object}             Vuetify theme, see https://vuetifyjs.com/en/customization/theme
 * snackbarParent : {string?}   If provided, snackbars will be mounted under the element with this ID, else under the
 *                              node of the caller element.
 *
 * @param type {string<"alert","confirm","prompt">}
 * @param message {string|Object}
 * @returns {Promise<any>}
 * @private
 */
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
            const _message = {};
            Object.assign( _message, defaults, message );
            dlog = new _SimpleDialog( {
                propsData : {
                    type : type,
                    message : _message,
                    resolve : _resolve
                }
            } );
            dlog.$mount();
        } ).then( result =>
        {
            setTimeout( () => dlog.$destroy, 300 );
            if( result === false )
            {
                reject();
            }
            else
            {
                resolve( result );
            }
        } );
    } );
}

/**
 * Show a snackbar with the default color and message. If message is an Object, it controls the properties of the
 * snackbar:
 *
 * text : {string}
 * color : {string}
 * snackbarTimeout {integer}
 * snackbarX : {string<"left"|"right">}
 * snackbarY : {string<"top"|"bottom">}
 *
 * @param color
 * @param message
 * @private
 */
function _showSnackbar( color, message )
{
    if( typeof message === "string" )
    {
        message = {
            text : message
        }
    }
    const _message = {
        color : color
    };
    Object.assign( _message, defaults, message );
    _message.snackbars = { ...snackbars };
    const sbar = new _SimpleSnackbar( {
        propsData : _message
    } );
    const pNode = defaults.snackbarParent ? document.getElementById( defaults.snackbarParent ) : this.$vnode.elm;
    sbar.$mount();
    pNode.appendChild( sbar.$el );
    _countBar( _message, sbar, 1 )
    sbar.$on( "close", () =>
    {
        _countBar( _message, sbar,-1 );
        pNode.removeChild( sbar.$el );
        sbar.$destroy();
    } );
}

function _countBar( message, sbar, i )
{
    const height = sbar.$el.getBoundingClientRect().height;
    if( message.snackbarY === "top" )
    {
        if( message.snackbarX === "left" )
        {
            snackbars.top_left += i * ( height + 10 );
        }
        else
        {
            snackbars.top_right += i * ( height + 10 );
        }
    }
    else
    {
        if( message.snackbarX === "left" )
        {
            snackbars.bottom_left += i * ( height + 10 );
        }
        else
        {
            snackbars.bottom_right += i * ( height + 10 );
        }
    }
    return snackbars;
}


/**
 * Raise a snackbar with the "info" colour.
 *
 * @param message
 * @private
 */
function _inform( message)
{
    _showSnackbar.bind( this, "info" )( message );
}

/**
 * Raise a snackbar with the "warn" colour.
 *
 * @param message
 * @private
 */
function _warn( message )
{
    _showSnackbar.bind( this, "warning" )( message );
}

/**
 * Raise a snackbar with the "error" colour.
 *
 * @param message
 * @private
 */
function _error( message )
{
    _showSnackbar.bind( this, "error" )( message );
}

/**
 * Plugin which provides the following methods for use in components:
 *
 * $alert( message ).then( result => handler )
 * $confirm( message ).then( result => handler )
 * $prompt( message ).then( result => handler )
 * $inform( message )
 * $warn( message )
 * $error( message )
 *
 * See DialogPromiseDemo in this module for full documentation.
 *
 * @type {{install(*, *=): void, name: string}}
 */
const DialogPromise = {
    name : "DialogPromise",
    /**
     * Options:
     * - locale : {string}, default "en" - Locale identifier
     * - acceptText : {string}, default from locale - Dialog accept button label
     * - cancelText : {string}, default from locale - Dialog cancel button label
     * - closeText : {string}, default from locale - Snackbar close button label
     * - snackbarX : {"left"|"right"|"center"} - Snackbar position, default "right"
     * - snackbarY : {"top"|"bottom"} - Snackbar vertical position, default "top"
     * - snackbarTimeout : {integer} - Snackbar duration in millis, default 3000
     * - dialogMaxWidth : {integer} - Dialog max width in pixels, default 500
     * - theme : {Object} - Vuetify theme, see https://vuetifyjs.com/en/customization/theme (default is default theme)
     *
     * @param Vue {Vue}
     * @param options {object}
     */
    install( Vue, options )
    {
        options = options || {};
        Vue.use( VueI18n );
        const i18n = new VueI18n( {
            locale : options.locale || "en",
            fallbackLocale : "en",
            messages : dlogI18n
        } );
        vue = new Vue( { i18n } );
        Object.assign( defaults, {
            acceptText : vue.$t( "message.Accept" ),
            cancelText : vue.$t( "message.Cancel" ),
            closeText : vue.$t( "message.Close" ),
            snackbarX : "right",
            snackbarY : "top",
            snackbarTimeout : 3000,
            dialogMaxWidth : 500,
            theme : {}
        }, options );
        Vue.prototype.$alert = _showDialog.bind( this, "alert" );
        Vue.prototype.$confirm = _showDialog.bind( this, "confirm" );
        Vue.prototype.$prompt = _showDialog.bind( this, "prompt" );
        Vue.prototype.$inform = _inform;
        Vue.prototype.$warn = _warn;
        Vue.prototype.$error = _error;
    }
};
export default DialogPromise;
