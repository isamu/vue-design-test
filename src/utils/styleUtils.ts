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
  return data as number;
};

const normalizedDataArray = (data: TypeData<number[]>, ratio: number) => {
  if (typeof data === "object" && !Array.isArray(data) && !isNull<number[]>(data.from) && !isNull<number[]>(data.to)) {
    return Array.from(data.from.keys()).map((key) => {
      const a = data.from[key];
      const b = data.to[key];
      return ((b - a) * ratio + 100 * a) / 100;
    });
  }
  return data as number[];
};
//

// rotate
// scale
export const dynamicStyle = (styleData: any, key: string, pageRatio: number) => {
  const style: any = {};
  const transforms: string[] = [];
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
  if (styleData.scale !== undefined) {
    const scale = normalizedDataArray(styleData.scale[key], pageRatio).map((a) => a / 100);
    transforms.push("scale(" + scale.join(", ") + ")");
  }
  // rotate3d
  if (styleData.rotate && styleData.rotate[key]) {
    const rotate = normalizedData(styleData.rotate[key], pageRatio) * 3.6;
    transforms.push("rotate(" + rotate + "deg)");
    // style.rotate = "1 3 1 " + pageRatio * 3.6 * styleData.rotate[key] + "deg"
  }
  if (styleData.left) {
    style.left = Math.floor(normalizedData(styleData.left[key], pageRatio)) + "%";
  }
  if (styleData.top) {
    style.top = Math.floor(normalizedData(styleData.top[key], pageRatio)) + "%";
  }
  if (transforms.length > 0) {
    style.transform = transforms.join(" ");
  }
  return style;
};

const defaultValues: { [key: string]: number | number[] | null } = {
  width: 100,
  height: 100,
  opacity: 100,
  scale: [100, 100],
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  rotate: 0,
  // rotate3d
};

const ___get_animated_data = (data: AnimatedStyle, beforeData: number | number[] | null | StaticStyle, key = "") => {
  if (isNull(data)) {
    return beforeData;
  }
  // Array.isArray([])
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

// null,
// number
// number[]
// {from: number, to: number}
// {from: number[], to: number[]}
const arraySizeData: { [key: string]: number } = {
  rotate3d: 4,
  scale: 2,
};
const ___get_animated_array_data = (data: AnimatedStyle | any, beforeData: number | number[] | null | StaticStyle, dataKey: string) => {
  const arraySize = arraySizeData[dataKey];

  // null,
  if (isNull(data)) {
    return beforeData;
  }

  // {from: number, to: number}
  // {from: number[], to: number[]}
  if (typeof data === "object" && !Array.isArray(data)) {
    if (!Array.isArray(data.from)) {
      data.from = Array.from(Array(arraySize)).map(() => {
        return data.from;
      });
    }
    if (!Array.isArray(data.to)) {
      data.to = Array.from(Array(arraySize)).map(() => {
        return data.to;
      });
    }
    return data;
  }

  // number[]
  if (Array.isArray(data) && Array.isArray(beforeData)) {
    const isNotUpdate = Array.from(data.keys()).every((key) => {
      return data[key] === beforeData[key];
    });
    if (isNotUpdate) {
      return data;
    }
    return {
      from: beforeData,
      to: data,
    };
  }
  return Array.from(Array(arraySize)).map(() => {
    return data;
  });
};

export const getNormalizedStyleData = (
  beforeStyle: { [key: string]: StaticStyle },
  loadingAnimatedStyle: { [key: string]: AnimatedStyle },
  animatedStyle: { [key: string]: AnimatedStyle },
  afterStyle: { [key: string]: StaticStyle },
) => {
  const keys = Object.keys({ ...beforeStyle, ...loadingAnimatedStyle, ...animatedStyle, ...afterStyle });
  return keys.reduce((tmp: { [key: string]: any }, key: string) => {
    const type_is_array_data = key === "scale";

    const defaultValue = defaultValues[key];
    const beforeData = isNull(beforeStyle[key]) ? defaultValue : beforeStyle[key];
    const loadingData = (type_is_array_data ? ___get_animated_array_data : ___get_animated_data)(loadingAnimatedStyle[key], beforeData, key);
    // console.log(loadingData);
    // @ts-ignore
    const __a = typeof loadingData === "object" ? loadingData?.to : loadingData;
    const animatedData = (type_is_array_data ? ___get_animated_array_data : ___get_animated_data)(animatedStyle[key], __a, key);
    // @ts-ignore
    const __b = typeof animatedData === "object" ? animatedData?.to : animatedData;
    const afterData = isNull(afterStyle[key]) ? __b : afterStyle[key];
    
    tmp[key] = {
      beforeStyle: beforeData,
      loadingAnimatedStyle: loadingData,
      animatedStyle: animatedData,
      afterStyle: afterData,
    };
    // console.log(tmp);
    return tmp;
  }, {});
};
