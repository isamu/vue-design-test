<template>
  <div :style="style">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { useStyle, getNormalizedStyleData } from "./useStyle";

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
    console.log(normalizedStyleData);

    const pageRatio = inject("myPageRatio");
    const myLoadingPageRatio = inject("myLoadingPageRatio");
    const { style } = useStyle(pageRatio, myLoadingPageRatio, props.animatedStyle, props.loadingAnimatedStyle);

    return {
      style,
    };
  },
});
</script>
