<template>
  <div 
    :style="{
      backgroundImage: `url(${thumbnailUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
  />
</template>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class HighlightThumbnailComponent extends Vue {
  @Prop(String)
  readonly thumbnailUrl!: string;
}
</script>