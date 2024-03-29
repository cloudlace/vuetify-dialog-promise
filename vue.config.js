module.exports = {
    transpileDependencies : [ "vue-i18n", "vuetify" ],
    chainWebpack : config =>
    {
        if( process.env.NODE_ENV === 'test' )
        {
            const sassRule = config.module.rule( 'sass' );
            sassRule.uses.clear();
            sassRule.use( 'null-loader' ).loader( 'null-loader' );
        }
    },
    pluginOptions: {
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        }
    }
};