export function createStore(reducer, initialState, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer, initialState);
  }

  var state = initialState;
  var subscribers = [];

  function subscribe(listener) {
    subscribers.push(listener);

    var unsubscribed = false;

    return function() {
      if (!unsubscribed) {
        subscribers.splice(subscribers.indexOf(listener), 1);
        unsubscribed = true;

        return true;
      }

      return false;
    }
  }

  function dispatch(action) {
    state = reducer(state, action);

    subscribers.forEach((subscriber) => {
      subscriber(state);
    });
  }

  function getState() {
    return state;
  }

  return { subscribe, dispatch, getState };
}
