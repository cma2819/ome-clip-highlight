<template>
  <overlay-base>
    <transition
      name="thumbnail"
      mode="out-in"
    >
      <div
        v-if="currentClip"
        :key="currentClip.id"
        :style="{
          position: 'absolute',
          top: '200px',
          left: '320px',
          width: '1280px',
          height: '720px',
          border: `6px solid ${$vuetify.theme.themes.light.primary}`
        }"
      >
        <highlight-thumbnail :thumbnail-url="currentClip.thumbnailUrl"></highlight-thumbnail>
      </div>
    </transition>
    <transition
      name="title"
      mode="out-in"
    >
      <div
        v-if="currentClip"
        :key="currentClip.id"
        :style="{
          position: 'absolute',
          top: '0px',
          right: '0px',
          width: '1920px',
          height: '160px',
          margin: '50px 50px',
          textAlign: 'right',
          fontSize: '64px'
        }"
      >
        <highlight-title
          :title="currentClip.title"
          :creator="currentClip.creatorName"
        ></highlight-title>
      </div>
    </transition>
    <div
      :style="{
        position: 'absolute',
        top: '0px',
        left: '0px',
        margin: '25px 50px',
        width: '240px',
        height: '160px',
      }"
    >
      <highlight-rank
        :clip-rank="currentState.rank"
      ></highlight-rank>
    </div>
    <transition name="track">
      <div
        v-if="spotifyIsPlaying && spotifyTrack"
        :style="{
          position: 'absolute',
          bottom: '0px',
          left: '0px',
          margin: '25px 25px',
          width: '1280px',
          font: '24px Kosugi Maru'
        }"
      >
        <highlight-playing-track
          :title="spotifyTrack.name"
          :artist="spotifyArtistName"
        ></highlight-playing-track>
      </div>
    </transition>
    <div
      :style="{
        position: 'absolute',
        right: '0px',
        bottom: '0px',
        width: '360px',
        height: '140px',
        margin: '10px 30px'
      }"
    >
      <div
        :style="{
          width: '360px',
          height: '100px'
        }"
      >
        <event-logo></event-logo>
      </div>
      <div
        :style="{
          font: 'bold 36px Kosugi Maru',
          color: $vuetify.theme.themes.light.primary,
          textShadow: `2px 2px ${$vuetify.theme.themes.light.secondary}`
        }"
      >
        クリップ振り返り配信
      </div>
    </div>
  </overlay-base>
</template>

<style scoped>
.thumbnail-enter-active, .thumbnail-leave-active {
  transition: transform 1s;
}

.thumbnail-enter-active {
  transition-delay: .5s;
}

.thumbnail-leave-active {
  transition-delay: .5s;
}

.thumbnail-enter, .thumbnail-leave-to {
  transform: translateY(-960px);
}

.title-enter-active, .title-leave-active {
  transition: opacity .5s, transform .5s
}

.title-enter-active {
  transition-delay: 2.5s;
}

.title-enter, .title-leave-to {
  opacity: 0;
  transform: translateX(25px);
}

.track-enter-active, .track-leave-active {
  transition: opacity .5s, transform .5s;
}

.track-enter, .track-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>

<script lang="ts">
/* global nodecg */
import { Vue, Component } from 'vue-property-decorator';
import EventLogo from '../components/EventLogo.vue';
import OverlayBase from '../OverlayBase.vue';
import HighlightRank from './components/HighlightRankComponent.vue';
import HighlightThumbnail from './components/HighlightThumbnailComponent.vue';
import HighlightTitle from './components/HighlightTitleComponent.vue';
import HighlightPlayingTrack from './components/HighlightPlayingTrackComponent.vue';

import { TwitchClip } from '../../../extension/types/twitchClip';
import { TwitchClipArray } from '../../../nodecg/generated/twitchClipArray';
import { TwitchClipStateArray } from '../../../nodecg/generated/twitchClipStateArray';
import { ClipState } from '../../../extension/types/clipState';
import clone from 'clone';
import { SpotifyPlayingTrack } from '../../../nodecg/external/nodecg-spotify-widget/spotifyPlayingTrack';

@Component({
  components: {
    OverlayBase,
    EventLogo,
    HighlightRank,
    HighlightThumbnail,
    HighlightTitle,
    HighlightPlayingTrack,
  }
})
export default class App extends Vue {
  clips: TwitchClipArray = [];
  currentClip: TwitchClip|null = null;
  clipStates: TwitchClipStateArray = [];
  spotifyTrack: SpotifyPlayingTrack = null;
  spotifyIsPlaying = false;

  created(): void {
    nodecg.Replicant('twitchClipArray').on('change', (newVal) => {
      this.clips = clone(newVal);
    });

    nodecg.Replicant('currentTwitchClip').on('change', (id) => {
      this.currentClip = this.clips.find((clip) => {
        return clip.id === id;
      }) || null;
    });

    nodecg.Replicant('twitchClipStateArray').on('change', (newVal) => {
      this.clipStates = clone(newVal);
    });

    nodecg.Replicant('spotifyPlayingTrack', 'nodecg-spotify-widget').on('change', (track) => {
      this.spotifyTrack = clone(track);
    });

    nodecg.Replicant('spotifyPlayingContext', 'nodecg-spotify-widget').on('change', (context) => {
      this.spotifyIsPlaying = context?.is_playing || false;
    });
  }

  get currentState(): ClipState {
    return this.clipStates.find((state) => {
      return state.id === this.currentClip?.id;
    }) || {
      id: '',
      rank: null,
      disabled: false
    };
  }

  get spotifyArtistName(): string {
    if (!this.spotifyTrack) {
      return '';
    }
    return this.spotifyTrack.artists.join('/');
  }
}
</script>