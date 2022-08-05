<template>
  <v-flex d-inline-flex ma-3>
    <v-card width="500">
      <v-card-title>
        <h2>${{ type }}( message )</h2>
      </v-card-title>
      <v-card-text>
        <v-responsive>
          <p>{{ description }}</p>
          <p><code>${{ type }}( message )<span v-if="isPromise">.then( result => handler )</span></code></p>
          <v-textarea outlined auto-grow v-model="text" label="Message (text)"></v-textarea>
        </v-responsive>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="raiseWithOverrides()">With overrides</v-btn>
        <v-btn @click="raiseWithDefaults()">Plain text</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>

</template>

<script>
export default {
  name : "DemoCard",
  props : {
    description : String,
    isPromise : Boolean,
    type : String,
    defaults : Object
  },
  data()
  {
    return {
      text : this.defaults[ this.type + "_text" ]
    }
  },
  methods : {
    raiseWithDefaults()
    {
      if( [ "alert", "confirm", "prompt" ].indexOf( this.type ) !== -1 )
      {
        this[ '$' + this.type ]( this.text ).then( result =>
        {
          this.$inform( "The result was: " + result );
        } ).catch( () =>
        {
          this.$error( "The user rejected the dialog." );
        } );
      }
      else
      {
        this[ '$' + this.type ]( this.text )
      }
    },
    raiseWithOverrides()
    {
      if( [ "alert", "confirm", "prompt" ].indexOf( this.type ) !== -1 )
      {
        this[ '$' + this.type ]( {
          title : this.defaults.title,
          text : this.text,
          cancelText : this.defaults.cancelText,
          acceptText : this.defaults.acceptText,
          defaultValue : this.defaults.defaultValue,
          dialogMaxWidth : this.defaults.dialogMaxWidth
        } ).then( result =>
        {
          this.$inform( {
            text : "The result was:" + result,
            snackbarTimeout : this.defaults.snackbarTimeout,
            closeText : this.defaults.closeText,
            snackbarX : this.defaults.snackbarX,
            snackbarY : this.defaults.snackbarY,
            color : this.defaults.color
          } );
        } ).catch( () =>
        {
          this.$error( "The user rejected the dialog." );
        } );
      }
      else
      {
        this[ '$' + this.type ]( {
          text : this.text,
          snackbarTimeout : this.defaults.snackbarTimeout,
          closeText : this.defaults.closeText,
          snackbarX : this.defaults.snackbarX,
          snackbarY : this.defaults.snackbarY,
          color : this.defaults.color
        } );
      }
    }
  }
}
</script>

<style scoped>

</style>