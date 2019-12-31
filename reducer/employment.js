import types from "../actions/actionTypes";

const initialState = [
  {
    company: '',
    title: '',
    period: {
        from: '',
        to: ''
    }
  }
];

export const educationHistory = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_EMPLOYMENT:
      return [...state, action.employment];
    case types.EDIT_EMPLOYMENT:
      let emp = state.find(emp => emp.id === action.id);
      const newEmp = Object.assign({}, emp, action.employment);
      return [...state.filter(emp => emp.id !== action.id), newEmp];
    case types.DELETE_EMPLOYMENT:
      return [...state.filter(emp => emp.id !== action.id)];
    default:
      return state;
  }
};
