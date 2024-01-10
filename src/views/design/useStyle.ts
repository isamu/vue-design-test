import { ref, watch, ComputedRef } from "vue";
import { AnimatedStyle, StaticStyle, TypeData } from "./type";

import { PageStatus, PageIsBeforeLoading, PageIsLoading, PageIsDisplayed, PageIsAfterDisplayed } from "./type";

export const isNull = <T>(value: T) => {
  return value === null || value === undefined;
};

// data is 0 to 100
// offset, limit
const normalizedData = (data: TypeData<number>, ratio: number) => {
  if (typeof data === "object" && !isNull<number>(data.from) && !isNull<number>(data.to)) {
    const a = data.from;
    const b = data.to;
    return ((b - a) * ratio + 100 * a) / 100;
  }
  return data as number;
  // a = data, b = 0
  // return ((100 - ratio) * (data as number)) / 100;
};
//

const staticStyle = (styleData: any, key: string) => {
  const style: any = {};
  if (styleData.width) {
    // 0 to 100
    style.width = styleData.width[key] + "%";
  }
  if (styleData.height) {
    style.height = styleData.height[key] + "%";
  }
  if (styleData.opacity !== undefined) {
    // 0 to 1
    style.opacity = styleData.opacity[key] / 100;
  }
  if (styleData.rotate && styleData.rotate[key]) {
    style.transform = "rotate(" + 360 * styleData.rotate[key] + "deg)";
  }
  if (styleData.left) {
    style.left = Math.floor(styleData.left[key]) + "%";
  }

  return style;
};

const dynamicStyle = (styleData: any, key: string, pageRatio: number) => {
  const style: any = {};
  if (styleData.width) {
    // 0 to 100
    style.width = normalizedData(styleData.width[key], pageRatio) + "%";
  }
  if (styleData.height) {
    style.height = normalizedData(styleData.height[key], pageRatio) + "%";
  }
  if (styleData.opacity !== undefined) {
    // 0 to 1
    style.opacity = normalizedData(styleData.opacity[key], pageRatio) / 100;
  }
  if (styleData.rotate && styleData.rotate[key]) {
    style.transform = "rotate(" + pageRatio * 3.6 * styleData.rotate[key] + "deg)";
  }
  if (styleData.left) {
    style.left = Math.floor(normalizedData(styleData.left[key], pageRatio)) + "%";
  }
  if (styleData.top) {
    style.top = Math.floor(normalizedData(styleData.top[key], pageRatio)) + "%";
  }
  return style;
};
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
        console.log(normalizedStyleData);
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

const defaultValues: { [key: string]: number | null } = {
  width: 100,
  height: 100,
  opacity: 100,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  rotate: null,
};

const ___get_animated_data = (data: AnimatedStyle, beforeData: number | null | StaticStyle) => {
  if (isNull(data)) {
    return beforeData;
  }
  if (typeof data === "object") {
    return data;
  }
  if (beforeData === data) {
    return data;
  }
  return {
    from: beforeData,
    to: data,
  };
};

export const getNormalizedStyleData = (
  beforeStyle: { [key: string]: StaticStyle },
  loadingAnimatedStyle: { [key: string]: AnimatedStyle },
  animatedStyle: { [key: string]: AnimatedStyle },
  afterStyle: { [key: string]: StaticStyle },
) => {
  const keys = Object.keys({ ...beforeStyle, ...loadingAnimatedStyle, ...animatedStyle, ...afterStyle });
  return keys.reduce((tmp: { [key: string]: any }, key: string) => {
    if (key === "rotate") {
      tmp[key] = {
        beforeStyle: beforeStyle[key],
        loadingAnimatedStyle: loadingAnimatedStyle[key],
        animatedStyle: animatedStyle[key],
        afterStyle: afterStyle[key],
      };
    } else {
      const defaultValue = defaultValues[key];
      const beforeData = isNull(beforeStyle[key]) ? defaultValue : beforeStyle[key];
      const loadingData = ___get_animated_data(loadingAnimatedStyle[key], beforeData);
      // @ts-ignore
      const __a = typeof loadingData === "object" ? loadingData?.to : loadingData;
      const animatedData = ___get_animated_data(animatedStyle[key], __a);
      // @ts-ignore
      const __b = typeof animatedData === "object" ? animatedData?.to : animatedData;
      const afterData = isNull(afterStyle[key]) ? __b : afterStyle[key];

      tmp[key] = {
        beforeStyle: beforeData,
        loadingAnimatedStyle: loadingData,
        animatedStyle: animatedData,
        afterStyle: afterData,
      };
    }
    return tmp;
  }, {});
};
