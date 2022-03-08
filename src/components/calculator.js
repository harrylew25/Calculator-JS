import React from 'react';
import './calculator.css';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import useCalculator, { ACTIONS } from '../hooks/useCalculator';

const Calculator = () => {
  const {
    currentResult,
    prevResult,
    operator,
    equation,
    dispatch,
    formatNumber,
  } = useCalculator();

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {equation != null
            ? equation
            : prevResult === null
            ? ''
            : `${formatNumber(prevResult)} ${operator}`}
        </div>
        <div className="current-operand">{formatNumber(currentResult)}</div>
      </div>
      <button onClick={() => dispatch({ type: ACTIONS.ALL_CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>C</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.NEGATE })}>+/-</button>
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operator="/" dispatch={dispatch} />

      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operator="*" dispatch={dispatch} />

      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operator="-" dispatch={dispatch} />

      <DigitButton digit="0" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <button onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
      <OperationButton operator="+" dispatch={dispatch} />
    </div>
  );
};

export default Calculator;
