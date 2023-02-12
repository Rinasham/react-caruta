export const Kaminoku = ({ currentTurn, kaminoku }) => {
  return (
    <div className="flex kaminoku">
      <p>{currentTurn < 9 && kaminoku} </p>
    </div>
  );
};
