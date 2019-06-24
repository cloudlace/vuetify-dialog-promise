# vuetify-dialog-promise

A Promise API for Vuetify dialogs and utility for raising snackbar alerts. Adds the following methods to the Vue 
instance:

* `$alert( /* {string}|{Object} */ message )` - A classic alert. Promise, resolved when the user clicks OK.
* `$confirm( /* {string}|{Object} */ message )` - A classic confirm. Promise, resolved if the user clicks OK, rejected 
if the user clicks Cancel.
* `$prompt( /* {string}|{Object} */ message )` - A classic prompt. Promise, resolved with user input if user clicks OK,
rejected if the user clicks Cancel.
* `$inform( /* {string}|{Object} */ message )` - Raises a snackbar notification in the default colour.
* `$warn( /* {string}|{Object} */ message )` - Raises a snackbar notification in the warning colour.
* `$error( /* {string}|{Object} */ message )` - Raises a snackbar notification in the error colour.

Based on vue-cli3 and Vuetify.

Features:

* Button labels localised to a large variety of languages (pull requests welcome) - Localisations for the buttons are
from the Dojo toolkit i18n.
* Allows you to inject your own button labels, overriding the defaults
* Various features of the dialogues and snackbars are configurable (e.g. dialog max width, snackbar location, colour, 
duration)

Full description in examples accessible from home page served by `npm run serve`.

## Configurable properties

Various properties can be configured by handing them to Vue.use in the `options` argument when installing the plugin. 
All of these are optional and have defaults:

* `acceptText` : Label for accept button in dialog
* `cancelText` : Label for cancel button in dialog
* `closeText` : Label for close button in snackbar message
* `snackbarX` : Position of snackbar message: "left" or "right"
* `snackbarY` : Position of snackbar message: "top" or "bottom"
* `snackbarTimeout` : Snackbar duration in milliseconds
* `dialogMaxWidth` : Max width of dialog in pixels
* `snackbarParent` : ID of parent node in which the dialogs are mounted, default is "app"

## Usage example

To install and configure the plugin:

```
import Vue from "vue";
import DialogPromise from "vuetify-dialog-promise";

Vue.use( DialogPromise, {
    locale : "fi",
    snackbarX : "left",
    snackbarY : "bottom"
} );
```

To use the plugin from inside your own component:

```
this.$confirm( "Do you weigh less than a duck?" ).then( y => this.burnTheWitch() ).catch( n => {} );
this.$prompt( "What is your quest?" ).then( quest => this.continueQuest( quest ) ).catch( n => {} );
this.$inform( "We are the knights that say Ni." );
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
