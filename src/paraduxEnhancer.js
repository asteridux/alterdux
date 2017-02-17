export function paraduxEnhancer(createStore) {
  return (reducer, initialState, enhancer) => {
   let reducers = [];

   function addReducer(reducerFunc) {
     reducers.push(reducerFunc);
     var unsubscribed = false;

     return function() {
       if (!unsubscribed) {
         reducers.splice(reducers.indexOf(reducerFunc), 1);
         unsubscribed = true;

         return true;
       }

       return false;
     }
   }

   function enhancedReducer(reducer) {
      return (state, action) => {
        var newState = reducers.reduce((tempState, reducerFunc) => {
          return reducerFunc(tempState, action);
        }, reducer(state, action));

        return newState;
      };
   }

   const store = createStore(enhancedReducer(reducer), initialState, enhancer);

   return Object.assign({}, store, { addReducer });
  }
}
