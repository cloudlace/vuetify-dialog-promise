<template>
  <v-dialog 
    v-model="shown"     
    :max-width="message.dialogMaxWidth || 500"        
    persistent>
    <v-card>
      <v-responsive>

        <v-card-title v-if="message.title">
          <h3>{{ message.title }}</h3>
        </v-card-title>

        <v-card-text>
          <div class="vdp-message text--black">
            {{ message.text }}
          </div>

          <v-text-field 
          v-if="type === 'prompt'" 
          ref="prompt"
          :type="message.type || 'text'" 
          v-model="user_input" 
          @keydown="checkSubmit" 
          @focus="$event.target.select()"/>
        </v-card-text>

        <v-card-actions>
          <v-btn 
          v-if="type !== 'alert'"
          variant="elevated"
          @click="cancel" >
          {{ message.cancelText }}
          </v-btn>

          <v-spacer/>

          <v-btn 
            color="primary" 
            variant="elevated"
            @click="accept">
            {{ message.acceptText }} 
          </v-btn>
        </v-card-actions>

      </v-responsive>
    </v-card>
  </v-dialog>
</template>

<script>
    export default {
        name : "SimpleDialog",
        props : {
            type : String,
            message : Object,
            resolve : Function
        },
        data()
        {
            return {
                shown : false,
                user_input : this.message.defaultValue || ''
            }
        },
        methods : {
            cancel()
            {
                this.shown = false;
                this.resolve( false );
            },
            accept()
            {
                this.shown = false;
                this.resolve( this.type === "prompt" ? this.user_input : true );
            },
            checkSubmit( evt )
            {
                if( evt.key === "Enter" )
                {
                    this.accept();
                }
            }
        },
        beforeMount()
        {
            this.theme = this.message.theme || {};
            this.breakpoint = {};
        },
        mounted()
        {
            this.shown = true;
            if( this.type === "prompt" )
            {
                setTimeout( function()
                {
                    this.$refs.prompt.focus();
                }.bind( this ), 300 );
            }
        }
    }
</script>

<style scoped>
  .vdp-message {
    white-space: pre-wrap;
  }
</style>