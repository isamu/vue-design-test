import { ref, watch, ComputedRef } from "vue";
import { AnimatedStyle } from "./type";

export const useStyle = (pageRatio: ComputedRef<number>, animatedStyle: AnimatedStyle) => {
  const style = ref<{ [key: string]: string | number }>({});
  watch(
    pageRatio,
    () => {
      if (animatedStyle) {
        if (animatedStyle.width) {
          style.value.width = pageRatio.value + "%";
        }
        if (animatedStyle.height) {
          style.value.height = pageRatio.value + "%";
        }
        if (animatedStyle.opacity) {
          style.value.opacity = (100 - pageRatio.value) / 100;
        }
        if (animatedStyle.rotate) {
          style.value.transform = "rotate(" + pageRatio.value * 3.6 * animatedStyle.rotate + "deg)";
        }
        if (animatedStyle.left) {
          style.value.left = Math.floor((animatedStyle.left * pageRatio.value) / 100) + "%";
        }
      }
      console.log(style.value);
    },
    { immediate: true },
  );
  return {
    style,
  };
};