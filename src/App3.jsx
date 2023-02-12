import React, { useEffect, useState } from "react";
import { useRef } from "react";
const CommandKaruta = () => {
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
  // const [getEfuda, setGetEfuda] = useState(0); //取得した絵札を画面右下にセットするための管理
  const [userScore, setUserScore] = useState(0); //ユーザーのスコア管理
  const [cpuScore, setCpuScore] = useState(0); //CPUのスコア管理
  const [showModal, setShowModal] = useState(false); //正誤判定後のモーダル管理
  const [isStarted, setIsStarted] = useState(false); //ゲーム開始ボタンの管理
  const [isKaruta, setIsKaruta] = useState(false); //絵札一覧の表示・非表示の管理
  const [isAnswered, setIsAnswered] = useState([]); //絵札クリックの可否を管理
  const [oneCharactor, setOneCharactor] = useState(""); //読み札の表示管理（1文字ずつ）
  const [currentTurn, setCurrentTurn] = useState(0); //ターンカウント
  const [userAcquiredCards, setUserAcquiredCards] = useState([]); //ユーザーが取得した絵札の管理
  const [cpuAcquiredCards, setCpuAcquiredCards] = useState([]); //CPUが取得した絵札の管理
  //ゲームスタート
  const startGame = () => {
    setCards();
    setIsStarted(true);
    setIsKaruta(true);
    readYomifuda(currentTurn);
  };

  console.log(isAnswered);
  //ローディング画面
  //ゲーム画面に移る
  //データ（カルタオブジェクト）の取得
  //データのランダム選択（問題数分）
  //絵札のシャッフル
  const setCards = () => {
    shuffle(yomiLists);
    const result = shuffle([...yomiLists]);
    setEfudaLists(result);
  };
  //絵札の配置
  //3秒待つ
  //場に対応した読み札を表示（一文字ずつ表示）
  //とりあえず一問ずつ取得する
  // // find関数で最初のyomiListsの最初の要素だけを取得する
  const showYomifuda = yomiLists[currentTurn];
  const readYomifuda = () => {
    console.log(showYomifuda);
  };
  //ユーザーがクリックした札に対する正誤判定
  //スコアの更新
  //正誤判定に対応したモーダルの表示
  //スコア表示
  //取得した（された）絵札を非表示にする
  //モーダルは2秒後に消える
  //次の問題へ移る
  //次の読み札を表示する
  //最終問題までループする
  //勝敗とスコア、ホーム画面へ飛ぶボタンが表示してあるのモーダル表示
  //関数
  //シャッフル関数
  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  };
  // console.log(currentTurn,"this");
  console.log(efudaLists);
  const judge = (clickId) => {
    const index = efudaLists.findIndex(
      (efuda) => efuda.id === yomiLists[currentTurn].id
    );
    console.log(index, " index");
    const isAnswerdCopy = [...isAnswered];
    isAnswerdCopy.push(efudaLists[index].id);
    setIsAnswered(isAnswerdCopy);
    if (clickId === yomiLists[currentTurn].id) {
      setUserScore(userScore + 1);
      const tempStorage = efudaLists[index].answer;
      const acquiredCardCopy = [...userAcquiredCards];
      acquiredCardCopy.push(tempStorage);
      setUserAcquiredCards(acquiredCardCopy);
    } else {
      setUserScore(userScore + 1);
      const tempStorage = efudaLists[index].answer;
      const acquiredCardCopy = [...cpuAcquiredCards];
      acquiredCardCopy.push(tempStorage);
      setCpuAcquiredCards(acquiredCardCopy);
    }
  };
  const efudaClick = (e) => {
    console.log(e.target);
    judge(e.target.id);
    console.log(e.target.id);
    //次の問題へ
    setCurrentTurn(currentTurn + 1);
  };
  //問題文の表示
  return (
    <>
      <div>
        {isStarted ? (
          <button>ゲーム中</button>
        ) : (
          <button onClick={() => startGame()}>ゲーム開始</button>
        )}
      </div>

      <div>
        {isKaruta && (
          <div>
            <p>{showYomifuda.kaminoku}</p>
            <p>{showYomifuda.simonoku}</p>
          </div>
        )}
      </div>

      <div>
        {cpuScore}
        {cpuAcquiredCards}
      </div>

      <div>
        {isKaruta && (
          <ul className="flex wrap field">
            {currentTurn < 9 &&
              efudaLists
                .filter((answeredElm) => !isAnswered.includes(answeredElm.id))
                .map((efuda) => (
                  <div key={efuda.id}>
                    {/* <p>{}</p> */}
                    {/* <Field efuda={efuda} efudaClick={efudaClick} /> */}
                    <button onClick={(e) => efudaClick(e)} id={efuda.id}>
                      {efuda.answer}
                    </button>
                  </div>
                ))}
          </ul>
        )}
      </div>

      <div>
        {userScore}
        {userAcquiredCards}
      </div>
    </>
  );
};
export default CommandKaruta;
