export type TypeData<T> = T | { from: T; to: T };

export type AnimatedStyle = {
  width?: number;
  height?: number;
  opacity?: TypeData<number>;
  rotate?: number;
  left?: number;
  right?: number;
};

export type StaticStyle = {
  width?: number;
  height?: number;
  opacity?: number;
  rotate?: number;
  left?: number;
  right?: number;
};

export const PageIsBeforeLoading = 10;
export const PageIsLoading = 20;
export const PageIsDisplayed = 30;
export const PageIsAfterDisplayed = 40;

export const PageStatus = PageIsBeforeLoading | PageIsLoading | PageIsDisplayed | PageIsAfterDisplayed;
