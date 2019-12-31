import { combineReducers } from "redux";
import { educationHistory } from './education';
import user from './user';
import jobs from './jobs';


export default  combineReducers({
   user,
   jobs
});