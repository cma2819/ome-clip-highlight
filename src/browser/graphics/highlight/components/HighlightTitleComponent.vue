<template>
  <div id="root">
    <div>
      {{ title }}
    </div>
    <div
      :style="{
        fontSize: '60%',
        marginTop: '1rem'
      }"
    >
      作：{{ creator }}
    </div>
  </div>
</template>

<style scoped>
div#root {
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-family: 'Kosugi Maru';
  color: white;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class HighlightTitleComponent extends Vue {
  @Prop(String)
  readonly title!: string;

  @Prop(String)
  readonly creator!: string;
}
</script>