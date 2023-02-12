import { useEffect, useState, useRef } from "react";
import { useInterval } from "./useInterval";

export const useApp = () => {
  //まずはカルタを用意
  const karutaLists = [
    {
      id: "1",
      kaminoku: "問題1",
      simonoku: "git 1",
      answer: "../1.png"
    },
    {
      id: "2",
      kaminoku: "問題2",
      simonoku: "git 2",
      answer: "../2.png"
    },
    {
      id: "3",
      kaminoku: "問題3",
      simonoku: "git 3",
      answer: "../3.png"
    },
    {
      id: "4",
      kaminoku: "問題4",
      simonoku: "git 4",
      answer: "../4.png"
    },
    {
      id: "5",
      kaminoku: "問題5",
      simonoku: "git 5",
      answer: "../5.png"
    },
    {
      id: "6",
      kaminoku: "問題6",
      simonoku: "git 6",
      answer: "../6.png"
    },
    {
      id: "7",
      kaminoku: "問題7",
      simonoku: "git 7",
      answer: "../7.png"
    },
    {
      id: "8",
      kaminoku: "問題8",
      simonoku: "git 8",
      answer: "../8.png"
    },
    {
      id: "9",
      kaminoku: "問題9",
      simonoku: "git 9",
      answer: "../9.png"
    }
  ];

  //useState
  const [yomiLists, setYomiLists] = useState(karutaLists); //読み札管理
  const [efudaLists, setEfudaLists] = useState(yomiLists); //絵札管理
  const [userScore, setUserScore] = useState(0); //ユーザーのスコア管理
  const [cpuScore, setCpuScore] = useState(0); //CPUのスコア管理
  const [userDeck, setUserDeck] = useState([]);
  const [cpuDeck, setCpuDeck] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); //正誤判定後のモーダル管理
  const [isStarted, setIsStarted] = useState(false); //ゲーム開始ボタンの管理(開始画面/ゲーム中画面の切り替え)
  const [isKaruta, setIsKaruta] = useState(false); //絵札一覧の表示・非表示の管理
  const [isAnswered, setIsAnswered] = useState([]); //既に終了している絵札を管理
  const [currentTurn, setCurrentTurn] = useState(0); //ターンカウント
  // 毎ターンのはじめにkaminokuOriginalにそのターンの上の句を入れる
  // 画面にはkaminokuを表示（初期値は空っぽなので何も表示されない）
  // setIntervalで１文字ずつkaminokuOriginal => kaminokuに移動していく（画面に表示される文字が１文字ずつ増えていく）
  const [kaminokuOriginal, setKaminokuOriginal] = useState("");
  const [kaminoku, setKaminoku] = useState("");
  // ↑のintervalを開始/停止するためのステート
  const [isRunning, setIsRunning] = useState(false);

  //ゲームスタート
  const startGame = () => {
    setCards();
    setIsStarted(true);
    setIsRunning(true); // setIntervalを開始できる状態にする
  };

  //絵札のシャッフル
  const setCards = () => {
    shuffle(yomiLists);
    const result = shuffle([...yomiLists]);
    setEfudaLists(result);
  };

  //シャッフル関数
  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  };

  //ローディング画面
  //　以下ゲームスタート以降のコード　＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

  // ゲームをスタートして3秒後にカードを表示
  // 2ターン目以降は0.5秒で問題表示開始
  useEffect(() => {
    const delay = currentTurn === 0 ? 3000 : 500;
    if (!isStarted || currentTurn >= 9) return;
    setTimeout(() => {
      setKaminoku("");
      setKaminokuOriginal(yomiLists[currentTurn].kaminoku);
      setIsRunning(true);
      setIsKaruta(true);
    }, delay);
    // eslint-disable-next-line
  }, [isStarted, currentTurn]);

  //場に対応した読み札を表示（一文字ずつ表示）
  const updateKaminoku = () => {
    if (kaminokuOriginal === "" || isModalOpen) {
      setIsRunning(false);
    } else {
      const letter = kaminokuOriginal.charAt(0);
      const newKaminoku = kaminokuOriginal.slice(1);
      setKaminokuOriginal(newKaminoku);
      setKaminoku(kaminoku + letter);
    }
  };

  // 0.2秒間隔でsetIntervalを呼ぶ
  // 引数は(コールバック関数, 間隔(秒数)/ null)
  useInterval(
    () => {
      // スタート画面の時は何もしない
      if (!isStarted) return;
      updateKaminoku();
    },
    isRunning ? 200 : null
  );

  // ユーザーが絵札を押した時
  const efudaClick = (e) => {
    judge(e.target);
    setModalOpen(true);
    setKaminoku("");
    // TODO ここどうする？
    // setIsKaruta(false);
  };

  // useEffect(() => {
  //   if (!isModalOpen) return;
  //   setTimeout(() => {
  //     setModalOpen(false);
  //     setCurrentTurn(currentTurn + 1);
  //     setKaminoku("");
  //     if (currentTurn < 8) KaminokuOriginal(yomiLists[currentTurn + 1].kaminoku);
  //   }, 2000);
  // }, [isModalOpen]);

  //ユーザーがクリックした札に対する正誤判定
  const judge = (clickedAnswer) => {
    const correctEfudaIndex = efudaLists.findIndex(
      (el) => el.id === yomiLists[currentTurn].id
    );
    if (correctEfudaIndex !== -1) {
      const newArr = [...isAnswered];
      newArr.push(efudaLists[correctEfudaIndex].id);
      setIsAnswered(newArr);
    }
    // 選んだチョイスが正解の場合
    if (clickedAnswer.id === yomiLists[currentTurn].id) {
      // ユーザーのデッキに入れる
      const newUserDeck = userDeck.slice();
      newUserDeck.push(efudaLists[correctEfudaIndex]);
      setUserDeck(newUserDeck);
      //スコアの更新
      setUserScore(userScore + 1);
    } else {
      // 選んだチョイスが不正解の場合
      // CPUのデッキに入れる
      const newCpuDeck = cpuDeck.slice();
      newCpuDeck.push(efudaLists[correctEfudaIndex]);
      setCpuDeck(newCpuDeck);
      //スコアの更新
      setCpuScore(cpuScore + 1);
    }
  };

  //正誤判定に対応したモーダルの表示
  const modalClose = () => {
    if (currentTurn < 8) {
      setModalOpen(false);
      setCurrentTurn((prev) => prev + 1);
    } else if (currentTurn === 8) {
      finishGame();
    }
  };

  //スコア表示
  //取得した（された）絵札を非表示にする
  //モーダルは2秒後に消える
  //次の問題へ移る
  //次の読み札を表示する
  //最終問題までループする
  //勝敗とスコア、ホーム画面へ飛ぶボタンが表示してあるのモーダル表示
  const finishGame = () => {
    setCurrentTurn(currentTurn + 1);
    setModalOpen(true);
  };

  // 初期化（ゲーム終了のモーダルが閉じられる時に発火）
  const initGame = () => {
    setUserDeck([]);
    setCpuDeck([]);
    setUserScore(0);
    setCpuScore(0);
    setIsAnswered([]);
    setCurrentTurn(0);
    setIsKaruta(false);
    setIsStarted(false);
    setModalOpen(false);
  };

  // console.log(currentTurn + 1 + "ターン目 （index " + currentTurn + "）");
  return {
    isStarted,
    isKaruta,
    startGame,
    currentTurn,
    kaminoku,
    cpuScore,
    cpuDeck,
    userScore,
    userDeck,
    efudaLists,
    isAnswered,
    efudaClick,
    isModalOpen,
    modalClose,
    initGame
  };
};
