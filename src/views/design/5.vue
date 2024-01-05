<template>
  <div class="h-[500vh]" ref="main" id="main">
    <div class="sticky top-0 h-[100vh]" ref="page1">
      page 1
      <img src="/a.jpg" :style="style" />
      {{ scrollTopPosition }}
    </div>
    <div class="sticky top-0 bg-black h-[100vh]">
      page 2
      {{ scrollTopPosition }}
    </div>

    <div class="sticky top-0 bg-pink-400 h-[100vh]">
      page 3
      {{ scrollTopPosition }}
    </div>
    <div class="bg-white relative h-[100vh]">
      page 4
      {{ scrollTopPosition }}
    </div>
    <div class="bg-white relative h-[100vh]">
      page 5
      {{ scrollTopPosition }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  components: {},
  setup() {
    const main = ref();
    const page1 = ref();
    const style = ref({});

    const scrollTopPosition = ref(0);
    const currentPage = ref(0);
    const showScrollTop = () => {
      // console.log("AA");
      // console.log(main.value.offsetTop);
      // const topOffset = window.scrollY + main.value.getBoundingClientRect().top;
      // const currentScrollPosition = window.scrollY;
      const pageHeight = page1.value.getBoundingClientRect().height;
      const pageTop = -main.value.getBoundingClientRect().top;
      currentPage.value = Math.floor(pageTop / pageHeight);

      const posInPage = Math.floor(pageTop % pageHeight);
      const pageRatio = Math.floor((100 * posInPage) / pageHeight);
      console.log(pageTop, pageHeight, currentPage.value, pageRatio);

      scrollTopPosition.value = window.scrollY;
    };

    onMounted(() => {
      window.addEventListener("scroll", showScrollTop, { passive: true });
    });

    return {
      main,
      scrollTopPosition,
      page1,
      style,
    };
  },
});
</script>
