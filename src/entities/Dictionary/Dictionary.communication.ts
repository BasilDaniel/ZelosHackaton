import { actionsTypes, APIProvider, BaseStrategy, Branch, buildCommunication, StoreBranch } from '@axmit/redux-communications';
import { dictionaryTransport } from 'entities/Dictionary/Dictionary.transport';
import { IDictionaryParams, IDictionaryResponse } from 'entities/Dictionary/Dictionary.models';

const namespace = 'dictionary';

export interface IDictionaryConnectedProps {
  dictionaryCountries: StoreBranch<IDictionaryResponse[]>;
  getDictionaryCountries(params?: IDictionaryParams): void;
}

const Countries = [new APIProvider(actionsTypes.get, dictionaryTransport.getCountries)];

const branches = [new Branch('countries', Countries)];

const strategy = new BaseStrategy({
  namespace,
  branches
});

const communicationDictionary = buildCommunication<IDictionaryConnectedProps>(strategy);

export { communicationDictionary };
