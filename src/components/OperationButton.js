import { ACTIONS } from '../hooks/useCalculator';

export default function OperationButton({ dispatch, operator, className }) {
  return (
    <button
      className={className}
      onClick={() => {
        dispatch({ type: ACTIONS.CHOOSE_OPERATOR, payload: { operator } });
      }}
    >
      {operator}
    </button>
  );
}
