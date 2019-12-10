import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import DialogPromise from './DialogPromise';
import i18n from './i18n';

function _getLocale()
{
    let locale = "en";
    const locales = Object.keys( i18n );
    for( let i = 0; i < locales.length; i++ )
    {
        if( window.location.pathname.indexOf( '/' + locales[ i ] + '/' ) !== -1 )
        {
            locale = locales[ i ];
            return locale;
        }
    }
    return locale;
}

Vue.use( DialogPromise, { locale : _getLocale() } );
Vue.config.productionTip = false;
new Vue( {
    vuetify,
    render : h => h( App )
} ).$mount( '#app' );
