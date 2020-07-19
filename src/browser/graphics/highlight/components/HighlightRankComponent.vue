<template>
  <div
    :style="{
      color: $vuetify.theme.themes.light.primary,
      backgroundColor: $vuetify.theme.themes.light.background
    }"
  >
    <transition
      name="rank"
      mode="out-in"
    >
      <div :key="clipRank">
        {{ clipRank }}
      </div>
    </transition>
  </div>
</template>

<style scoped>
div {
  width: 100%;
  height: 100%;
  font: 128px "Ranchers";
  text-align: center;
  overflow: hidden;
}

.rank-enter-active, .rank-leave-active {
  transition: transform .5s;
}

.rank-enter-active {
  transition-delay: .5s;
}

.rank-leave-active {
  transition-delay: .5s;
}

.rank-enter {
  transform: translateY(-198px);
}
.rank-leave-to {
  transform: translateY(198px);
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class HighlightRankComponent extends Vue {
  @Prop(Number)
  readonly clipRank!: number;
}
</script>