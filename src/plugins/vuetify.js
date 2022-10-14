import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import 'vuetify/styles'


const vuetify = createVuetify( { 
    theme: {
        defaultTheme: 'light'
    },
    icons: {
        defaultSet: 'mdi',
        defaults: 'mdi',
        aliases,
        sets: {
            mdi
        }
    }, } );

export default vuetify;