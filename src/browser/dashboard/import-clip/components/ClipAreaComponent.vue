<template>
  <div>
    <clip-list
      v-if="clips.length > 0"
      :clips="clips"
    ></clip-list>
    <v-alert
      v-else
      color="dark"
      dark
    >
      読み込まれたクリップはありません。
    </v-alert>
  </div>
</template>

<script lang="ts">
/* global nodecg */
import { Vue, Component } from 'vue-property-decorator';
import ClipList from './ClipListComponent.vue';
import { TwitchClipArray } from '../../../../nodecg/generated/twitchClipArray';
import clone=require('clone');

@Component({
  components: {
    ClipList
  }
})
export default class ClipAreaComponent extends Vue {
  clips: TwitchClipArray = [];
  
  created(): void {
    nodecg.Replicant('twitchClipArray').on('change', (newVal) => {
      this.clips = clone(newVal);
    });
  }
}
</script>