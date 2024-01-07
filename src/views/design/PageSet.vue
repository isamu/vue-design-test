<template>
  <div ref="main" :class="className">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance, onMounted } from "vue";

export default defineComponent({
  name: "PageSet",
  setup(_, ctx) {
    const main = ref();

    const currentPage = ref(0);
    const posInPage = ref(0);
    const pageRatio = ref(0);

    const slot = ctx.slots.default();
    const className = "h-[" + slot.length + "00vh]";

    const showScrollTop = () => {
      const pageHeight = main.value.getBoundingClientRect().height / slot.length;
      const pageTop = -main.value.getBoundingClientRect().top;
      currentPage.value = Math.floor(pageTop / pageHeight);

      posInPage.value = Math.floor(pageTop % pageHeight);
      pageRatio.value = (100 * posInPage.value) / pageHeight;
      console.log(pageTop, pageHeight, currentPage.value, Math.floor(pageRatio.value));
    };

    onMounted(() => {
      // TODO: vue style
      const instance = getCurrentInstance();
      Array.from(instance.vnode.el.children).map((a, k) => {
        a.dataset["index"] = k;
      });

      window.addEventListener("scroll", showScrollTop, { passive: true });
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
