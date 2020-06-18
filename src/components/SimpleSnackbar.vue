<template>
  <v-chip
      label
      close
      close-icon="mdi-close"
      :style="`height:auto;position:fixed;${x_position};${y_position};z-index:99999;visibility:${visibility}`"
      :color="color"
      :timeout="snackbarTimeout"
      :top="snackbarY === 'top'"
      @click="close()"
      @click:close="close()"
      class="pa-3">
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
            position : Object,
            snackbarTimeout : Number,
            text : String
        },
        computed : {
            visibility()
            {
                if( this.position.width && this.position.height )
                {
                    return "visible";
                }
                else
                {
                    return "hidden";
                }
            },
            x_position()
            {
                switch( this.snackbarX )
                {
                    case "center" :
                        return `left:50%;margin-left:${this.position.width/-2}px`
                    case "left" :
                        return "left:10px";
                    case "right" :
                        return "right:10px";
                    default :
                        throw( new Error( `Expected snackbarX to be one of <left, center, right>, got ${this.snackbarX}` ) );
                }
            },
            y_position()
            {
                return `${this.snackbarY}:${10 + this.position[ this.snackbarY + '_' + this.snackbarX ] - this.position.height}px`;
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