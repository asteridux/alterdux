import { createStore } from '../src/createStore';

describe('Create Store', () => {

  it('should create a store', () => {
    var store = createStore((state) => state, {});

    expect(store).toBeDefined();
  });

  it('should modify state according to reducer', () => {
    var reducer = (state, action) => {
      var newState = state + 1;
      return newState;
    };

    var store = createStore(reducer, 0);

    store.dispatch({});

    expect(store.getState()).toEqual(1);
  })

  it('should dispatch action to reducer', () => {
    var testAction = {
      type: 'TEST',
      payload: {}
    };

    var reducer = (state, action) => {
      expect(action).toEqual(testAction);

      return state;
    };

    var store = createStore(reducer, 0);

    store.dispatch(testAction);
  })

  it('should send new state to listener', () => {
    var reducer = (state, action) => {
      var newState = state + 1;
      return newState;
    };

    var initState = 0;

    var listener = (state) => {
      expect(state).toEqual(1);
    };

    var store = createStore(reducer, initState);

    store.subscribe(listener);

    store.dispatch(1);
  })

  it('should unsubscribe listener', () => {
    var reducer = (state, action) => {
      return action;
    };

    var initState = 0;

    var listener = (state) => {
      expect(state).toEqual(1);
    };

    var store = createStore(reducer, initState);

    var unsubscribe = store.subscribe(listener);

    store.dispatch(1);

    unsubscribe();

    store.dispatch(2);
  });

  it('should not throw an error when unsubscribing multiple times', () => {
    var listener = () => {};

    var store = createStore(() => {}, 0);

    var unsubscribe = store.subscribe(listener);

    expect(unsubscribe()).toBeTruthy();
    expect(unsubscribe()).toBeFalsy();
  });

  it('should run a basic enhancer', () => {
    var enhancer = (createStore) => (reducer, initialState) => {
      var store = createStore(reducer, initialState);
      var newAPI = () => {
        return 'it works!';
      };

      return Object.assign({}, store, { newAPI });
    };

    var store = createStore(() => {}, 0, enhancer);

    expect(store.newAPI()).toEqual('it works!');
  });
});
