<template>
  <div
    :style="{
      width: '100%',
      height: '100%',
      backgroundImage: `url(${logoUri})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center'
    }"
  />
</template>

<script lang="ts">
/* global nodecg */
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class EventLogo extends Vue {

  logoUri = '';

  created(): void {
    nodecg.Replicant('assets:logo').on('change', (newVal) => {
      if (newVal.length > 0) {
        this.logoUri = newVal[0].url;
      }
    });
  }
}
</script>