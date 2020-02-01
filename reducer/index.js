import { combineReducers } from "redux";
import { educationHistory } from './education';
import user from './user';
import jobs from './jobs';
import search from './search'
import types from  '../actions/actionTypes';
import * as R from 'ramda'

import { proposal } from './proposal'

const initialState = {
   viewAsOthers: false,
} 

function app(state=initialState, action){

   switch(action){
      case types.VIEW_AS_OTHERS:
         return R.merge(state, {viewAsOthers: !state.viewAsOthers})
      default:
         return state
   }
}



export default  combineReducers({
   user,
   jobs,
   proposal,
   search,
   app
});