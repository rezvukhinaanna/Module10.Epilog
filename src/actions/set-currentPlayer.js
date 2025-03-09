export const setCurrentPlayer = (currentPlayer) => ({
    type: "SET_CURRENT_PLAYER",
    payload: currentPlayer === "X" ? "0" : "X",
  })