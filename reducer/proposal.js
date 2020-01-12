import types from '../actions/actionTypes';
import * as R from 'ramda'





const initialState = {
    proposals:[

    ],
    error: {
        type: "",
        message: ""
    },
    submittedProposal:{    
    "hourRate": 0,
    "provider": "",
    "job": "",
    "coverLetter": "",
    "est": ""
}

}




const submitted = (state={} , action) => {

    switch(action.type){
        case types.HOUR_RATE:
            // const {hourRate} = action;
            return Object.assign({},state, { hourRate: action.hourRate })
        case  types.COVERLETTER:
            const { coverLetter } = action
            return R.merge(state, { coverLetter })
        case types.EST:
            const { est } = action
            return R.merge(state, {est});
      
        case types.PROPOSAL_IDS:
            const {job,provider} = action
            return R.merge(state, { job, provider } )
        default:
            return state;
    }

}


const validated = (state, action) =>{

    switch(action.type){
        case types.VALID_PROPOSAL:
         
        default:
            return state;   
    }

}

export  const proposal = (state=initialState, action) => {

    switch (action.type) {
        case types.HOUR_RATE:
            return Object.assign({}, state, 
                {submittedProposal: submitted(state.submittedProposal, action)});
                
        case types.COVERLETTER:
            return R.merge(state, {submittedProposal: submitted(state.submittedProposal, action)})
        case types.EST:
            return R.merge(state, 
                { submittedProposal: submitted(state.submittedProposal, action) })
        
        case types.PROPOSAL_IDS:
            return R.merge(state, {submittedProposal: submitted(state.submittedProposal, action)})
        
        case types.VALID_PROPOSAL:
            return validated(state, action);
        default:
            return state
        }


}