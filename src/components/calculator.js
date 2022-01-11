import React from 'react';
import { useState } from 'react';
import classes from './calculator.module.css';
import CalculatorButton from './calculatorButton';

const Calculator = () => {
  let temp = 0;
  const [result, setResult] = useState(0);
  const [firstValue, setFirstValue] = useState(0);
  const [operator, setOperator] = useState('');

  const operatorHandler = (event) => {
    setOperator(event.target.value);
    setFirstValue((prev) => {
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
        temp = Number(result) + Number(firstValue);
        break;
      case '-':
        temp = result - firstValue;
        break;
      case '*':
        temp = result * firstValue;
        break;
      case '/':
        temp = result / firstValue;
        break;
      default:
        temp = firstValue ? firstValue : result;
    }
    setResult(temp);
    setFirstValue(0);
    setOperator('');
  };
  const clearValue = () => {
    setFirstValue(0);
    setResult(0);
    setOperator('');
  };

  const numberButtonHandler = (event) => {
    event.preventDefault();
    const currentNum = event.target.value;
    setFirstValue((prev) => {
      let temp = 0;
      if (prev === 0 && currentNum === 0) {
        temp = 0;
      } else if (prev === 0 && currentNum !== 0) {
        temp = Number(prev + currentNum); // becomes a number
      } else {
        temp = prev + currentNum; //concatting 2 strings
      }
      return temp;
    });
  };

  return (
    <div className={classes.calculator}>
      <h1>This is my calculator</h1>
      <div>
        <div className={classes.inputDisplay}>{firstValue}</div>
        <div>{result}</div>
        <div>
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
            value="="
            onClick={equalButtonHandler}
            className="operator"
          />
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
            <CalculatorButton
              value="0"
              onClick={numberButtonHandler}
              className="number"
            />
            <CalculatorButton
              value="."
              onClick={numberButtonHandler}
              className="number"
            />
            <CalculatorButton
              value="C"
              onClick={clearValue}
              className="operator"
            />
          </div>
        </div>

        <h3>Result is {result}</h3>
      </div>
    </div>
  );
};

export default Calculator;
