import { useReducer } from 'react';
import {
  formatNumber,
  addDigitOperation,
  chooseOperatorOperation,
  clearOperation,
  allClearOperation,
  deleteDigitOperation,
  negateOperation,
  evaluateOperation,
} from '../utils/calculatorHelper';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATOR: 'choose-operator',
  CLEAR: 'clear',
  ALL_CLEAR: 'all-clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
  NEGATE: 'negate',
};

const ACTIONS_MAP = new Map([
  [ACTIONS.ADD_DIGIT, addDigitOperation],
  [ACTIONS.CHOOSE_OPERATOR, chooseOperatorOperation],
  [ACTIONS.CLEAR, clearOperation],
  [ACTIONS.ALL_CLEAR, allClearOperation],
  [ACTIONS.DELETE_DIGIT, deleteDigitOperation],
  [ACTIONS.NEGATE, negateOperation],
  [ACTIONS.EVALUATE, evaluateOperation],
]);

function reducer(state, { type, payload }) {
  const getAction = ACTIONS_MAP.get(type);
  return getAction === undefined ? state : getAction(state, payload);
}

const useCalculator = () => {
  const initialState = {
    currentResult: '0',
    prevResult: null,
    operator: null,
    equation: null,
  };
  const [{ currentResult, prevResult, operator, equation }, dispatch] =
    useReducer(reducer, initialState);

  return {
    currentResult,
    prevResult,
    operator,
    equation,
    dispatch,
    formatNumber,
  };
};

export default useCalculator;
