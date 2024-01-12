<template>
  <div :style="style" class="relative">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { useStyle} from "./useStyle";
import { getNormalizedStyleData } from "../../utils//styleUtils";

export default defineComponent({
  name: "Page",
  props: {
    animatedStyle: {
      type: Object, // todo type
      default: () => {
        return {};
      },
    },
    loadingAnimatedStyle: {
      type: Object, // todo type
      default: () => {
        return {};
      },
    },
    beforeStyle: {
      type: Object, // todo type
      default: () => {
        return {};
      },
    },
    afterStyle: {
      type: Object, // todo type
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const normalizedStyleData = getNormalizedStyleData(props.beforeStyle, props.loadingAnimatedStyle, props.animatedStyle, props.afterStyle);

    const pageRatio = inject("pageRatio");
    const pageStatus = inject("pageStatus");
    const { style } = useStyle(normalizedStyleData, pageStatus, pageRatio);

    return {
      style,
    };
  },
});
</script>
