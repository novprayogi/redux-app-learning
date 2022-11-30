const redux = require("redux");
const axios = require("axios");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunk = require("redux-thunk").default;

// action
const FETCH_USER_REQ = "FETCH_USER_REQ";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_ERROR = "FETCH_USER_ERROR";

//state
const initialUser = {
  loading: false,
  user: [],
  error: "",
};

// function action
const fetchUserReq = () => {
  return {
    type: FETCH_USER_REQ,
  };
};

const fetchUserSuccess = (user) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  };
};

const fetchUserError = (error) => {
  return {
    type: FETCH_USER_ERROR,
    payload: error,
  };
};

// reducer
const userReducer = (state = initialUser, action) => {
  switch (action.type) {
    case FETCH_USER_REQ:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: "",
      };
    case FETCH_USER_ERROR:
      return {
        loading: false,
        user: [],
        error: action.payload,
      };
  }
};

const fetchUser = () => {
  return (dispatch) => {
    dispatch(fetchUserReq());
    axios
      .get("https://jsonplaceholder.typicode.com/users", {
        headers: {
          // jalankn encoding agar data bisa di encode
          "Accept-Encoding": "application/json",
        },
      })
      .then((response) => {
        // console.log(response);
        dispatch(fetchUserSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(fetchUserError(error.message));
      });
  };
};

const store = createStore(userReducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUser());
