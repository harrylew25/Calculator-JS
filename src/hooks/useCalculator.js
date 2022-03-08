import { useReducer } from 'react';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATOR: 'choose-operator',
  CLEAR: 'clear',
  ALL_CLEAR: 'all-clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
  NEGATE: 'negate',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentResult: payload.digit,
          overwrite: false,
          equation: null,
        };
      }
      if (payload.digit === '0' && state.currentResult === '0') {
        return state;
      }
      if (payload.digit === '.' && state.currentResult.includes('.')) {
        return state;
      }

      return {
        ...state,
        currentResult: `${state.currentResult || ''}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATOR:
      if (state.equation != null) {
        return {
          ...state,
          equation: null,
          operator: payload.operator,
          prevResult: state.currentResult,
          currentResult: null,
        };
      }
      if (state.currentResult == null && state.prevResult == null) {
        return state;
      }
      if (state.currentResult == null) {
        return {
          ...state,
          operator: payload.operator,
        };
      }
      if (state.prevResult == null) {
        return {
          ...state,
          operator: payload.operator,
          prevResult: state.currentResult,
          currentResult: null,
        };
      }

      return {
        ...state,
        prevResult: evaluate(state),
        operator: payload.operator,
        currentResult: null,
      };

    case ACTIONS.CLEAR:
      return { ...state, currentResult: '0' };

    case ACTIONS.ALL_CLEAR:
      return {
        ...state,
        equation: null,
        currentResult: '0',
        prevResult: null,
        operator: null,
        overwrite: false,
      };

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentResult: null,
          equation: null,
        };
      }
      if (state.currentResult == null) {
        return state;
      }
      if (state.currentResult.length === 1) {
        return { ...state, currentResult: '0' };
      }
      return { ...state, currentResult: state.currentResult.slice(0, -1) };

    case ACTIONS.NEGATE:
      if (state.currentResult === '0' || state.currentResult == null) {
        return state;
      }
      return {
        ...state,
        currentResult: negate(state.currentResult),
      };

    case ACTIONS.EVALUATE:
      if (
        state.operator == null ||
        state.currentResult == null ||
        state.prevResult == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        prevResult: null,
        operator: null,
        equation: `${formatNumber(state.prevResult)} ${
          state.operator
        } ${formatNumber(state.currentResult)}`,
        currentResult: evaluate(state),
      };

    default:
      return state;
  }
}

function evaluate({ currentResult, prevResult, operator }) {
  let tempResult = 0;
  const prev = parseFloat(prevResult);
  const current = parseFloat(currentResult);

  switch (operator) {
    case '+':
      tempResult = prev + current;
      break;
    case '-':
      tempResult = prev - current;
      break;
    case '*':
      tempResult = prev * current;
      break;
    case '/':
      if (prev !== 0) {
        tempResult = prev / current;
      } else {
        return 0;
      }
      break;
    default:
      tempResult = current ? current : prev;
  }
  return tempResult.toString();
}

function negate(strResult) {
  if (strResult.includes('-')) {
    return strResult.slice(1);
  }
  return '-' + strResult;
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0,
});

function formatNumber(numbers) {
  if (numbers == null) return null;
  const [integer, decimal] = numbers.split('.');
  if (decimal == null) {
    return INTEGER_FORMATTER.format(integer);
  }
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

const useCalculator = () => {
  const [{ currentResult, prevResult, operator, equation }, dispatch] =
    useReducer(reducer, {
      currentResult: '0',
      prevResult: null,
      operator: null,
      equation: null,
    });

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
