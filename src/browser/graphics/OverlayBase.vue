<template>
  <div
    id="root"
    :style="{
      backgroundImage: `url(${backgroundUri})`
    }">
    <slot />
  </div>
</template>

<style>
html {
  overflow: hidden;
}
#root {
    width: 1920px;
    height: 1080px;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
}
</style>

<script lang="ts">
/* global nodecg */
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class OverlayBase extends Vue {
  backgroundUri = '';

  created(): void {
    nodecg.Replicant('assets:background').on('change', (newVal) => {
      if (newVal.length > 0) {
        this.backgroundUri = newVal[0].url;
      }
    })
  }
}
</script>