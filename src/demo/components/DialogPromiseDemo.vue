<template>
  <v-container>
    <v-layout pa-3 mb-2>
      <v-flex>
        <v-flex ma-3>
          <v-card>
            <v-card-title>
              <h1>VuetifyDialogPromise</h1>
            </v-card-title>
            <v-card-text>
              <p>
                The VuetifyDialogPromise plugin provides a Promise API for Vuetify dialogs and snackbar notifications.
                Provides the following instance methods:
              </p>
              <ul>
              <li><code>$alert( message )</code>  Raise a modal alert</li>
              <li><code>$confirm( message )</code>  Raise a modal confirmation dialogue</li>
              <li><code>$prompt( message )</code>  Raise a modal prompt for an input</li>
              <li><code>$inform( message )</code>  Raise a notification in the "info" colour</li>
              <li><code>$warn( message )</code>  Raise a notification in the "warn" colour</li>
              <li><code>$error( message )</code>  Raise a notification in the "error" colour</li>
            </ul>
              <br/>
              <h2>Installation</h2>
              <p>Add the following to your package.json.dependencies:</p>
              <p>
                <code>"vuetify-dialog-promise": "git+https://www.avain.intra/bitbucket/scm/cloud/vuetify-dialog-promise.git",</code>
              </p>
              <p>
                On the command line:
              </p>
              <p>
                <code>npm install vuetify-promise</code>
              </p>
              <p>In your Vue app:</p>
              <p>
                <code>import DialogPromise from 'vuetify-dialog-promise';<br/> Vue.use( DialogPromise );</code>
              </p>
              <h2>Use</h2>
              <p>
                To use from your components, for example:
              </p>
              <p>
<code>
  /**
   * With a plain text message
   */
  this.$prompt( "What is your favourite colour?" ).then( colour =>
  {
      this.$inform( "The colour is " + colour + "." );
  } );
</code>
              </p>
              <p><v-btn @click="tryPlain()">Try it</v-btn></p>
              <p>
<code>
  /**
   * With custom properties
   */
  this.$prompt( {
      title : "Important question:",
      text : "What is your favourite colour?",
      maxWidth : 600,
      acceptText : "This",
      cancelText : "Won't say"
  } ).then( colour =>
  {
      this.$warn( {
          text : "The colour is " + colour + ".",
          closeText : "Yeah!",
          timeout : 0 } );
  } );
</code>
              </p>
              <p><v-btn @click="tryFull()">Try it</v-btn></p>
              <h2>
                Common dialog properties:
              </h2>
              <v-flex d-inline-flex ma-2>
                <v-text-field v-model="defaults.title" label="Dialog title (title)"></v-text-field>
              </v-flex>
              <v-flex d-inline-flex ma-2>
                <v-text-field v-model="defaults.cancelText" label="Cancel button label (cancelText)"></v-text-field>
              </v-flex>
              <v-flex d-inline-flex ma-2>
                <v-text-field v-model="defaults.acceptText" label="Accept button label (acceptText)"></v-text-field>
              </v-flex>
              <v-flex d-inline-flex ma-2>
                <v-text-field v-model="defaults.maxWidth" type="number" label="Max width (maxWidth)"></v-text-field>
              </v-flex>
              <h2>
                Common snackbar properties
              </h2>
              <v-flex d-inline-flex ma-2>
                <v-text-field v-model="defaults.closeText" label="Close button label (closeText)"></v-text-field>
              </v-flex>
              <v-flex d-inline-flex ma-2>
                <v-text-field v-model="defaults.timeout" type="number" label="Snackbar timeout (timeout)"></v-text-field>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-flex>

        <demo-card v-for="demo in demos"
                   :isPromise="demo.isPromise"
                   :type="demo.type"
                   :text="demo.text"
                   :description="demo.description"
                   :defaults="defaults"
                   :key="demo.type">
        </demo-card>


      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
    import DemoCard from './DemoCard';

    export default {
        name : "DialogPromiseDemo",
        components : {
            "demo-card" : DemoCard
        },
        data()
        {
            return {
                defaults : {
                  title : "Important!",
                  cancelText : "No thanks",
                  acceptText : "Yes please",
                  alert_text : "You are wise and powerful and somebody loves you.",
                  confirm_text : "Do you want to have an excellent day?",
                  prompt_text : "What kind of day do you want to have today?",
                  inform_text : "You are now informed.",
                  warn_text : "Something went wrong.",
                  error_text : "Something went badly wrong!",
                  timeout : 3000,
                  closeText : "Okay",
                  maxWidth : 400,
                },
                demos : [
                    {
                        type : "alert",
                        isPromise : true,
                        description : "Show an alert message, which resolves as true when the user clicks through it:",
                    },
                    {
                        type : "confirm",
                        isPromise : true,
                        description : "Show a confirmation message, which resolves as true or false depending on user choice:",
                    },
                    {
                        type : "prompt",
                        isPromise : true,
                        description : "Show a prompt, which resolves with the user's input or false if rejected:",
                    },
                    {
                        type : "inform",
                        isPromise : false,
                        description : "Shows a notification in the default color.",
                    },
                    {
                        type : "warn",
                        isPromise : false,
                        description : "Shows a notification in the warning color.",
                    },
                    {
                        type : "error",
                        isPromise : false,
                        description : "Shows a notification in the error color.",
                    }
                ]
            }
        },
        methods : {
            tryPlain()
            {
                /**
                 * With a plain text message
                 */
                this.$prompt( "What is your favourite colour?" ).then( colour =>
                {
                    this.$inform( "The colour is " + colour + "." );
                } );

            },
            tryFull()
            {
                /**
                 * With custom properties
                 */
                this.$prompt( {
                    title : "Important question:",
                    text : "What is your favourite colour?",
                    maxWidth : 600,
                    acceptText : "This",
                    cancelText : "Won't say"
                } ).then( colour =>
                {
                    this.$warn( {
                        text : "The colour is " + colour + ".",
                        closeText : "Yeah!",
                        timeout : 0 } );
                } );
            }
        }
    }
</script>

<style scoped>

</style>