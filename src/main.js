import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import DialogPromise from './DialogPromise'

Vue.use( DialogPromise );
Vue.config.productionTip = false;
new Vue( {
    render : h => h( App ),
} ).$mount( '#app' );
