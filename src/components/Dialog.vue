<template>
  <v-app>
    <v-dialog v-model="shown" :max-width="message.maxWidth || 500" persistent>
      <v-card>
        <v-responsive>
          <v-card-title v-if="message.title">
            <h3 >{{ message.title }}</h3>
          </v-card-title>
          <v-card-text>
            {{ message.text }}
            <v-text-field v-if="type === 'prompt'" :type="message.type || 'text'" v-model="user_input"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn v-on:click="cancel" v-if="type !== 'alert'">{{ message.cancelText }}</v-btn>
            <v-spacer></v-spacer>
            <v-btn v-on:click="accept" color="info">{{ message.acceptText }}</v-btn>
          </v-card-actions>
        </v-responsive>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
    export default {
        name : "ConfirmDialog",
        props : {
            type : String,
            message : Object,
            shown : Boolean,
            complete : Function
        },
        data()
        {
            return {
                user_input : ""
            }
        },
        methods : {
            show()
            {
                this.shown = true;
            },
            hide()
            {
                this.shown = false;
            },
            cancel()
            {
                this.complete( false );
            },
            accept()
            {
                this.complete( this.type === "prompt" ? this.user_input : true );
            }
        }
    }
</script>

<style scoped>

</style>