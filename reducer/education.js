import types from '../actions/actionTypes';

const initialState = [
  {
      id:1,
    school: "",
    peroid: {
      from: "",
      to: ""
    },
    degree: "",
    area: "",
    description: ""
  }
];




export const educationHistory = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_EDUCATION:
      return [...state, action.education];
    case types.EDIT_EDUCATION:
        let edu = state.find((emp) =>emp.id === action.id );
        const newEdu = Object.assign({}, edu, action.education)
        return [...state.filter(emp => emp.id !== action.id ),newEdu];
    case types.DELETE_EDUCATION:
       return [...state.filter(emp => emp.id !== action.id) ];
    default:
      return state;
  }
};
