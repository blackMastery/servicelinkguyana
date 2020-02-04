import types from '../actions/actionTypes'
import { useRouter } from 'next/router';


const initialState = {
    status: "",
    isLogin: false,
    loginError: "",
    token: "",
    resetMessage:"",
    "location": {
        "type": "",
        "coordinates": []
    },
    "goingJobs": 0,
    "completedJobs": 0,
    "jobCount": 0,
    "joined": "",
    "_id": "",
    "firstname": "",
    "lastname": "",
    "email": "",
    "role": "",
    "education": [],
    "employmentHistory": [],
}


const user = (state = initialState, action ) => {
    switch (action.type){
        case types.FORGOT_PASSWORD_SUCCESS:
            return Object.assign(state, {
              resetMessage:
                "The link to reset your password is been to your email"
            });
        case types.LOGIN: 
            return Object.assign({}, {...action.user}, {token: action.token}, {isLogin: true});
        case types.LOGOUT:
            return initialState
        case types.ADD_EMPLOYMENT:
            return Object.assign({}, state, { employmentHistory: action.employmentHistory} );
        case types.UPDATE_USER_INFO:
            return Object.assign({}, state, {...action.user})
        
        case types.LOGIN_ERROR:
            return Object.assign({}, state, {loginError: action.message})
        case types.ADD_EDUCATION:
            return Object.assign({}, state, {education: [...action.education]})
        case types.DELETE_EMPLOYMENT:
            return Object.assign( {}, state,{ employmentHistory: [...state.employmentHistory.filter(emp => emp._id !== action.id)]});
        case types.DELETE_EDUCATION:
            return Object.assign({}, state, { education: [...state.education.filter(edu => edu._id !== action.id)]});
        case types.EDIT_EDUCATION:
            let edu = state.education.find((edu) => edu._id === action.id);
            const newEdu = Object.assign({}, edu, action.education)
            return [...state.education.filter(edu => edu._id !== action.id), newEdu];
        case types.REMOVE_SKILL:
            return Object.assign({}, state, { skills: [...state.skills.filter( skill=> skill._id !== action.id)]});
        case types.ADD_SKILL:
            return Object.assign({}, state, {skills: [...action.skills] }) 
        default:
            return state
    }
}


export default user