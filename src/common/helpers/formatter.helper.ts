import { StoreBranch } from '@axmit/redux-communications';
import { IEntityData } from '@axmit/client-models';

interface IBaseFilterModel {
  limit: number;
  offset: number;
}
interface IBaseCollectionResponse extends IEntityData<any, any> {}
export function buildCollectionResponseFormatter<TResponse extends IBaseCollectionResponse, TPayload extends IBaseFilterModel>() {
  return (response: TResponse, payload: TPayload, branchState: StoreBranch<TResponse, TPayload>) => {
    if (typeof payload.offset !== 'undefined' && payload.offset === 0) {
      return response;
    }
    const oldData = (branchState.data && branchState.data.data) || [];
    return { data: [...oldData, ...response.data], meta: response.meta };
  };
}
export function buildCollectionPreRequestDataMapper<TPayload extends IBaseFilterModel>() {
  return (response: null, payload: TPayload, branchState: StoreBranch<null, TPayload>) => branchState.data;
}
export function IBANFormatter(value: string) {
  return value.replace(/[^\dA-Z]/g, '').replace(/(.{4})(?!$)/g, '$1 ');
}
export function fromCamelCaseToSentenseCase(value: string) {
  const result = value.replace(/([A-Z])/g, ' $1').toLowerCase();
  return result.charAt(0).toUpperCase() + result.slice(1);
}
