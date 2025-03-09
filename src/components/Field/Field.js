import React, { Component } from "react";
import { store } from "../../store";
import { connect } from "react-redux";
import {
  ADD_O_MOVE,
  ADD_X_MOVE,
  newGame,
  setCurrentPlayer,
  setField,
  setIsDraw,
  setIsGameEnded,
} from "../../actions";

class FieldLayout extends Component {
  render() {
    const { field, moveButton, resetGame } = this.props;
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <div className="grid grid-cols-3 gap-1">
          {field.map((item, index) => (
            <button
              onClick={() => moveButton(index)}
              className="w-10 h-10 text-xl text-center cursor-pointer border border-gray-500 flex items-center justify-center"
              key={index}
            >
              {item}
            </button>
          ))}
        </div>
        <button
          onClick={resetGame}
          className="text-lg mt-7 w-48 h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Начать заново
        </button>
      </div>
    );
  }
}

class FieldContainer extends Component {
  moveButton = (index) => {
    const { isGameEnded, currentPlayer, field, massiveO, massiveX, dispatch } =
      this.props;

    if (isGameEnded || field[index] !== "") {
      if (isGameEnded) {
        alert("Игра завершена! Нажмите 'Начать заново', чтобы сыграть снова.");
      }
      return;
    }

    const updatedField = field.map((item, i) =>
      i === index ? currentPlayer : item
    );

    const checkWinner = (moves) => {
      const WIN_PATTERNS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      return WIN_PATTERNS.some((pattern) =>
        pattern.every((idx) => moves.includes(idx))
      );
    };

    // Добавляем ход в массив и проверяем победителя
    if (currentPlayer === "X") {
      dispatch(ADD_X_MOVE(index));
      if (checkWinner([...massiveX, index])) {
        dispatch(setField(updatedField));
        setTimeout(() => dispatch(setIsGameEnded()), 0);
        return;
      }
    } else {
      store.dispatch(ADD_O_MOVE(index));
      if (checkWinner([...massiveO, index])) {
        dispatch(setField(updatedField));
        setTimeout(() => dispatch(setIsGameEnded()), 0);
        return;
      }
    }

    // Проверка на ничью
    if (updatedField.every((cell) => cell !== "")) {
      dispatch(setField(updatedField));
      setTimeout(() => dispatch(setIsDraw()), 0);
      return;
    }
    dispatch(setCurrentPlayer(currentPlayer));

    // Обновляем поле и переключаем игрока
    dispatch(setField(updatedField));
  };

  resetGame = () => {
    this.props.dispatch(newGame());
  };

  render() {
    const { field } = this.props;
    return (
      <FieldLayout
        field={field}
        moveButton={this.moveButton}
        resetGame={this.resetGame}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer,
  isGameEnded: state.isGameEnded,
  field: state.field,
  massiveO: state.massiveO,
  massiveX: state.massiveX,
});

export const Field = connect(mapStateToProps)(FieldContainer);
