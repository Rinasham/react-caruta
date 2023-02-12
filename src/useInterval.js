import { useRef, useEffect } from "react";

export const useInterval = (callback, delay) => {
  // savedCallbackにはintervalの中で繰り返したい関数が入る
  // useRefに入れることで何度も違うintervalが発動するのを防ぐ
  const savedCallback = useRef();

  useEffect(() => {
    // レンダリングされるたびに最新のコールバックをrefに保存
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
