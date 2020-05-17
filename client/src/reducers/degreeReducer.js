import {CHANGE_DEGREE_TYPE} from '../actions/types'

  
  const initialState = {
    isCelsius: true,
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
        case CHANGE_DEGREE_TYPE:
                return {
                    ...state,
                    isCelsius: !state.isCelsius,
                };
        default:
                return state;
    }
  }