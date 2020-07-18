<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="py-2">
      <v-row
        :class="{'grey--text': clipState.disabled}"
        align="center"
        no-gutters
      >
        <v-col
          class="mx-2"
          cols="2"
          md="1"
        >
          <v-img
            :src="data.thumbnailUrl"
            alt="icon"
          ></v-img>
        </v-col>
        <v-col>          
          <v-chip
            color="secondary"
            label
          >
            {{ clipState.rank || '-' }}
          </v-chip>
          <strong>{{ data.title }}</strong>
        </v-col>
        <v-col
          cols="1"
        >
          <transition name="disabled">
            <v-icon v-if="clipState.disabled">
              fas fa-times
            </v-icon>
          </transition>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <labeled-text label="ゲーム">
        {{ getGameName(data.gameId) }}
      </labeled-text>
      <labeled-text label="視聴回数">
        {{ data.viewCount }}
      </labeled-text>
      <labeled-text label="リンク">
        <a
          :href="data.url"
          target="_blank"
        >{{ data.id }}</a>
      </labeled-text>
      <v-row justify="end">
        <v-btn
          v-if="!clipState.disabled"
          color="secondary"
          @click="disable"
        >
          無効化
        </v-btn>
        <v-btn
          v-else
          color="success"
          @click="enable"
        >
          有効化
        </v-btn>
        <v-btn
          icon
          class="ml-2"
          @click="transition"
        >
          <v-icon>fas fa-share</v-icon>
        </v-btn>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<style scoped>
.disabled-enter-active, .disabled-leave-active {
  transition: opacity .5s, transform .5s, color .5s;
}

.disabled-enter, .disabled-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>

<script lang="ts">
/* global nodecg */
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

import LabeledText from '../../_lib/components/LabeledTextComponent.vue';
import { TwitchGameArray } from '../../../../nodecg/generated/twitchGameArray';
import { TwitchClip } from '../../../../extension/types/twitchClip';
import clone from 'clone';
import { ClipState } from '../../../../extension/types/clipState';

@Component({
  components: {
    LabeledText
  }
})
export default class ClipListElementComponent extends Vue {
  @Prop(Number)
  readonly index!: number;

  @Prop(Object)
  readonly data!: TwitchClip;

  @Prop(Object)
  readonly clipState!: ClipState;

  games: TwitchGameArray = [];
  created(): void {
    nodecg.Replicant('twitchGameArray').on('change', (newVal) => {
      this.games = clone(newVal);
    })
  }

  getGameName(id: string): string {
    return this.games.find((game) => {
      return game.id === id;
    })?.name || '';
  }

  @Emit()
  enable(): void {
    nodecg.sendMessage('enableClip', this.data.id);
  }

  @Emit()
  disable(): void {
    nodecg.sendMessage('disableClip', this.data.id);
  }

  @Emit()
  transition(): void {
    nodecg.sendMessage('transitionTo', this.data.id);
  }
}
</script>