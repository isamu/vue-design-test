import { ref, watch, ComputedRef } from "vue";
import { AnimatedStyle, TypeData } from "./type";

// data is 0 to 100
// offset, limit
const normalizedData = (data: TypeData<number>, ratio: number) => {
  if (typeof data === "object" && data.from && data.to) {
    const a = data.from;
    const b = data.to;
    return ((b - a) * ratio + 100 * a) / 100;
  }
  // a = data, b = 0
  return ((100 - ratio) * (data as number)) / 100;
};

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
      style.value = {};
      if (pageRatio.value > 0 && animatedStyle) {
        if (animatedStyle.width) {
          // 0 to 100
          style.value.width = normalizedData(animatedStyle.width, pageRatio.value) + "%";
        }
        if (animatedStyle.height) {
          style.value.height = normalizedData(animatedStyle.height, pageRatio.value) + "%";
        }
        if (animatedStyle.opacity !== undefined) {
          // 0 to 1
          style.value.opacity = normalizedData(animatedStyle.opacity, pageRatio.value) / 100;
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
    },
    { immediate: true },
  );
  return {
    style,
  };
};
