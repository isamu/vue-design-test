export type TypeData<T> = T | { from: T; to: T };

export type AnimatedStyle = {
  width?: number;
  height?: number;
  opacity?: TypeData<number>;
  rotate?: number;
  left?: number;
  right?: number;
};

export type PageIsBeforeLoading = 10;
export type PageIsLoading = 20;
export type PageIsDisplayed = 30;
export type PageIsAfterDisplayed = 40;

export type PageStatus = PageIsBeforeLoading | PageIsLoading | PageIsDisplayed | PageIsAfterDisplayed;
