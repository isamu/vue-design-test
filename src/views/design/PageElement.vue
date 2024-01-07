<template>
  <div :style="style">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { useStyle } from "./useStyle";

export default defineComponent({
  name: "Page",
  props: {
    animatedStyle: {
      type: Object, // todo type
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const pageRatio = inject("myPageRatio");
    const { style } = useStyle(pageRatio, props.animatedStyle);

    return {
      style,
    };
  },
});
</script>
