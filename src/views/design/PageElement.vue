<template>
  <div :style="style">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from "vue";
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
    const instance = getCurrentInstance();

    const pageRatio = computed(() => {
      return instance.parent.ctx.pageRatio;
    });
    const { style } = useStyle(pageRatio, props.animatedStyle);

    return {
      style,
    };
  },
});
</script>
