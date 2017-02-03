import configureStore from './store/config';
import actions from './actions/socket'

const store = configureStore();

console.group("STORE INITIAL STATE")
console.info(store.getState())
console.groupEnd("STORE INITIAL STATE")

store.dispatch(actions.initialize("open sesame"))