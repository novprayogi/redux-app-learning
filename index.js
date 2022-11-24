const redux = require("redux");
const createStore = redux.createStore;
// multiple reducer
const combineReducer = redux.combineReducers;

// action
const BUY_SHOES = "BUY_SHOES";
const BUY_GLOVES = "BUY_GLOVES";

// state
const initialShoes = {
  stockShoes: 50,
};

const initialGloves = {
  stockGloves: 10,
};

// reducer
const shoesReducer = (state = initialShoes, action) => {
  switch (action.type) {
    case BUY_SHOES:
      return {
        ...state,
        stockShoes: state.stockShoes - 2,
      };
    default:
      return state;
  }
};
const glovesReducer = (state = initialGloves, action) => {
  switch (action.type) {
    case BUY_GLOVES:
      return {
        ...state,
        stockGloves: state.stockGloves - 1,
      };
    default:
      return state;
  }
};

// variable penggabungan combineReducer
const rootReducer = combineReducer({
  shoes: shoesReducer,
  gloves: glovesReducer,
});
const store = createStore(rootReducer);

// fungsinya untuk memantau perubahan
const unsub = store.subscribe(() => console.log("Jalankn subscribe", store.getState()));

// fungsi yg dijalankn
store.dispatch({ type: BUY_SHOES });
store.dispatch({ type: BUY_GLOVES });
// unsub();
// store.dispatch({ type: BUY_SHOES });
// store.dispatch({ type: BUY_SHOES });

console.log(store.getState());
