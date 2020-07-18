<template>
  <v-app>
    <v-row>
      <v-col cols="4">
        <import-area></import-area>
      </v-col>
      <v-col
        cols="8"
        :style="{
          maxHeight: '680px',
          overflowY: 'auto'
        }"
      >
        <clip-area></clip-area>
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ImportArea from './components/ImportAreaComponent.vue';
import ClipArea from './components/ClipAreaComponent.vue';

@Component({
  components: {
    ImportArea,
    ClipArea
  }
})
export default class App extends Vue {
}
</script>