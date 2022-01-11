import React from 'react';
import { useState } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import classes from './calculator.module.css';
import CalculatorButton from './calculatorButton';

const Calculator = () => {
  let temp = 0;
  const [result, setResult] = useState(0);
  const [number, setNumber] = useState(0);
  const [operator, setOperator] = useState('');

  const operatorHandler = (event) => {
    setOperator(event.target.value);
    setNumber((prev) => {
      setResult((prevResult) => {
        return prev ? prev : prevResult;
      });
      return 0;
    });
  };

  const equalButtonHandler = (event) => {
    //calculation happen on here
    event.preventDefault();
    switch (operator) {
      case '+':
        temp = Number(result) + Number(number);
        break;
      case '-':
        temp = result - number;
        break;
      case '*':
        temp = result * number;
        break;
      case '/':
        temp = result / number;
        break;
      default:
        temp = number ? number : result;
    }
    setResult(temp);
    setNumber(0);
    setOperator('');
  };
  const clearValue = () => {
    setNumber(0);
    setResult(0);
    setOperator('');
  };

  const numberButtonHandler = (event) => {
    event.preventDefault();
    const currentNum = event.target.value;
    setNumber((prev) => {
      let temp = 0;
      if (prev === 0 && currentNum === 0) {
        temp = 0;
      } else if (prev % 1 === 0 && currentNum !== 0) {
        temp = Number(prev + currentNum); // becomes a number
      } else {
        temp = prev + currentNum; //concatting 2 strings
      }
      return temp;
    });
  };

  const decimalPointButtonHandler = (event) => {
    event.preventDefault();

    setNumber((prev) => {
      return !prev.toString().includes('.') ? prev + '.' : prev;
    });
  };

  return (
    <Fragment>
      <h1>This is my calculator</h1>
      <div className={classes.calculator}>
        <div>
          <div className={classes.inputDisplay}>{number ? number : result}</div>
          <div className={classes.buttonContainer}>
            <CalculatorButton
              value="+"
              onClick={operatorHandler}
              className="operator"
            />
            <CalculatorButton
              value="-"
              onClick={operatorHandler}
              className="operator"
            />
            <CalculatorButton
              value="*"
              onClick={operatorHandler}
              className="operator"
            />
            <CalculatorButton
              value="/"
              onClick={operatorHandler}
              className="operator"
            />
            <CalculatorButton
              value="7"
              onClick={numberButtonHandler}
              className="number"
            />
            <CalculatorButton
              value="8"
              onClick={numberButtonHandler}
              className="number"
            />
            <CalculatorButton
              value="9"
              onClick={numberButtonHandler}
              className="number"
            />
            <CalculatorButton
              value="4"
              onClick={numberButtonHandler}
              className="number"
            />
            <CalculatorButton
              value="5"
              onClick={numberButtonHandler}
              className="number"
            />
            <CalculatorButton
              value="6"
              onClick={numberButtonHandler}
              className="number"
            />
            <CalculatorButton
              value="1"
              onClick={numberButtonHandler}
              className="number"
            />
            <CalculatorButton
              value="2"
              onClick={numberButtonHandler}
              className="number"
            />
            <CalculatorButton
              value="3"
              onClick={numberButtonHandler}
              className="number"
            />
            <CalculatorButton
              value="0"
              onClick={numberButtonHandler}
              className="number"
            />
            <CalculatorButton
              value="."
              onClick={decimalPointButtonHandler}
              className="number"
            />
            <CalculatorButton
              value="C"
              onClick={clearValue}
              className="operator"
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
