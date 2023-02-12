export const CpuDeck = ({ cpuScore, deck }) => {
  return (
    <div className="flex cpu-deck">
      <div className="cpu-score-circle">
        <p>{cpuScore > 0 ? cpuScore : 0}</p>
      </div>
      <div className="flex wrap cpu-cards">
        {deck.map((card, id) => {
          return <button key={card.id}>{card.answer}</button>;
        })}
      </div>
    </div>
  );
};
