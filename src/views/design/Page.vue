<template>
  <div class="top-0 h-[100vh]" ref="page" :style="style" :class="classNames">
    <span v-if="false"> {{ currentPage }} // {{ myPageNumber }} // {{ pageRatio }} </span>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, nextTick, inject, provide } from "vue";
import { useStyle, getNormalizedStyleData } from "./useStyle";

export const PageIsBeforeLoading = 10;
export const PageIsLoading = 20;
export const PageIsDisplayed = 30;
export const PageIsAfterDisplayed = 40;

export type PageStatus = PageIsBeforeLoading | PageIsLoading | PageIsDisplayed | PageIsAfterDisplayed;

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
    const basePageRatio = inject("pageRatio");

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

    const pageRatio = computed(() => {
      if (PageIsDisplayed > pageStatus.value) {
        return 0;
      }
      if (pageStatus.value === PageIsDisplayed) {
        return basePageRatio.value || 0;
      }
      return 100;
    });
    const loadingPageRatio = computed(() => {
      if (pageStatus.value === PageIsBeforeLoading) {
        return 0;
      }
      if (pageStatus.value === PageIsLoading) {
        return basePageRatio.value || 0;
      }
      return 100;
    });
    provide("myPageRatio", pageRatio);
    provide("myLoadingPageRatio", loadingPageRatio);
    provide("pageStatus", pageStatus);

    const { style } = useStyle(pageRatio, loadingPageRatio, props.animatedStyle, props.loadingAnimatedStyle);

    const classNames = props.sticky ? "sticky" : "relative";

    return {
      currentPage,
      pageRatio,

      myPageNumber,
      page,

      loadingPageRatio,

      style,
      classNames,
    };
  },
});
</script>
