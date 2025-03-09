import React, { Component } from "react";
import { connect } from "react-redux";

class InformationLayout extends Component {
  render() {
    const { isDraw, isGameEnded, currentPlayer } = this.props;
    return (
      <div className="m-5 text-xl font-semibold">
        Текущий ход:{" "}
        {isDraw === true
          ? "Ничья"
          : isGameEnded
          ? `Победа ${currentPlayer === "0" ? "O" : "X"}`
          : `Ходит ${currentPlayer}`}
      </div>
    );
  }
}

class InformationContainer extends Component {
  render() {
    const { isDraw, isGameEnded, currentPlayer } = this.props;
    return (
      <InformationLayout
        isDraw={isDraw}
        isGameEnded={isGameEnded}
        currentPlayer={currentPlayer}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isDraw: state.isDraw,
  isGameEnded: state.isGameEnded,
  currentPlayer: state.currentPlayer,
});

export const Information = connect(mapStateToProps)(InformationContainer);