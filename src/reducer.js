export const initialState = {
  field: Array(9).fill(""),
  currentPlayer: "X",
  isGameEnded: false,
  isDraw: false,
  massiveX: [],
  massiveO: [],
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, field: action.payload };
    case "SET_CURRENT_PLAYER":
      return { ...state, currentPlayer: action.payload };
    case "SET_IS_GAME_ENDED":
      return { ...state, isGameEnded: action.payload };
    case "SET_IS_DRAW":
      return { ...state, isDraw: action.payload };
    case "ADD_X_MOVE":
      return { ...state, massiveX: [...state.massiveX, action.payload] };
    case "ADD_O_MOVE":
      return { ...state, massiveO: [...state.massiveO, action.payload] };
    case "RESET_GAME":
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
