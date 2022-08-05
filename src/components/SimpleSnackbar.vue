<template>
  <v-card
      :style="`height:auto;position:fixed;${x_position};${y_position};z-index:99999;visibility:${visibility}`"
      :color="color"
      :timeout="snackbarTimeout"
      :top="snackbarY === 'top'"
      @click="close()"
      elevation="5"
      class="pa-2">
    <table style="width:100%">
      <tbody>
      <tr>
        <td>
          <div :class="`vdp-message ${text_color}`">{{ text }}</div>
        </td>
        <td>
          <!-- Icons don't mount correctly in programmatically created cards so we do the fake icon like this. -->
          <div :class="`v-icon notranslate mdi mdi-close vdp-fake-close-icon ${text_color}`"></div>
        </td>
      </tr>
      </tbody>
    </table>
  </v-card>
</template>

<script>
import Color from "color";
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
  data()
  {
    return {
      text_color : "white--text"
    };
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
          return `left:50%;margin-left:${ this.position.width / -2 }px`
        case "left" :
          return "left:10px";
        case "right" :
          return "right:10px";
        default :
          throw( new Error( `Expected snackbarX to be one of <left, center, right>, got ${ this.snackbarX }` ) );
      }
    },
    y_position()
    {
      return `${ this.snackbarY }:${ 10 + this.position[ this.snackbarY + '_' + this.snackbarX ] - this.position.height }px`;
    }
  },
  methods : {
    setTextColor()
    {
      const col = new Color( window.getComputedStyle( this.$el , null ).getPropertyValue( "background-color" ) );
      if( col.isLight() )
      {
        this.text_color = "black--text";
      }
    },
    close()
    {
      this.$emit( "close" );
    }
  },
  mounted()
  {
    this.$nextTick( () =>
    {
      this.setTextColor();
    } );
    if( this.snackbarTimeout )
    {
      setTimeout( () => this.$emit( "close" ), this.snackbarTimeout );
    }
  }
}
</script>

<style>
.vdp-message {
  white-space: pre-wrap;
  font-size: 14px;
}

.vdp-fake-close-icon {
  font-size: 18px !important;
  padding-left: 8px;
  margin-top: -4px;
}
</style>