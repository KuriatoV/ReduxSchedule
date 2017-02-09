import { combineReducers } from 'redux';
import schedule from './scheduleReducer';

const rootReducer = combineReducers({
  schedule,
});

export default rootReducer;
