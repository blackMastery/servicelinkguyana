import { combineReducers } from "redux";
import { educationHistory } from './education';
import user from './user';
import jobs from './jobs';
import search from './search'


import { proposal } from './proposal'

export default  combineReducers({
   user,
   jobs,
   proposal,
   search
});