<template>
  <div ref="main" :class="className">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance, onMounted, provide } from "vue";

export default defineComponent({
  name: "PageSet",
  setup(_, ctx) {
    const main = ref();

    const currentPage = ref(0);
    const posInPage = ref(0);
    const pageRatio = ref(0);

    const slot = ctx.slots.default();
    const className = "h-[" + slot.length + "00vh]";

    provide("currentPage", currentPage);
    provide("pageRatio", pageRatio);

    let prevPos = 0;
    let auto_scroll = false;
    const scroll_end_event = () => {
      const currentTop = -main.value.getBoundingClientRect().top;

      const next = currentTop - prevPos > 0 ? currentPage.value : currentPage.value - 1;
      if (!auto_scroll && positions[next]) {
        auto_scroll = true;
        window.scrollTo({
          top: positions[next],
          behavior: "smooth",
        });
      } else {
        auto_scroll = false;
      }
      prevPos = currentTop;
    };

    let positions: number[] = [];
    let tops: number[] = [];
    let pagesHeight: number[] = [];
    const showScrollTop = () => {
      const pageTop = -main.value.getBoundingClientRect().top;

      currentPage.value = Array.from(positions.keys()).find((key) => {
        return positions[key] > pageTop;
      });

      const pageHeight = pagesHeight[currentPage.value];
      posInPage.value = pageTop - tops[currentPage.value];
      pageRatio.value = (100 * posInPage.value) / pageHeight;
    };

    onMounted(() => {
      // TODO: vue style
      const instance = getCurrentInstance();
      Array.from(instance.vnode.el.children).map((a, k) => {
        a.dataset["index"] = k;
      });

      pagesHeight = Array.from(main.value.children).map((child) => {
        return child.getBoundingClientRect().height;
      });
      tops = [0];
      pagesHeight.reduce((top, pageHeight) => {
        const current = top + pageHeight;
        tops.push(current);
        return current;
      }, 0);

      positions = pagesHeight.reduce((current, height) => {
        const nextPos = (current.length === 0 ? 0 : current[current.length - 1]) + height;
        current.push(nextPos);
        return current;
      }, []);

      window.addEventListener("scroll", showScrollTop);

      const scroll_event = "onwheel" in document ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";
      window.addEventListener("scrollend", scroll_end_event);
      window.addEventListener("touchend", scroll_end_event);
      // window.addEventListener("touchstart", () => { console.log("touchstart") });
      // window.addEventListener("touchmove.noScroll", () => { console.log("scroll") });
    });

    return {
      main,

      currentPage, // Page.vue
      pageRatio,

      className,
    };
  },
});
</script>
