<template>
  <v-card>
    <v-card-text>
      <v-sheet
        class="text-center font-weight-bold mb-2 pa-2"
        color="info"
      >
        <h2>{{ state.rank }}位</h2>
      </v-sheet>
    </v-card-text>
    <v-row align="center">
      <v-col cols="4">
        <v-card-text>
          <v-img src="https://clips-media-assets2.twitch.tv/AT-cm%7C773261758-preview-480x272.jpg"></v-img>
        </v-card-text>
      </v-col>
      <v-col>
        <v-card-title>{{ clip.title }}</v-card-title>
      </v-col>
    </v-row>
    <v-card-text class="text--primary">
      <labeled-text label="ゲーム">
        {{ getGameName(clip.gameId) }}
      </labeled-text>
      <labeled-text label="視聴回数">
        {{ clip.viewCount }}
      </labeled-text>
      <labeled-text label="リンク">
        <a
          :href="clip.url"
          target="_blank"
        >{{ clip.id }}</a>
      </labeled-text>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
/* global nodecg */
import { Vue, Component, Prop } from 'vue-property-decorator';
import LabeledText from '../../_lib/components/LabeledTextComponent.vue';
import { TwitchClip } from '../../../../extension/types/twitchClip';
import clone from 'clone';
import { TwitchGameArray } from '../../../../nodecg/generated/twitchGameArray';
import { ClipState } from '../../../../extension/types/clipState';

@Component({
  components: {
    LabeledText
  }
})
export default class CurrentClipComponent extends Vue {
  @Prop(Object)
  readonly clip!: TwitchClip;

  @Prop(Object)
  readonly state!: ClipState;
  
  games: TwitchGameArray = [];

  created(): void {
    nodecg.Replicant('twitchGameArray').on('change', (newVal) => {
      this.games = clone(newVal);
    });
  }
  
  getGameName(id: string): string {
    return this.games.find((game) => {
      return game.id === id;
    })?.name || '';
  }
}
</script>