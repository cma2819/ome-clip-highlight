<template>  
  <v-btn
    color="warning"
    block
    @click="deactivate"
  >
    クリップ非表示
  </v-btn>
</template>

<script lang="ts">
/* global nodecg */
import { Vue, Component, Emit } from 'vue-property-decorator';

@Component
export default class CurentDeactivateComponent extends Vue {

  @Emit()
  deactivate(): void {
    nodecg.sendMessage('deactivateCurrent');
  }
}
</script>