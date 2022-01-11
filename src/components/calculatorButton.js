const CalculatorButton = (props) => {
  const { value, onClick, className, disabled = false } = props;
  return (
    <button
      value={value}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default CalculatorButton;
