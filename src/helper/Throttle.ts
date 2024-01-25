export function throttle<T extends (...args: never[]) => void>(
  callback: T,
  time: number
) {
  let pause = false;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (pause) return;
    callback.apply(this, args);
    pause = true;

    setTimeout(() => {
      pause = false;
    }, time);
  };
}
