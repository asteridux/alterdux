export function toggleableLogger(createStore) {
  return (reducer, initialState, enhancer) => {
    const store = createStore(reducer, initialState, enhancer);
    var toggle = false;

    let toggleLog = () => {
      toggle = !toggle;

      return toggle;
     };

    let dispatch = (state, action) => {
      if (toggle) { console.log(state, action) }
      return store.dispatch(state, action);
    }
    return Object.assign({}, store, { dispatch, toggleLog });
  };
}
