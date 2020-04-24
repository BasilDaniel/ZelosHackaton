import {
  IDictionaryCollection,
  INameDictionary,
  IDictionaryResponse,
  IValueDictionary,
  IDictionaryFrom,
  ICityNameDictionary
} from 'entities/Dictionary/Dictionary.models';

export const dictionaryMap = (dictionary?: IDictionaryCollection | null): IDictionaryResponse[] => {
  if (dictionary) {
    return dictionary.data.map(item => {
      return { value: item.id, label: item.name };
    });
  }
  return [];
};
export const cityDictionaryMap = (dictionary?: IDictionaryCollection<ICityNameDictionary> | null): IDictionaryResponse[] => {
  if (dictionary) {
    return dictionary.data.map(item => {
      return { value: item.id, label: item.name, labelInfo: item.state.name };
    });
  }
  return [];
};

export const optionDictionaryToString = (dictionaries: IDictionaryResponse[]): string[] => dictionaries.map(item => item.value);
export const valueDictionaryToStringArray = (dictionaries: IValueDictionary[]): string[] => dictionaries.map(item => item.value);
export const valueDictionaryToString = (dictionaries: IValueDictionary[]): string => dictionaries.map(item => item.value).join();
export const dictionaryFromToString = (dictionaries: IDictionaryFrom[]): string[] => dictionaries.map(item => item.value.id);
export const relationDictionaryToDictionaryResponse = (dictionaries: IDictionaryFrom[]): IDictionaryResponse[] => {
  return dictionaries.map(item => {
    return { value: item.value.id, label: item.value.name };
  });
};

export const checkBoxValuesMap = (collection?: IValueDictionary[] | null) => {
  if (collection) {
    return collection.map(item => {
      return item.value;
    });
  }
  return [];
};

export const dictionaryItemMap = (dictionaryItem?: INameDictionary | null) => {
  if (dictionaryItem) {
    return { value: dictionaryItem.id, label: dictionaryItem.name };
  }
  return undefined;
};
export const dictionaryOptionMap = (option?: IDictionaryResponse | null) => {
  if (option) {
    return { id: option.value, name: option.label };
  }
  return undefined;
};
