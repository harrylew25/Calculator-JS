import { useState } from 'react';

//move all action handler into this file
const useCalculator = () => {
  const [result, setResult] = useState(0);
  const [number, setNumber] = useState(0);
  const [operator, setOperator] = useState('');

  const operationAction = (operatorValue) => {
    setOperator(operatorValue);
    setNumber((prev) => {
      setResult((prevResult) => {
        return prev ? prev : prevResult; //might want to revisit this
      });
      return null; // change the value to null to clear the first value
    });
  };

  const setEqualAction = () => {
    let tempResult = 0;

    switch (operator) {
      case '+':
        tempResult = Number(result) + Number(number);
        break;
      case '-':
        tempResult = Number(result) - Number(number);
        break;
      case '*':
        tempResult = Number(result) * Number(number);
        break;
      case '/':
        if (number !== 0) {
          tempResult = Number(result) / Number(number);
        } else {
          return 0;
        }
        break;
      default:
        tempResult = number ? number : result;
    }
    setResult(tempResult);
    setNumber(null);
    setOperator('');
  };

  const setNumberAction = (inputNumber) => {
    setNumber((prev) => {
      let temp = 0;
      if (prev === 0 && inputNumber === 0) {
        temp = 0;
      } else if (prev === 0 && inputNumber !== 0) {
        temp = Number(prev + inputNumber);
      } else {
        temp = prev === null ? inputNumber : prev + inputNumber;
      }
      return temp;
    });
  };
  const addingDecimalToValue = () => {
    setNumber((prev) => {
      return !prev.toString().includes('.') ? prev + '.' : prev;
    });
  };
  const clearValue = () => {
    setNumber(0);
    setResult(0);
    setOperator('');
  };
  return {
    number,
    result,
    setEqualAction,
    setNumberAction,
    operationAction,
    addingDecimalToValue,
    clearValue,
  };
};

export default useCalculator;
