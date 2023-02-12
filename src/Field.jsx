export const Field = ({ efuda, efudaClick }) => {
  return (
    <button className="card" onClick={(e) => efudaClick(e)} id={efuda.id}>
      {efuda.answer}
    </button>
  );
};
