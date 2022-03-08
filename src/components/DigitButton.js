import { ACTIONS } from '../hooks/useCalculator';

const DigitButton = ({ digit, dispatch }) => {
  return (
    <button
      onClick={() => {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
      }}
    >
      {digit}
    </button>
  );
};

export default DigitButton;
