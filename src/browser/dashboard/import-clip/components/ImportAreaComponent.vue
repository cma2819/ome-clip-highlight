<template>
  <v-card>
    <v-card-text>
      <div class="mb-4">
        <v-text-field
          v-model="channelName"
          label="Twitchチャンネル名"
          prefix="https://twitch.tv/"
        ></v-text-field>
        <v-select
          v-model="sortKey"
          class="ml-4"
          hide-details
          label="クリップ取得時のソートキー"
          :items="[
            {text: 'タイトル', value: 'title'},
            {text: '視聴回数', value: 'viewCount'}
          ]"
        >
        </v-select>
        <div class="my-4">
          <v-menu
            v-model="startEnable"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startDate"
                label="検索開始日"
                prepend-icon="fas fa-calendar-day"
                readonly
                v-bind="attrs"
                hide-details
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="startDate"
              color="grey"
              locale="ja"
              @input="startEnable"
            ></v-date-picker>
          </v-menu>
          <v-menu
            v-model="endEnable"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="endDate"
                label="検索終了日"
                prepend-icon="fas fa-calendar-day"
                readonly
                v-bind="attrs"
                hide-details
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="endDate"
              color="grey"
              locale="ja"
              @input="endEnable"
            ></v-date-picker>
          </v-menu>
        </div>
        <v-text-field
          v-model.number="clipLength"
          label="検索数"
          max="100"
        ></v-text-field>
      </div>
      <import-button
        :channel="channelName"
        :sort-key="sortKey"
        :start="startDate"
        :end="endDate"
        :clip-length="clipLength"
      ></import-button>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
/* global nodecg */
import { Vue, Component } from 'vue-property-decorator';
import ImportButton from './ImportButtonComponent.vue';

@Component({
  components: {
    ImportButton
  }
})
export default class ImportAreaComponent extends Vue {
  channelName = nodecg.bundleConfig.defaultChannel;
  sortKey = 'title';

  startDate = new Date().toISOString().substring(0, 10);
  startEnable = false;
  endDate = new Date().toISOString().substring(0, 10);
  endEnable = false;

  clipLength = 20;
}
</script>