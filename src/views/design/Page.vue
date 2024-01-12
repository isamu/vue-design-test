<template>
  <div class="top-0" ref="page" :style="style" :class="classNames">
    <span v-if="false"> {{ currentPage }} // {{ myPageNumber }} // {{ pageRatio }} </span>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, nextTick, inject, provide } from "vue";
import { useStyle } from "./useStyle";
import { getNormalizedStyleData } from "../../utils//styleUtils";

import { PageStatus, PageIsBeforeLoading, PageIsLoading, PageIsDisplayed, PageIsAfterDisplayed } from "../../utils/type";

export default defineComponent({
  name: "Page",
  props: {
    height: {
      type: String,
      default: "h-[100vh]",
    },
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
    sticky: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const page = ref();
    const myPageNumber = ref(0);

    onMounted(() => {
      nextTick(() => {
        myPageNumber.value = Number(page.value?.dataset["index"]);
      });
    });
    const currentPage = inject("currentPage");
    const pageRatio = inject("pageRatio");

    const normalizedStyleData = getNormalizedStyleData(props.beforeStyle, props.loadingAnimatedStyle, props.animatedStyle, props.afterStyle);

    const pageStatus = computed(() => {
      if (myPageNumber.value > 1 && myPageNumber.value - 1 > currentPage.value) {
        return PageIsBeforeLoading;
      }
      if (myPageNumber.value > 0 && myPageNumber.value - 1 === currentPage.value) {
        return PageIsLoading;
      }
      if (myPageNumber.value === currentPage.value) {
        return PageIsDisplayed;
      }
      return PageIsAfterDisplayed;
    });

    provide("pageRatio", pageRatio);
    provide("pageStatus", pageStatus);

    const { style } = useStyle(normalizedStyleData, pageStatus, pageRatio);

    const classNames = [props.sticky ? "sticky" : "relative", props.height];

    return {
      currentPage,
      pageRatio,

      myPageNumber,
      page,

      style,
      classNames: classNames.join(" "),
    };
  },
});
</script>
