import { ref, watch, ComputedRef } from "vue";
import { AnimatedStyle, StaticStyle, TypeData, PageStatus, PageIsBeforeLoading, PageIsLoading, PageIsDisplayed, PageIsAfterDisplayed } from "../../utils/type";

import { dynamicStyle } from "../../utils/styleUtils";

// for vue methods
export const useStyle = (normalizedStyleData: any, pageStatus: ComputedRef<number>, pageRatio: ComputedRef<number>) => {
  const style = ref<{ [key: string]: string | number }>({});
  watch(
    [pageRatio, pageStatus],
    () => {
      style.value = {};
      if (pageStatus.value === PageIsBeforeLoading) {
        style.value = dynamicStyle(normalizedStyleData, "beforeStyle", 100);
      } else if (pageStatus.value === PageIsLoading) {
        style.value = dynamicStyle(normalizedStyleData, "loadingAnimatedStyle", pageRatio.value);
      } else if (pageStatus.value === PageIsDisplayed) {
        style.value = dynamicStyle(normalizedStyleData, "animatedStyle", pageRatio.value);
      } else if (pageStatus.value === PageIsAfterDisplayed) {
        style.value = dynamicStyle(normalizedStyleData, "afterStyle", 100);
      }
    },
    { immediate: true },
  );
  return {
    style,
  };
};
