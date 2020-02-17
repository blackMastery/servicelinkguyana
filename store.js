import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { createLogger } from 'redux-logger'
// import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import reducer from './reducer'

// APP STATE
const initState = {
    islogin: false,
    isActive: false,
    // usertype: service provider | client
    serviceProvider: {},
    client: {},
    loadingJobs: false,
    educationHistory: [],
    serviceReviews: [],
    jobs: [],


  }

  

export const actionTypes = {
         ADD_EDUCATION: "ADD_EDUCATION"
};


export const addEducation = () => dispatch => {
    return dispatch({type: actionTypes.ADD_EDUCATION, education})
}


const middlewares = [thunkMiddleware, createLogger()]

const persistConfig = {
  key: "primary",
  storage,
  whitelist: ["user","app"] // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const initializeStore = (state = initState) => {
         return createStore(
           persistedReducer,
           state,
           composeWithDevTools(applyMiddleware(...middlewares))
         );
       };