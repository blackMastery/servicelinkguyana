import types from '../actions/actionTypes';
import * as R from 'ramda';



const initialState = {
    searchResults: [],
    recentSearch:[],
    searchView: false,
    searchError:{},
    searching: false,
    remaining:0,
    page:0,
    resultsLength: 0
}


export default (state=initialState, action) => {
    switch(action.type){
        case types.ADD_SEARCH:
            const {q} = action;
            if(state.recentSearch.includes(q)){
                return state
            }
            return R.merge(state, {recentSearch: [...state.recentSearch, q]})
        case types.JOB_SEARCH:
            const { remaining,
                page, resultsLength,
                 jobs } = action;
                 
            return R.merge(state,{
                remaining,
                searchView: true,
                searchResults: [...jobs],
                page,
                resultsLength,

            })

        case types.SEARCHING:
            return R.merge(state, {searching: true})
        case types.SAVE_SEARCH:
            const { url } = action;
            return R.merge(state, {url})
        case types.SEARCH_COMPLETE:
            return R.merge(state, {searching: false})
        case types.SEARCH_ERROR:
            return R.merge(state, {searchError: action.error})    
        case types.TURN_OFF_SEARCH_VIEW:
            return R.merge(state, {searchView: false})
            default:
            return state;

    }
}