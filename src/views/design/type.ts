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
