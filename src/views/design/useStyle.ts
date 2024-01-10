import { ref, watch, ComputedRef } from "vue";
import { AnimatedStyle, StaticStyle, TypeData } from "./type";

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
  // a = data, b = 0
  return ((100 - ratio) * (data as number)) / 100;
};
//

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
