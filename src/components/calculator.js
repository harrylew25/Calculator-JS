import React from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import classes from './calculator.module.css';
import CalculatorButton from './calculatorButton';
import useCalculator from '../hooks/useCalculator';
import Constants from './constants';

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
    event.preventDefault();
    setOperationAction(event.target.value);
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
    setNumberAction(event.target.value);
  };

  const decimalPointButtonHandler = (event) => {
    event.preventDefault();
    setDecimalAcion();
  };

  const calculatorButtons = Constants.calculatorButtons;
  const handlersObject = {
    operatorHandler,
    equalButtonHandler,
    clearValueHandler,
    numberButtonHandler,
    decimalPointButtonHandler,
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
            {calculatorButtons.map((button) => {
              return (
                <CalculatorButton
                  key={button.value}
                  value={button.value}
                  onClick={handlersObject[button.onClick]}
                  className={classes[button.className]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Calculator;
