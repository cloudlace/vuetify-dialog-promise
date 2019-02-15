<template>
  <v-snackbar
      v-model="shown"
      :color="color"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
  >
    {{ text }}
    <v-btn
        flat
        :ripple="false"
        @click="close()"
    >
      {{ closeText }}
    </v-btn>
  </v-snackbar>
</template>

<script>
    export default {
        name : "Snackbar",
        props : {
            x : String,
            y : String,
            color : String,
            timeout : Number,
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
                setTimeout( () => this.$emit( "close" ), 500 );
            }
        }
    }
</script>

<style scoped>

</style>