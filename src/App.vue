<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">DIALOG PROMISE</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <dialog-promise-demo></dialog-promise-demo>
    </v-content>
  </v-app>
</template>

<script>
import DialogPromiseDemo from './demo/components/DialogPromiseDemo'

export default {
  name: 'App',
  components: {
      "dialog-promise-demo" : DialogPromiseDemo
  },
  data () {
    return {
      //
    }
  }
}
</script>
