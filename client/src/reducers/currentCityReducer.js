import {SET_WEATHER_BY_KEY, LOADING_WEATHER_BY_KEY, ERROR_WEATHER_BY_KEY} from '../actions/types'

  
  const initialState = {
    data: null,
    loading: false,
    errors: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
        case SET_WEATHER_BY_KEY:
                return {
                    ...state,
                    data: action.payload,
                };
        case LOADING_WEATHER_BY_KEY:
                return {
                    ...state,
                    loading: action.payload
                };
        case ERROR_WEATHER_BY_KEY:
                return {
                    ...state,
                    errors: [...state.errors, action.payload]
                };
        default:
                return state;
    }
  }