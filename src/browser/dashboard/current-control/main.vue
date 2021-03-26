<template>
  <v-app>
    <prev-clip-button :clip="prevClip"></prev-clip-button>
    <div class="my-2">
      <current-clip
        v-if="currentClip !== null"
        :clip="currentClip"
        :state="getState(currentClip.id)"
      ></current-clip>
      <v-alert
        v-else
        color="dark"
        dark
      >
        クリップ情報なし
      </v-alert>
    </div>
    <next-clip-button :clip="nextClip"></next-clip-button>
    <div class="my-2">
      <deactivate-button v-if="currentClip"></deactivate-button>
    </div>
  </v-app>
</template>

<script lang="ts">
/* global nodecg */
import { Vue, Component } from 'vue-property-decorator';
import PrevClipButton from './components/PrevClipButtonComponent.vue';
import NextClipButton from './components/NextClipButtonComponent.vue';
import CurrentClip from './components/CurrentClipComponent.vue';
import DeactivateButton from './components/CurrentDeactivateComponent.vue';

import { TwitchClip } from '../../../extension/types/twitchClip';
import { TwitchClipArray } from '../../../nodecg/generated/twitchClipArray';
import { TwitchClipStateArray } from '../../../nodecg/generated/twitchClipStateArray';
import clone from 'clone';
import { ClipState } from '../../../extension/types/clipState';

@Component({
  components: {
    PrevClipButton,
    NextClipButton,
    CurrentClip,
    DeactivateButton,
  }
})
export default class App extends Vue {
  currentClip: TwitchClip|null = null;
  clips: TwitchClipArray = [];
  clipStates: TwitchClipStateArray = [];

  created(): void {
    nodecg.Replicant('twitchClipArray').on('change', (newVal) => {
      this.clips = clone(newVal);
    });

    nodecg.Replicant('currentTwitchClip').on('change', (currentId) => {
      const currentClip = this.clips.find((clip) => {
        return clip.id === currentId;
      });
      if (!currentClip) {
        this.currentClip = null;
        return;
      }
      this.currentClip = currentClip;
    });

    nodecg.Replicant('twitchClipStateArray').on('change', (newVal) => {
      this.clipStates = clone(newVal);
    });
  }

  get prevClip(): TwitchClip|null {
    if (this.currentClip === null) {
      return null;
    }
      const currentRank = this.getState(this.currentClip.id).rank;

      if (currentRank === null) {
        return null;
      }
      return this.findClipRankedAt(currentRank - 1);
  }

  get nextClip(): TwitchClip|null {
    if (this.currentClip === null) {
      return null;
    }
      const currentRank = this.getState(this.currentClip.id).rank;

      if (currentRank === null) {
        return null;
      }
      return this.findClipRankedAt(currentRank + 1);
  }

  getState(id: string): ClipState {
    return this.clipStates.find((state) => {
      return state.id === id;
    }) || {
      id: '',
      rank: null,
      disabled: false
    };
  }

  findClipRankedAt(rank: number): TwitchClip|null {
    const id = this.clipStates.find((state) => {
      return state.rank === rank;
    })?.id;

    if (!id) {
      return null;
    }

    return this.clips.find((clip) => {
      return clip.id === id;
    }) || null;
  }
}
</script>
