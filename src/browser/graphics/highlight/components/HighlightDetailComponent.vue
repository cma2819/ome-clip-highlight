<template>
  <div>
    {{ title }}
  </div>
</template>

<style scoped>
div {
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-family: 'Kosugi Maru';
  color: #222222;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class HighlightTitleComponent extends Vue {
  @Prop(String)
  readonly title!: string;
}
</script>
