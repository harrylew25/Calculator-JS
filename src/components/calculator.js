import React from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import classes from './calculator.module.css';
import CalculatorButton from './calculatorButton';
import useCalculator from '../hooks/useCalculator';

const Calculator = () => {
  const {
    number: newNumber,
    result: newResult,
    setEqualAction,
    setNumberAction,
    operationAction: setOperationAction,
    addingDecimalToValue: setDecimalAcion,
    clearValue,
  } = useCalculator();

  const operatorHandler = (event) => {
    const newOperator = event.target.value;
    setOperationAction(newOperator);
  };

  const equalButtonHandler = (event) => {
    event.preventDefault();
    setEqualAction();
  };
  const clearValueHandler = (event) => {
    event.preventDefault();
    clearValue();
  };

  const numberButtonHandler = (event) => {
    event.preventDefault();
    console.error(event.target.value);
    setNumberAction(event.target.value);
  };

  const decimalPointButtonHandler = (event) => {
    event.preventDefault();
    setDecimalAcion();
  };

  return (
    <Fragment>
      <h1>This is my calculator</h1>
      <div className={classes.calculator}>
        <div>
          <div className={classes.inputDisplay}>
            {newNumber || newNumber === 0 ? newNumber : newResult}
          </div>
          <div className={classes.buttonContainer}>
            <CalculatorButton
              value="+"
              onClick={operatorHandler}
              className={classes.operator}
            />
            <CalculatorButton
              value="-"
              onClick={operatorHandler}
              className={classes.operator}
            />
            <CalculatorButton
              value="*"
              onClick={operatorHandler}
              className={classes.operator}
            />
            <CalculatorButton
              value="/"
              onClick={operatorHandler}
              className={classes.operator}
            />
            <CalculatorButton
              value="7"
              onClick={numberButtonHandler}
              className={classes.number}
            />
            <CalculatorButton
              value="8"
              onClick={numberButtonHandler}
              className={classes.number}
            />
            <CalculatorButton
              value="9"
              onClick={numberButtonHandler}
              className={classes.number}
            />
            <CalculatorButton
              value="4"
              onClick={numberButtonHandler}
              className={classes.number}
            />
            <CalculatorButton
              value="5"
              onClick={numberButtonHandler}
              className={classes.number}
            />
            <CalculatorButton
              value="6"
              onClick={numberButtonHandler}
              className={classes.number}
            />
            <CalculatorButton
              value="1"
              onClick={numberButtonHandler}
              className={classes.number}
            />
            <CalculatorButton
              value="2"
              onClick={numberButtonHandler}
              className={classes.number}
            />
            <CalculatorButton
              value="3"
              onClick={numberButtonHandler}
              className={classes.number}
            />
            <CalculatorButton
              value="0"
              onClick={numberButtonHandler}
              className={classes.number}
            />
            <CalculatorButton
              value="."
              onClick={decimalPointButtonHandler}
              className={classes.number}
            />
            <CalculatorButton
              value="C"
              onClick={clearValueHandler}
              className={classes.operator}
            />
            <CalculatorButton
              value="="
              onClick={equalButtonHandler}
              className={classes.equal}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Calculator;
