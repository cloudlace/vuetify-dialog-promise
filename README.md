# vuetify-dialog-promise

A Promise API for Vuetify dialogs and utility for raising snackbar alerts. Adds the following methods to the Vue 
instance:

* `$alert( /* {string}|{Object} */ message )` - A classic alert. Promise, resolves when the user clicks OK.
* `$confirm( /* {string}|{Object} */ message )` - A classic confirm. Promise, resolves as true when the user 
clicks OK, as false when the user clicks Cancel.
* `$prompt( /* {string}|{Object} */ message )` - A classic prompt. Promise, resolves with user input if user clicks OK,
with false if the user clicks Cancel.
* `$inform( /* {string}|{Object} */ message )` - Raises a snackbar notification in the default colour.
* `$warn( /* {string}|{Object} */ message )` - Raises a snackbar notification in the warning colour.
* `$error( /* {string}|{Object} */ message )` - Raises a snackbar notification in the error colour.

Based on vue-cli3 and Vuetify.

Features:

* Button labels localised to a large variety of languages (pull requests welcome)
* Allows you to inject your own i18n or your own labels
* Various features of the dialogues and snackbars are configurable (e.g. dialog max width, snackbar location, colour, 
duration)

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
