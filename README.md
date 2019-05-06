# vuetify-dialog-promise

A Promise API for Vuetify dialogs. Adds the following methods to the Vue instance:

* `$alert( /* {string}|{Object} */ message )`
* `$confirm( /* {string}|{Object} */ message )`
* `$prompt( /* {string}|{Object} */ message )`
* `$inform( /* {string}|{Object} */ message )`
* `$warn( /* {string}|{Object} */ message )`
* `$error( /* {string}|{Object} */ message )`

Full description in examples accessible from home page served by `npm run serve`.

## Usage example

```
import Vue from "vue";
import DialogPromise from "vuetify-dialog-promise";

Vue.use( DialogPromise, {
    locale : window.$cc_ui_locale,
    snackbarX : "left",
    snackbarY : "bottom"
} );
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
