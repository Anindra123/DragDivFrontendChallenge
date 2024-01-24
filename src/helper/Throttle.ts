export const Throttle = (callback: () => void, time: number) => {
  let pause = false;
  return () => {
    if (pause) return;
    pause = true;
    callback();

    setTimeout(() => {
      pause = false;
    }, time);
  };
};
