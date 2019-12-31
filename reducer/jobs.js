import types from  '../actions/actionTypes';



const  initialState = {
    isFetching: false,
    jobs: [],
    remaining: 0,
    numofJobs: 0,
    resultsLength: 0,
    page: 0
};


const jobs = ( state =initialState, action ) => {
    switch(action.type){
        case types.LOAD_JOBS:
            const { remaining, numofJobs, resultsLength, page } = action
            return Object.assign({}, state, 
                {jobs: [ ...action.jobs] },
                    {remaining, numofJobs, resultsLength, page}
                );
        case types.FETCHING_JOBS:
            return Object.assign({}, state, {isFetching: !state.isFetching})
        default:
            return state;

    }
}

export default jobs;




