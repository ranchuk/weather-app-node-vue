import {SET_GEO_POSITION_KEY, LOADING_GEO_POSITION_KEY, ERROR_GEO_POSITION_KEY} from '../actions/types'

  
  const initialState = {
    data: null,
    loading: false,
    errors: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
        case SET_GEO_POSITION_KEY:
                return {
                    ...state,
                    data: action.payload,
                };
        case LOADING_GEO_POSITION_KEY:
                return {
                    ...state,
                    loading: action.payload
                };
        case ERROR_GEO_POSITION_KEY:
                return {
                    ...state,
                    errors: [...state.errors, action.payload]
                };
        default:
                return state;
    }
  }