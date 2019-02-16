<template>
  <v-flex d-inline-flex ma-3>
    <v-card width="500" height="295">
      <v-card-title>
        <h2>${{ type }}( message )</h2>
      </v-card-title>
      <v-card-text>
        <v-responsive height="145">
          <p>{{ description }}</p>
          <p><code>${{ type }}( message )<span v-if="isPromise">.then( result => handler )</span></code></p>
          <v-text-field v-model="text" label="Message (text)"></v-text-field>
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
                        maxWidth : this.defaults.maxWidth
                    } ).then( result =>
                    {
                        this.$inform( {
                            text : "The result was:" + result,
                            timeout : this.defaults.timeout,
                            closeText : this.defaults.closeText,
                            x : this.defaults.x,
                            y : this.defaults.y,
                            color : this.defaults.color
                        } );
                    } );
                }
                else
                {
                    this[ '$' + this.type ]( {
                        text : this.text,
                        timeout : this.defaults.timeout,
                        closeText : this.defaults.closeText,
                        x : this.defaults.x,
                        y : this.defaults.y,
                        color : this.defaults.color
                    } );
                }
            }
        }
    }
</script>

<style scoped>

</style>