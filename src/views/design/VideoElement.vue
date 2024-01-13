<template>
  <div :style="style" class="relative">
    <video webkit-playsinline playsinline muted ref="videoRef"><source :type="type" :src="src" /></video>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, inject, onMounted, nextTick } from "vue";
import { useStyle } from "./useStyle";
import { getNormalizedStyleData } from "../../utils/styleUtils";

export default defineComponent({
  name: "Page",
  props: {
    type: {
      type: String,
      default: "",
    },
    src: {
      type: String,
      default: "",
    },
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
  },
  setup(props, ctx) {
    const normalizedStyleData = getNormalizedStyleData(props.beforeStyle, props.loadingAnimatedStyle, props.animatedStyle, props.afterStyle);

    const pageRatio = inject("pageRatio");
    const pageStatus = inject("pageStatus");
    const { style } = useStyle(normalizedStyleData, pageStatus, pageRatio);

    const videoRef = ref();
    console.log(videoRef);
    watch(pageRatio, () => {
      //videoRef.value.play()
      // console.log(videoRef);
      if (videoRef.value && videoRef.value.duration) {
        console.log(videoRef.value.duration, videoRef.value.currentTime);
        videoRef.value.currentTime = (videoRef.value.duration * pageRatio.value) / 100;
      }
      //console.log( videoRef.value.currentTime,  pageRatio.value/100 );
    });

    return {
      style,
      videoRef,
    };
  },
});
</script>
