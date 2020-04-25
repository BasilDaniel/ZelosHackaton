import { AnyAction, Reducer } from 'redux';
import { RouterState } from 'react-router-redux';
import { communicationAuth } from 'entities/Auth/Auth.communication';

export type RoutingReducer = Reducer<RouterState, AnyAction>;

export interface IApplicationState {
  routing?: RoutingReducer | null;
  auth: any;
  [key: string]: any;
}

const reducers = {
  ...communicationAuth.reducers
};

export default reducers;
