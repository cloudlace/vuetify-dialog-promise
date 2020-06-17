<template>
  <v-btn
      :style="`height:auto;position:fixed;${snackbarY === 'bottom' ? 'bottom' : 'top' }:10px;${snackbarX === 'left' ? 'left' : 'right' }:10px;z-index:99999`"
      :color="color"
      :bottom="snackbarY === 'bottom'"
      :left="snackbarX === 'left'"
      :right="snackbarX === 'right'"
      :timeout="snackbarTimeout"
      :top="snackbarY === 'top'"
      class="pa-3"
      @click="close()"
  >
    <span class="vdp-message">{{ text }}</span>
  </v-btn>
</template>

<script>
    export default {
        name : "Snackbar",
        props : {
            snackbarX : String,
            snackbarY : String,
            color : String,
            snackbarTimeout : Number,
            closeText : String,
            text : String
        },
        data()
        {
            return {
                shown : true
            }
        },
        methods :
        {
            show()
            {
                this.shown = true;
                if( this.timeout )
                {
                    setTimeout( () => this.$emit( "close" ), this.timeout + 300 );
                }
            },
            close()
            {
                this.shown = false;
                setTimeout( () => this.$emit( "close" ), 100 );
            }
        }
    }
</script>

<style scoped>
  .vdp-message {
    white-space: pre-wrap;
    text-transform: none;
    font-weight: normal;
    letter-spacing: 0;
  }
</style>