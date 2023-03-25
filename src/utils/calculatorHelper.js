const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0,
});

const negate = (strResult) => {
  if (strResult.includes('-')) {
    return strResult.slice(1);
  }
  return '-' + strResult;
};

const preformMathOperation = (prev, current) => {
  return {
    '+': () => prev + current,
    '-': () => prev - current,
    '*': () => prev * current,
    '/': () => (prev === 0 ? 0 : prev / current),
  };
};

const evaluate = ({ currentResult, prevResult, operator }) => {
  let tempResult = 0;
  const prev = parseFloat(prevResult);
  const current = parseFloat(currentResult);
  const operation = preformMathOperation(prev, current)[operator];

  tempResult =
    operation === undefined ? (current ? current : prev) : operation();
  return tempResult.toString();
};

export const addDigitOperation = (state, payload) => {
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
};
export const chooseOperatorOperation = (state, payload) => {
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
};
export const clearOperation = (state) => {
  return { ...state, currentResult: '0' };
};
export const allClearOperation = (state) => ({
  ...state,
  equation: null,
  currentResult: '0',
  prevResult: null,
  operator: null,
  overwrite: false,
});
export const deleteDigitOperation = (state) => {
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
};
export const negateOperation = (state) => {
  if (state.currentResult === '0' || state.currentResult == null) {
    return state;
  }
  return {
    ...state,
    currentResult: negate(state.currentResult),
  };
};
export const evaluateOperation = (state) => {
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
};

export const formatNumber = (numbers) => {
  if (numbers == null) return null;
  const [integer, decimal] = numbers.split('.');
  if (decimal == null) {
    return INTEGER_FORMATTER.format(integer);
  }
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
};
