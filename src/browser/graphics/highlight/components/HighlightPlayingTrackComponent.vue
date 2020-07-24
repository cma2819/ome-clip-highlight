<template>
  <div
    :style="{
      margin: '0.5rem'
    }"
  >
    <div class="title">
      <span class="icon"><i class="fas fa-music" /></span>
      {{ title }}
    </div>
    <div class="artist">
      <span class="icon"><i class="fas fa-user" /></span>
      {{ artist }}
    </div>
  </div>
</template>

<style scoped>
.icon {
  margin-right: 0.5rem;
}

div.title, div.artist {
  margin: 0.5rem 0;
  white-space: nowrap;
  overflow: hidden;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class HighlightPlayingTrackComponent extends Vue {
  @Prop(String)
  readonly title!: string;

  @Prop(String)
  readonly artist!: string;
}
</script>