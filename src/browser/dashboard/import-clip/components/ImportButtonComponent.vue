<template>
  <v-btn
    block
    color="info"
    @click="importClips"
  >
    クリップのインポート
  </v-btn>
</template>

<script lang="ts">
/* global nodecg */
import { Vue, Component, Emit, Prop } from 'vue-property-decorator';

@Component
export default class ImportButtonComponent extends Vue {
  @Prop(String)
  readonly channel!: string;

  @Prop(String)
  readonly sortKey!: 'title'|'viewCount';

  @Prop(String)
  readonly start!: string;

  @Prop(String)
  readonly end!: string;

  @Prop(Number)
  readonly clipLength!: number;

  @Emit()
  importClips(): void {
    if (this.clipLength > 100) {
      return;
    }

    nodecg.sendMessage('importClip', {
      channel: this.channel,
      sort: this.sortKey,
      length: this.clipLength,
      start: this.start,
      end: this.end
    });
  }

}
</script>