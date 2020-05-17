import {ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, SET_FAVORITES, SET_FAVORITES_WEATHER,LOADING_FAVORITES_WAETHER, ERROR_FAVORITES_WAETHER} from '../actions/types'

  
  const initialState = {
    data: [],
    loading: false,
    errors: []
  };

  const setLocalStorage = (favorites) => localStorage.setItem('favorites', JSON.stringify(favorites))
  
  export default function(state = initialState, action) {
    let newData = []
    switch (action.type) {
        case ADD_TO_FAVORITES:
            // if(state.data.length < 5) {
                newData = [...state.data, action.payload]
            // }
            // else{
            //     newData = [...state.data, action.payload]
            //     newData.shift()
            // }
            setLocalStorage(newData)
                return {
                    ...state,
                    data: newData,
                };
        case REMOVE_FROM_FAVORITES: 
                newData = state.data.filter((city)=>city.cityInfo.Key !== action.payload.cityInfo.Key)
                setLocalStorage(newData)

                return {
                    ...state,
                    data: newData
                };
        case SET_FAVORITES: 
                return {
                    ...state,
                    data: action.payload
                }; 
        case SET_FAVORITES_WEATHER:
                return {
                    ...state,
                    data: action.payload
                };
        case LOADING_FAVORITES_WAETHER:
                return {
                    ...state,
                     loading: action.payload
                }; 
        case ERROR_FAVORITES_WAETHER:
                return {
                    ...state,
                    errors: [...state.errors,action.payload]
                }                        
        default:
                return state;
    }
  }