<template>
  <div class="top-0 h-[100vh]" ref="page" :style="style" :class="classNames">
    <span v-if="false"> {{ currentPage }} // {{ myPageNumber }} // {{ pageRatio }} </span>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, nextTick, inject, provide } from "vue";
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
    loadingAnimatedStyle: {
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
    const __pageRatio = inject("pageRatio");

    const isLoadingMyPage = computed(() => {
      return myPageNumber.value !== 0 && myPageNumber.value - 1 === currentPage.value;
    });

    const isMyPage = computed(() => {
      return myPageNumber.value === currentPage.value;
    });

    const pageRatio = computed(() => {
      if (isMyPage.value) {
        return __pageRatio.value || 0;
      }
      if (myPageNumber.value > currentPage.value) {
        return 0;
      }
      return 100;
    });
    const loadingPageRatio = computed(() => {
      if (isLoadingMyPage.value) {
        return __pageRatio.value || 0;
      }
      if (myPageNumber.value > currentPage.value - 1) {
        return 0;
      }
      return 100;
    });
    provide("myPageRatio", pageRatio);
    provide("myLoadingPageRatio", loadingPageRatio);

    const { style } = useStyle(pageRatio, loadingPageRatio, props.animatedStyle, props.loadingAnimatedStyle);

    const classNames = props.sticky ? "sticky" : "relative";

    return {
      currentPage,
      isMyPage,
      pageRatio,

      myPageNumber,
      page,

      isLoadingMyPage,
      loadingPageRatio,

      style,
      classNames,
    };
  },
});
</script>
