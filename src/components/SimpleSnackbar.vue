<template>
  <v-chip
      label
      close
      close-icon="mdi-close"
      :style="`height:auto;position:fixed;${snackbarY === 'bottom' ? 'bottom' : 'top' }:${y_offset}px;${snackbarX === 'left' ? 'left' : 'right' }:${x_offset}px;z-index:99999`"
      :color="color"
      :bottom="snackbarY === 'bottom'"
      :left="snackbarX === 'left'"
      :right="snackbarX === 'right'"
      :timeout="snackbarTimeout"
      :top="snackbarY === 'top'"
      @click="close()"
      @click:close="close()"
      class="pa-3"
  >
    <span class="vdp-message">{{ text }}</span>
  </v-chip>
</template>

<script>
    export default {
        name : "Snackbar",
        props : {
            snackbarX : String,
            snackbarY : String,
            color : String,
            snackbars : Object,
            snackbarTimeout : Number,
            text : String
        },
        computed : {
            y_offset()
            {
                return 10 + this.snackbars[ this.snackbarY + '_' + this.snackbarX ];
            },
            x_offset()
            {
                return 10;
            }
        },
        methods : {
            close()
            {
                this.$emit( "close" );
            }
        },
        mounted()
        {
            if( this.snackbarTimeout )
            {
                setTimeout( () => this.$emit( "close" ), this.snackbarTimeout );
            }
        }
    }
</script>

<style scoped>
  .vdp-message {
    white-space: pre-wrap;
  }
</style>