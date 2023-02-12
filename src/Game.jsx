import { Modal } from "./Modal";
import { UserDeck } from "./UserDeck";
import { CpuDeck } from "./CpuDeck";
import { Field } from "./Field";

import "./App.css";
import { useApp } from "./useApp";
import { Kaminoku } from "./Kaminoku";

const Game = () => {
  const {
    isStarted,
    isKaruta,
    startGame,
    currentTurn,
    cpuScore,
    cpuDeck,
    userScore,
    userDeck,
    efudaLists,
    kaminoku,
    isAnswered,
    efudaClick,
    isModalOpen,
    modalClose,
    initGame
  } = useApp();

  //問題文の表示
  return (
    <div className="wrapper">
      {!isStarted && (
        <div className="start-screen">
          <button className="start-button" onClick={() => startGame()}>
            ゲーム開始
          </button>
        </div>
      )}

      {isKaruta && (
        <div className="game-screen">
          <Kaminoku currentTurn={currentTurn} kaminoku={kaminoku} />
          <CpuDeck cpuScore={cpuScore} deck={cpuDeck} />
          <div className="flex wrap field">
            {currentTurn < 9 &&
              efudaLists
                .filter((answeredElm) => !isAnswered.includes(answeredElm.id))
                .map((efuda) => (
                  <div key={efuda.id}>
                    <Field efuda={efuda} efudaClick={efudaClick} />
                  </div>
                ))}
          </div>
          <UserDeck userScore={userScore} deck={userDeck} />
        </div>
      )}
      {isModalOpen ? (
        currentTurn < 9 ? (
          <Modal modalClose={modalClose}>問題の解説</Modal>
        ) : (
          <Modal modalClose={initGame}>終わり</Modal>
        )
      ) : (
        ""
      )}
    </div>
  );
};
export default Game;
