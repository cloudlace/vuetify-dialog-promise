import { createVNode, ref, render } from 'vue';
import { createI18n } from "vue-i18n";
import dlogI18n from "./i18n";
import SimpleDialog from './components/SimpleDialog';
import SimpleSnackbar from './components/SimpleSnackbar';

const defaults = {
};
/**
 * App instance that dialogs & snackbar is supposed to be mounted on
 */
let appInstance;

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
 * theme : {string}             Vuetify theme, see https://vuetifyjs.com/en/features/theme/
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

            const vNode = createVNode(SimpleDialog, {
                type: type,
                message: _message,
                resolve: _resolve
            });

            vNode.appContext = appInstance._context;
            render(vNode, appInstance._container.firstElementChild);
        } ).then( result =>
        {
            
            setTimeout( () => {
                render(null, appInstance._container.firstElementChild)
            }, 300 );
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
    const pos = ref({
        height: 0,
        width: 0,
        top_left : 0,
        top_right : 0,
        top_center : 0,
        bottom_left : 0,
        bottom_right : 0,
        bottom_center : 0,
        snackbar_x : _message.snackbarX || 'right',
        snackbar_y : _message.snackbarY || 'top',
        snackbar_href : _message.href
    });
    snackbars.push( pos.value );
    _message.position = pos;

    const pNode = defaults.snackbarParent ? document.getElementById( defaults.snackbarParent ) : this.$el;
    const mountEl = document.createElement('div');
    pNode.appendChild(mountEl);

    const vNode = createVNode(SimpleSnackbar, {
        ..._message,
        onClose: () => {
            pNode.removeChild(mountEl);
            render(null, mountEl);
            snackbars.splice( snackbars.indexOf( pos.value ), 1 );
            _computeOffsets();
        }
    });

    vNode.appContext = appInstance._context
    render(vNode, mountEl);
    _addBar( mountEl.firstElementChild, pos.value );
}

/**
 * Add a bar and recompute offsets.
 *
 * @param sbar
 * @param pos
 * @private
 */
function _addBar( sbarEl, pos )
{
    const r = sbarEl.getBoundingClientRect();
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
     * - dialogMaxWidth : {integer} - Dialog max width in pixels, default 500
     * - theme : {Object} - Vuetify theme, see https://vuetifyjs.com/en/customization/theme (default is default theme)
     *
     * @param app {App<Element>}
     * @param options {object}
     */
    install( app, options )
    {
        appInstance = app;
        options = options || {};

        const i18n = createI18n({
            locale: options.locale || "en",
            fallbackLocale: "en",
            messages: dlogI18n
        });

        Object.assign( defaults, {
            acceptText : i18n.global.t( "message.Accept" ),
            cancelText : i18n.global.t( "message.Cancel" ),
            closeText : i18n.global.t( "message.Close" ),
            snackbarX : "right",
            snackbarY : "top",
            snackbarTimeout : 3000,
            dialogMaxWidth : 500,
            theme: "light",
        }, options );

        app.config.globalProperties.$alert = _showDialog.bind( this, "alert" );
        app.config.globalProperties.$confirm = _showDialog.bind( this, "confirm" );
        app.config.globalProperties.$prompt = _showDialog.bind( this, "prompt" );
        app.config.globalProperties.$inform = _inform;
        app.config.globalProperties.$warn = _warn;
        app.config.globalProperties.$error = _error;

        if( document && document.head && !document._vuetify_dialog_promise_styles )
        {
            const el = document.createElement( "style" );
            el.innerText = ".vdp-message {\n" +
                "  white-space: pre-wrap;\n" +
                "  font-size: 14px;\n" +
                "}\n" +
                "\n" +
                ".vdp-fake-close-icon {\n" +
                "  font-size: 18px !important;\n" +
                "  padding-left: 8px;\n" +
                "  margin-top: -4px;\n" +
                "}\n";
            document.head.appendChild( el );
            document._vuetify_dialog_promise_styles = el;
        }
    }
};
export default DialogPromise;
