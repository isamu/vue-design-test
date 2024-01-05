<template>
<main ref="main"  id="main">
  <div class="h-screen overflow-y-scroll scroll-container">
    <div class="sticky top-0 h-[100vh] snap-start snap-always" ref="page1"  id="page1">
      page 1
      {{ top }}
    </div>
    <div class="sticky top-0 bg-black h-[100vh] snap-start snap-always">
      page 2
      {{ top }}
    </div>

    <div class="sticky top-0 bg-pink-400 h-[100vh] snap-start snap-always">
      page 3
      {{ top }}
    </div>
    <div class="bg-white relative h-[100vh] snap-start snap-always">
      page 4
      {{ top }}
    </div>
    <div class="bg-white relative h-[100vh] snap-start snap-always">
      page 5
      {{ top }}
    </div>
  </div>
</main>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  components: {},
  setup() {
    const main = ref();
    const page1 = ref();

    const top = ref(0);
    const currentPage = ref(0);

    const showScrollTop = () => {
      console.log("AA");
      console.log(window.scrollY);
      console.log(main.value);

      const pageHeight = page1.value.getBoundingClientRect().height;
      const pageTop = - main.value.getBoundingClientRect().top;
      currentPage.value = Math.floor(pageTop / pageHeight);

      const posInPage = Math.floor(pageTop % pageHeight);
      const pageRatio = Math.floor(100 * posInPage / pageHeight)
      console.log(pageTop, pageHeight, currentPage.value, pageRatio);

      top.value = window.scrollY;
    };

    onMounted(() => {
      console.log("DDD");
      window.addEventListener("scroll", showScrollTop);
      console.log(main.value);
      page1.value.addEventListener("scroll", showScrollTop);
    });

    return {
      main,
      top,
      page1,
    };
  },
});
</script>

<style scoped>
.scroll-container {
  scroll-snap-type: y mandatory;
}
</style>
