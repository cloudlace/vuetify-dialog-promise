# vuetify-dialog-promise

A Vue plugin with a Promise API for [Vuetify](https://www.npmjs.com/package/vuetify) dialogs and snackbar notifications.

## Major and minor version history

* Version ^2.4.0: switches to v-chip for snackbars because they're more suitable, and makes it possible to display 
multiple snackbars simultaneously.
* Version ^2.3.0: switches to v-btn for snackbars because a Vuetify update broke programmatic creation of non-absolute
snackbars. Also removes the close button; now snackbars can be closed by clicking on them.
* Version ^2.2.0: no longer uses `snackbarParent` property (snackbars mounted in calling component instance)
* Version ^2.1.0: accepts `theme` property / config param (see
  [Vuetify theme](https://vuetifyjs.com/en/customization/theme))
* Version ^2.0.0: requires Vuetify ^2.0.0
* Version ^1.0.0: requires Vuetify ^1.5.0

## Description

Intended to be as straightforward to use as native browser dialogues, with the look and feel of Vuetify widgets and
sufficient flexibility to cover most use cases involving straightforward alerts, notifications, confirmations, and
prompts. 
 
Adds the following methods to the Vue instance:

* `$alert( message )` 
    - An alert dialog. Returns Promise, resolved when the user accepts it.
    - `message` can be a string, in which case it is displayed in a plain dialog with an "Accept" button, or an object 
    with any properties including `{ text, title?, dialogMaxWidth?, acceptText?, cancelText? }` where `title` becomes 
    the dialog title, `text` becomes the message to display, and the other properties control the appearance and 
    behaviour of the dialog (see "Configurable properties" below). Also applies to `$confirm` and `$prompt` (see below).
* `$confirm( message )` 
    - A confirmation dialog. Returns Promise, resolved if the user accepts it, rejected if the user cancels it.
* `$prompt( message )` 
    - A prompt dialog. Returns Promise, resolved with user input if user accepts it, rejected if the user cancels it.
* `$inform( message )` 
    - Raises a snackbar notification in the default colour.
    - `message` can be a string or an object with properties `{ text, color?, closeText?, snackbarX?, snackbarY?,
    snackbarTimeout? }` where `text` becomes the message to display, and the other properties control the appearance
    and behaviour of the snackbar (see "Initialisation properties" below). Applies to `$warn` and `$error` also (see 
    below).
* `$warn( message )` 
    - Raises a snackbar notification in the warning colour.
* `$error( message )` 
    - Raises a snackbar notification in the error colour.

## Features

* Button labels localised to a large variety of languages (pull requests welcome)
* Allows you to inject your own button labels, overriding the defaults
* Dialogue and snackbar messages are plain text only: markup is escaped to keep it XSS-safe. However, paragraph breaks
can be added with newline '\\n' characters in the message.
* Various features of the dialogues and snackbars are configurable with initialisation properties (e.g. dialog max 
width, snackbar location, colour, duration)

## Initialisation properties

Various properties can be configured by handing them to Vue.use in the `options` argument when installing the plugin. 
(see **Usage examples** below). 

All of these are optional and have reasonable defaults:

* `locale {string}` 
    - ISO locale identifier for the button labels. Over 30 locales are supported. To override, see the properties below.
* `acceptText {string}` 
    - Label for accept button in dialog
* `cancelText {string}` 
    - Label for cancel button in dialog
* `closeText {string}` 
    - Label for close button in snackbar message
* `snackbarX {"left"|"center"|"right"}` 
    - Position of snackbar message
* `snackbarY {"top"|"bottom"}`
    - Position of snackbar message
* `snackbarTimeout {integer}` 
    - Snackbar duration in milliseconds
* `dialogMaxWidth {integer}` 
    - Max width of dialog in pixels
* `theme {Object}`
    - [Vuetify theme](https://vuetifyjs.com/en/customization/theme) applied to dialogs

## Usage examples

### Directly in the browser

To experiment with the plugin directly in the browser, refer to [this online example](https://codepen.io/brikoleur/pen/MWgEbGP).

### In a Vue CLI project

To install and configure (all init properties are optional, see "Initialisation properties" above for complete list):

```
import Vue from "vue";
import VuetifyDialogPromise from "vuetify-dialog-promise";

Vue.use( VuetifyDialogPromise, {
    locale : "fi",
    snackbarX : "left",
    snackbarY : "bottom"
} );
```

### Inside your component after the plugin has been loaded

To use the plugin from inside your own component:

```
// Message with defaults
this.$alert( "Your mother is a hamster and your father smells of elderberries." );

// Confirmation with property overrides
this.$confirm( { 
    title : "Are you a witch?", 
    text : "Do you weigh less than a duck?", 
    acceptText : "I float", 
    cancelText : "I sink"
 } ).then( y => this.burnTheWitch() ).catch( n => this.notAWitch() );
 
// Prompt for value
this.$prompt( "What is your quest?" ).then( quest => 
    this.beginQuest( quest ).catch( n => {} );
    
// Snackbar notification with defaults    
this.$inform( "We are the knights that say Ni." );

// Snackbar notification with overrides
this.$inform( { text : "My favourite colour is blue.", color : "blue" } );
```

## Developer notes

A full demo is provided with the project. To use it, fork and clone the repository and use the following utilities:

### Project setup

```
npm install
```

### Compiles and hot-reloads demo app for development
```
npm run serve
```

### Compiles and minifies library for production
```
npm run build-bundle
```

### Compiles and minifies demo app for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Credits

* Localisations for the standard button labels are originally extracted from the 
[Dojo toolkit](https://dojotoolkit.org/) i18n.