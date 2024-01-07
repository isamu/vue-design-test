<template>
  <div class="top-0 h-[100vh]" ref="page" :style="style" :class="classNames">
    <span v-if="false"> {{ currentPage }} // {{ myPageNumber }} // {{ pageRatio }} </span>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, getCurrentInstance, onMounted, nextTick } from "vue";
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
    sticky: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    console.log(props.sticky);
    const instance = getCurrentInstance();
    const page = ref();
    const myPageNumber = ref(0);

    onMounted(() => {
      nextTick(() => {
        myPageNumber.value = Number(page.value?.dataset["index"]);
      });
    });
    const currentPage = computed(() => {
      return instance.parent.ctx.currentPage;
    });

    const isMyPage = computed(() => {
      return myPageNumber.value === currentPage.value;
    });

    const pageRatio = computed(() => {
      if (isMyPage.value) {
        return instance.parent.ctx.pageRatio;
      }
      if (myPageNumber.value > currentPage.value) {
        return 0;
      }
      return 100;
    });

    const { style } = useStyle(pageRatio, props.animatedStyle);

    const classNames = props.sticky ? "sticky" : "relative";

    return {
      currentPage,
      isMyPage,
      pageRatio,

      myPageNumber,
      page,

      style,
      classNames,
    };
  },
});
</script>
