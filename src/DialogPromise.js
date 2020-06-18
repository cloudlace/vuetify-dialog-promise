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
const snackbars = []
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
    const pos = {
        height: 0,
        width: 0,
        top_left : 0,
        top_right : 0,
        top_center : 0,
        bottom_left : 0,
        bottom_right : 0,
        bottom_center : 0,
        snackbar_x : _message.snackbarX || 'right',
        snackbar_y : _message.snackbarY || 'top'
    };
    snackbars.push( pos );
    _message.position = pos;
    const sbar = new _SimpleSnackbar( {
        propsData : _message
    } );
    const pNode = defaults.snackbarParent ? document.getElementById( defaults.snackbarParent ) : this.$vnode.elm;
    sbar.$mount();
    pNode.appendChild( sbar.$el );
    _addBar( sbar, pos );
    sbar.$on( "close", () =>
    {
        pNode.removeChild( sbar.$el );
        sbar.$destroy();
        snackbars.splice( snackbars.indexOf( pos ), 1 );
        _computeOffsets();
    } );
}

/**
 * Add a bar and recompute offsets.
 *
 * @param sbar
 * @param pos
 * @private
 */
function _addBar( sbar, pos )
{
    const r = sbar.$el.getBoundingClientRect();
    pos.height = r.height;
    pos.width = r.width;
    _computeOffsets();
}

/**
 * Recompute position of each bar.
 *
 * @private
 */
function _computeOffsets()
{
    const offsets = {
        top_left : 0,
        top_right : 0,
        top_center : 0,
        bottom_left : 0,
        bottom_right : 0,
        bottom_center : 0
    }
    for( let i = 0; i < snackbars.length; i++ )
    {
        const snackbar = snackbars[ i ];
        offsets[ `${snackbar.snackbar_y}_${snackbar.snackbar_x}` ] += snackbar.height + 10;
        Object.assign( snackbar, offsets );
    }
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
