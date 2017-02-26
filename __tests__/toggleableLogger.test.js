import { createStore } from '../src/createStore';
import { toggleableLogger } from '../src/toggleableLogger';

describe('Toggleable Logger', () => {

  it('should successfully create store', () => {
    var reducer = () => {};
    var initState = 0;

    var store = createStore(reducer, initState, toggleableLogger);

    expect(store).toBeDefined();
  })

  it('should run createStore functions as expected', () => {
    var reducerRun = false;
    var subscriberRun = false;

    var reducer = (state, action) => {
      reducerRun = true;

      return state + 1;
    };

    var initialState = 0;
    var subscriber = (state) => {
      subscriberRun = true;

      expect(state).toEqual(1);
    };

    var store = createStore(reducer, initialState, toggleableLogger);

    store.subscribe(subscriber);

    store.dispatch({});

    expect(reducerRun).toBeTruthy();
    expect(subscriberRun).toBeTruthy();
  });

  it('should toggle logging boolean', () => {
    var reducer = (state) => state;
    var initialState = 0;

    var store = createStore(reducer, initialState, toggleableLogger);

    expect(store.toggleLog()).toBeTruthy();
    expect(store.toggleLog()).toBeFalsy();

  });
});
