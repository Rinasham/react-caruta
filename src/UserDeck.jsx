export const UserDeck = ({ userScore, deck }) => {
  return (
    <div className="flex user-deck">
      <div className="user-score-circle">
        <p>{userScore}</p>
      </div>
      <div className="flex wrap user-cards">
        {deck.map((card, id) => {
          return <button key={card.id}>{card.answer}</button>;
        })}
      </div>
    </div>
  );
};
