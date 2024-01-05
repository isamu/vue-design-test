<template>
  <div class="h-[500vh]" ref="main" id="main">
    <div class="sticky top-0 h-[100vh]" ref="page1">
      <img src="/a.jpg" :style="style1" />
      {{ scrollTopPosition }}
    </div>
    <div class="sticky top-0 bg-black h-[100vh]" :style="style2">
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
      <img src="/a.jpg" :style="style4" class="w-2/4"/>
    </div>
    <div class="bg-white relative h-[100vh]">
      page 5
      <div  :style="style5" class="relative text-left text-8xl">
        Hello World
      </div>
      {{ style5 }}
      {{ scrollTopPosition }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";

export default defineComponent({
  components: {},
  setup() {
    const main = ref();
    const page1 = ref();
    const style1 = ref({});
    const style2 = ref({});
    const style3 = ref({});
    const style4 = ref({});
    const style5 = ref({});

    const scrollTopPosition = ref(0);
    const currentPage = ref(0);
    const posInPage = ref(0);
    const  pageRatio = ref(0);
    const showScrollTop = () => {
      // console.log("AA");
      // console.log(main.value.offsetTop);
      // const topOffset = window.scrollY + main.value.getBoundingClientRect().top;
      // const currentScrollPosition = window.scrollY;
      const pageHeight = page1.value.getBoundingClientRect().height;
      const pageTop = -main.value.getBoundingClientRect().top;
      currentPage.value = Math.floor(pageTop / pageHeight);

      posInPage.value = Math.floor(pageTop % pageHeight);
      pageRatio.value = (100 * posInPage.value) / pageHeight;
      console.log(pageTop, pageHeight, currentPage.value, Math.floor(pageRatio.value));

      scrollTopPosition.value = window.scrollY;
      

    };

    onMounted(() => {
      window.addEventListener("scroll", showScrollTop, { passive: true });
    });

    watch([posInPage, pageRatio], () => {
      console.log(posInPage.value, pageRatio.value);
      style1.value.width = pageRatio.value + "%";
      style2.value.opacity = (100 - pageRatio.value) / 100;

      style4.value.transform =  "rotate(" + pageRatio.value * 3.6 * 0.5 + "deg)";

      style5.value.left = Math.floor(70 * pageRatio.value / 100 ) + "%";
      style5.value.opacity = pageRatio.value / 100;
      
    });

    return {
      main,
      scrollTopPosition,
      page1,
      style1,
      style2,
      style3,
      style4,
      style5,
    };
  },
});
</script>
