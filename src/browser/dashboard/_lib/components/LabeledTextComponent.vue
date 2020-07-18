<template>
  <div class="my-2">
    <v-chip
      color="info"
      label
    >
      {{ label }}
    </v-chip>
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class LabeledTextComponent extends Vue {
  @Prop(String)
  readonly label!: string;
}
</script>