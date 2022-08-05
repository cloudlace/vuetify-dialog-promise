<template>
  <v-app>
    <v-app-bar app dark color="grey darken-2">
      <v-toolbar-title>
        <span>Vuetify</span>
        <span class="font-weight-light">DialogPromise</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn class="hidden-xs-only"
               text
               :input-value="shown === 'demo'"
               @click="shown = 'demo'"
               active-class="default-class grey darken-1">
          Playground
        </v-btn>
        <v-btn class="hidden-xs-only"
               text
               :input-value="shown === 'info'"
               @click="shown = 'info'"
               active-class="default-class grey darken-1">
          About
        </v-btn>
        <v-select dark background-color="grey darken-2" text solo :items="locales" v-on:input="setLocale()"
                  v-model="newLocale" class="ma-2" style="width:75px"></v-select>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <info-card v-if="shown === 'info'"></info-card>
      <v-container v-if="shown === 'demo'">
        <v-layout align-center justify-center>
          <v-flex>
            <v-flex ma-3 d-inline-flex>
              <v-card width="500" height="295">
                <v-card-title>
                  <h2>Dialog properties</h2>
                </v-card-title>
                <v-card-text>
                  <v-flex>
                    <v-flex d-inline-flex ma-2>
                      <v-text-field v-model="defaults.title" label="Dialog title (title)"></v-text-field>
                    </v-flex>
                    <v-flex d-inline-flex ma-2>
                      <v-text-field v-model="defaults.cancelText"
                                    label="Cancel button label (cancelText)"></v-text-field>
                    </v-flex>
                    <v-flex d-inline-flex ma-2>
                      <v-text-field v-model="defaults.acceptText"
                                    label="Accept button label (acceptText)"></v-text-field>
                    </v-flex>
                    <v-flex d-inline-flex ma-2>
                      <v-text-field v-model="defaults.dialogMaxWidth" type="number"
                                    label="Max width (dialogMaxWidth)"></v-text-field>
                    </v-flex>
                  </v-flex>
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex ma-3 d-inline-flex>
              <v-card width="500" height="295">
                <v-card-title>
                  <h2>
                    Snackbar properties
                  </h2>
                </v-card-title>
                <v-card-text>
                  <v-flex>
                    <v-flex d-inline-flex ma-2 style="width: 120px">
                      <v-text-field v-model="defaults.closeText"
                                    label="Close button label (closeText)"></v-text-field>
                    </v-flex>
                    <v-flex d-inline-flex ma-2 style="width: 120px">
                      <v-text-field v-model="defaults.snackbarTimeout" type="number"
                                    label="Timeout (snackbarTimeout)"></v-text-field>
                    </v-flex>
                    <v-flex d-inline-flex ma-2 style="width: 120px">
                      <v-text-field v-model="defaults.color"
                                    label="Color, overrides setting from inform/warn/error (color)"></v-text-field>
                    </v-flex>
                    <v-flex d-inline-flex ma-2 style="width: 120px">
                      <v-select v-model="defaults.snackbarX" label="Horizontal position (snackbarX)"
                                :items="[ 'left', 'right', 'center' ]"></v-select>
                    </v-flex>
                    <v-flex d-inline-flex ma-2 style="width: 120px">
                      <v-select v-model="defaults.snackbarY" label="Vertical position (snackbarY)"
                                :items="[ 'top', 'bottom' ]"></v-select>
                    </v-flex>
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
    </v-main>
  </v-app>

</template>

<script>
import DemoCard from './components/DemoCard';
import InfoCard from './components/InfoCard';
import i18n from '../i18n';

const locales = Object.keys( i18n );

function _getLocale()
{
  for( let i = 0; i < locales.length; i++ )
  {
    if( window.location.pathname.indexOf( '/' + locales[ i ] + '/' ) !== -1 )
    {
      return locales[ i ];
    }
  }
  return 'en';
}

export default {
  name : "DialogPromiseDemo",
  components : {
    "demo-card" : DemoCard,
    "info-card" : InfoCard,
  },
  data()
  {
    return {
      newLocale : _getLocale(),
      locale : _getLocale(),
      locales : locales,
      shown : "demo",
      defaults : {
        title : "Important!",
        defaultValue : "A great day",
        cancelText : "No thanks",
        acceptText : "Yes please",
        alert_text : "You are wise and powerful and somebody loves you.\nDo not forget this.",
        confirm_text : "Do you want to have an excellent day?",
        prompt_text : "What kind of day do you want to have today?",
        inform_text : "You are now informed.",
        warn_text : "Something went wrong.\nThis is the explanation on a second line.",
        error_text : "Something went badly wrong!",
        snackbarX : "left",
        snackbarY : "bottom",
        color : "pink",
        snackbarTimeout : 1000,
        closeText : "Okay",
        dialogMaxWidth : 400,
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
          description : "Show a confirmation message, which resolves or rejects depending on user choice:",
        },
        {
          type : "prompt",
          isPromise : true,
          description : "Show a prompt, which resolves with the user's input or rejects if rejected:",
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
  computed : {},
  methods : {
    setLocale()
    {
      let path = window.location.pathname;
      let loc = '/' + _getLocale() + '/';
      if( path.indexOf( loc ) !== -1 )
      {
        path = path.split( loc ).join( '/' + this.newLocale + '/' );
      }
      else
      {
        path = '/' + this.newLocale + path;
      }
      window.location.assign( path );
    }
  }
}
</script>

<style scoped>

</style>