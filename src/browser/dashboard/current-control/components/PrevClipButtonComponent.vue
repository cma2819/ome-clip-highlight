<template>  
  <v-btn
    block
    :disabled="clip === null"
    @click="transition"
  >
    <v-icon left>
      fas fa-caret-up
    </v-icon> {{ clip !== null ? clip.title : '' }}
  </v-btn>
</template>

<script lang="ts">
/* global nodecg */
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { TwitchClip } from '../../../../extension/types/twitchClip';

@Component
export default class PrevClipButtonComponent extends Vue {
  @Prop(Object)
  readonly clip!: TwitchClip|null;
  
  @Emit()
  transition(): void {
    if (this.clip === null) {
      return;
    }
    nodecg.sendMessage('transitionTo', this.clip.id);
  }
}
</script>