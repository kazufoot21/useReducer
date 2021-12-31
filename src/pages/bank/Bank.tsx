import React, { useState, useReducer } from 'react';
import styles from './Bank.module.scss';

type State = {
  savings: number;
  histories: { operation: string; amout: number }[];
};

type Action =
  | { type: 'DEPOSIT'; payload: number }
  | { type: 'WITHDRAW'; payload: number };

const initialState = {
  savings: 100000,
  histories: [],
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'DEPOSIT':
      return {
        ...state,
        savings: state.savings + action.payload,
        histories: [
          ...state.histories,
          { operation: '預け入れ', amout: action.payload },
        ],
      };
    case 'WITHDRAW':
      return {
        ...state,
        savings: state.savings - action.payload,
        histories: [
          ...state.histories,
          { operation: '引き出し', amout: action.payload },
        ],
      };
    default:
      return state;
  }
};

export const Bank: React.VFC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [amout, setAmout] = useState<number>(0);

  const onDeposit = (amout: number) => {
    dispatch({ type: 'DEPOSIT', payload: amout });
    setAmout(0);
  };
  const onWithdraw = (amout: number) => {
    dispatch({ type: 'WITHDRAW', payload: amout });
    setAmout(0);
  };

  return (
    <div>
      <h4>残高:{state.savings.toLocaleString()}円</h4>
      <div className={styles.operationArea}>
        <div>
          <input
            value={amout}
            onChange={(e) => setAmout(Number(e.target.value))}
            type="number"
          />
          <span>円</span>
          <div className={styles.buttons}>
            <button onClick={() => onDeposit(amout)}>預け入れ</button>
            <button onClick={() => onWithdraw(amout)}>引き出し</button>
          </div>
        </div>
      </div>
      <div className={styles.history}>
        <h4>履歴</h4>
        {state.histories.map((history, index) => {
          return history.operation === '引き出し' ? (
            <p key={index} className={styles.withdraw}>
              {history.operation} : {history.amout.toLocaleString()}円
            </p>
          ) : (
            <p key={index} className={styles.deposit}>
              {history.operation} : {history.amout.toLocaleString()}円
            </p>
          );

          // --------------------------------------
          // return (
          //   <p key={index}>

          //     {history.operation} : {history.amout.toLocaleString()}円
          //   </p>
          // );
        })}
      </div>
    </div>
  );
};
