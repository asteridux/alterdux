import { paraduxEnhancer } from '../src/paraduxEnhancer';
import { createStore } from '../src/createStore';

describe('Paradux Enhancer', () => {

  it('should create paraduxEnhancer', () => {
    var reducer = () => {};
    var initialState = 0;

    var store = createStore(reducer, initialState, paraduxEnhancer);

    expect(store).toBeDefined();
  });

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

    var store = createStore(reducer, initialState, paraduxEnhancer);

    store.subscribe(subscriber);

    store.dispatch({});

    expect(reducerRun).toBeTruthy();
    expect(subscriberRun).toBeTruthy();
  });

  it('should add new reducers at runtime', () => {
    var initReducer = (state, action) => {
      return state + 1;
    }

    var runtimeReducer = (state, action) => {
      return 'a';
    };

    var store = createStore(initReducer, 0, paraduxEnhancer);

    expect(store.getState()).toEqual(0);

    store.dispatch({});

    expect(store.getState()).toEqual(1);

    store.addReducer(runtimeReducer);
    store.dispatch({});

    expect(store.getState()).toEqual("a");
  });

  it('should remove new reducers when unsubscribed', () => {
    var initReducer = (state, action) => {
      return 'a';
    }

    var runtimeReducer = (state, action) => {
      return 'b';
    };

    var store = createStore(initReducer, 'z', paraduxEnhancer);

    expect(store.getState()).toEqual('z');

    store.dispatch({});

    expect(store.getState()).toEqual('a');

    var unsubRuntime = store.addReducer(runtimeReducer);
    store.dispatch({});

    expect(store.getState()).toEqual('b');

    expect(unsubRuntime()).toBeTruthy();
    expect(unsubRuntime()).toBeFalsy();

    store.dispatch({});

    expect(store.getState()).toEqual('a');
  });

});
