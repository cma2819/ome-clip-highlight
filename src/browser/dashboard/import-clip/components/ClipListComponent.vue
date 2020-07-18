<template>
  <v-expansion-panels>
    <clip-list-element
      v-for="clip in clips"
      :key="clip.id"
      :data="clip"
      :clip-state="getClipState(clip.id)"
    ></clip-list-element>
  </v-expansion-panels>
</template>

<script lang="ts">
/* global nodecg */
import { Vue, Component, Prop } from 'vue-property-decorator';
import ClipListElement from './ClipListElementComponent.vue';
import clone from 'clone';

import { TwitchClipArray } from '../../../../nodecg/generated/twitchClipArray';
import { TwitchClipStateArray } from '../../../../nodecg/generated/twitchClipStateArray';
import { ClipState } from '../../../../extension/types/clipState';

@Component({
  components: {
    ClipListElement
  }
})
export default class ClipListComponent extends Vue {
  @Prop(Array)
  clips!: TwitchClipArray

  clipStates: TwitchClipStateArray = [];

  created(): void {
    nodecg.Replicant('twitchClipStateArray').on('change', (newVal) => {
      this.clipStates = clone(newVal);
    });
  }

  getClipState(id: string): ClipState {
    const state = this.clipStates.find((state) => {
      return state.id === id;
    });
    if (!state) {
      return {
        id: '',
        disabled: false,
        rank: 0
      };
    }
    return state;
  }
}
</script>