export const convertToC = (fahrenheit) => {
    let celsius
    // Only change code below this line
    celsius = (fahrenheit - 32) /  (9/5)
    // Only change code above this line
    return Math.round(celsius);
}
export const convertToF = (celsius) => {
    let fahrenheit
    // Only change code below this line
    fahrenheit = (celsius * (9/5)) + 32 // fahenheit = celsius * 9/5 + 32 works too.
    // Only change code above this line
    return Math.round(fahrenheit);
}