import {autoCompleteSearch} from './actions/autoCompleteAction';
import store from "./store";
import * as _ from 'lodash';


export const debounced = _.debounce((query)=>{
    return store.dispatch(autoCompleteSearch(query));
  },200)

export const convertToF = (celsius) => {
    let fahrenheit
    // Only change code below this line
    fahrenheit = (celsius * (9/5)) + 32 // fahenheit = celsius * 9/5 + 32 works too.
    // Only change code above this line
    return Math.round(fahrenheit);
}
export const convertToC = (fahrenheit) => {
  let celsius
  // Only change code below this line
  celsius = (fahrenheit - 32) /  (9/5)
  // Only change code above this line
  return Math.round(celsius);
}