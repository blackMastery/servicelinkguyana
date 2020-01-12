import { combineReducers } from "redux";
import { educationHistory } from './education';
import user from './user';
import jobs from './jobs';


import { proposal } from './proposal'

export default  combineReducers({
   user,
   jobs,
   proposal
});