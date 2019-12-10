<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex ma-3>
        <v-card max-width="800">
          <v-card-text>
            <p>
              The VuetifyDialogPromise plugin provides a Promise API for Vuetify dialogs and snackbar notifications.
              Provides the following instance methods:
            </p>
            <ul>
              <li><code>$alert( message ).then( result => handler )</code> Raise a modal alert</li>
              <li><code>$confirm( message ).then( result => handler ).catch( reject => {} );</code> Raise a modal confirmation dialogue</li>
              <li><code>$prompt( message ).then( result => handler ).catch( reject => {} );</code> Raise a modal prompt for an input</li>
              <li><code>$inform( message )</code> Raise a notification in the "info" colour</li>
              <li><code>$warn( message )</code> Raise a notification in the "warn" colour</li>
              <li><code>$error( message )</code> Raise a notification in the "error" colour</li>
            </ul>
            <br/>
            <h2>Installation</h2>
            <p>
              On the command line:
            </p>
            <p>
              <code class="d-block">
    npm install vuetify-dialog-promise
              </code>
            </p>
            <p>In your Vue app:</p>
            <p>
              <code class="d-block">
    import DialogPromise from 'vuetify-dialog-promise';
    Vue.use( DialogPromise, { 
        locale : "en",
        acceptText : "My Default OK",
        cancelText : "My Default Cancel",
        closeText : "My Default Close",
        snackbarX : "left",
        snackbarY : "bottom",
        snackbarTimeout : 1000,
        dialogMaxWidth : 450
    } );
              </code>
            </p>
            <p>
              All options have defaults.
            </p>
            <h2>Use</h2>
            <p>
              To use from your components, for example:
            </p>
            <p>
              <code class="d-block">
    /**
     * With a plain text message
     */
    this.$prompt( "What is your favourite colour?" ).then( colour =>
    {
        this.$inform( "The colour is " + colour + "." );
    } );
              </code>
            </p>
            <p>
              <v-btn @click="tryPlain()">Try it</v-btn>
            </p>
            <p>
              <code class="d-block">
    /**
     * With custom properties
     */
    this.$prompt( {
        title : "Important question:",
        text : "What is your favourite colour?",
        dialogMaxWidth : 600,
        acceptText : "This",
        cancelText : "Won't say"
    } ).then( color =>
    {
        this.$warn( {
            text : "The color is " + color + ".",
            color : color,
            closeText : "Yeah!",
            timeout : 0
        } );
    } );
              </code>
            </p>
            <p>
              <v-btn @click="tryFull()">Try it</v-btn>
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
    export default {
        name : "InfoCard",
        methods : {
            tryPlain()
            {
                this.$prompt( "What is your favourite colour?" ).then( colour =>
                {
                    this.$inform( "The colour is " + colour + "." );
                } );
            },
            tryFull()
            {
                this.$prompt( {
                    title : "Important question:",
                    text : "What is your favourite colour?",
                    dialogMaxWidth : 600,
                    acceptText : "This",
                    cancelText : "Won't say"
                } ).then( color =>
                {
                    this.$warn( {
                        color : color,
                        text : "The color is " + color + ".",
                        closeText : "Yeah!",
                        snackbarTimeout : 0
                    } );
                } );
            }
        }
    }
</script>

<style scoped>

</style>