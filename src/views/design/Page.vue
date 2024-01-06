<template>
  <div class="sticky top-0 h-[100vh]" ref="page">
    {{ currentPage }} // {{ myPageNumber }}
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, getCurrentInstance, onMounted, nextTick } from "vue";

export default defineComponent({
  name: "Page",
  setup() {
    const instance = getCurrentInstance();
    const page = ref();
    const myPageNumber = ref(0);

    onMounted(() => {
      nextTick(() => {
        myPageNumber.value = page.value?.dataset["index"];
      });
    });
    const currentPage = computed(() => {
      return instance.parent.ctx.currentPage;
    });

    return {
      currentPage,
      myPageNumber,
      page,
    };
  },
});
</script>
