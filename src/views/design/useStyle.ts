import { ref, watch, ComputedRef } from "vue";
import { AnimatedStyle } from "./type";

export const useStyle = (
  pageRatio: ComputedRef<number>,
  loadingPageRatio: ComputedRef<number>,
  animatedStyle: AnimatedStyle,
  loadingAnimatedStyle: AnimatedStyle,
) => {
  const style = ref<{ [key: string]: string | number }>({});
  watch(
    [pageRatio, loadingPageRatio],
    () => {
      if (pageRatio.value > 0 && animatedStyle) {
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
      if (loadingPageRatio.value > 0 && loadingAnimatedStyle) {
        if (loadingAnimatedStyle.width) {
          style.value.width = loadingPageRatio.value + "%";
        }
        if (loadingAnimatedStyle.height) {
          style.value.height = loadingPageRatio.value + "%";
        }
        if (loadingAnimatedStyle.opacity) {
          style.value.opacity = (100 - loadingPageRatio.value) / 100;
        }
        if (loadingAnimatedStyle.rotate) {
          style.value.transform = "rotate(" + loadingPageRatio.value * 3.6 * loadingAnimatedStyle.rotate + "deg)";
        }
        if (loadingAnimatedStyle.left) {
          style.value.left = Math.floor((loadingAnimatedStyle.left * loadingPageRatio.value) / 100) + "%";
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
