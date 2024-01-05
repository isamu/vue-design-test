<template>
  <div class="h-[500vh]">
    <div ref="main" class="sticky top-0 h-[100vh]">
      page 1
      {{ top }}
    </div>
    <div class="sticky top-0 bg-black h-[100vh]">
      page 2
      {{ top }}
    </div>

    <div class="sticky top-0 bg-pink-400 h-[100vh]">
      page 3
      {{ top }}
    </div>
    <div class="bg-white relative h-[100vh]">
      page 4
      {{ top }}
    </div>
    <div class="bg-white relative h-[100vh]">
      page 5
      {{ top }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  components: {},
  setup() {
    const main = ref();
    const top = ref(0);
    const showScrollTop = () => {
      console.log("AA");
      console.log(window.scrollY);
      console.log(main.value);
      top.value = window.scrollY;
    };

    onMounted(() => {
      window.addEventListener("scroll", showScrollTop, { passive: true });
    });

    return {
      main,
      top,
    };
  },
});
</script>
