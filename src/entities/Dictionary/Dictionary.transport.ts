import axios from 'axios';
import { objectToQuery } from 'common/helpers/filters.helper';
import { dictionaryMap, cityDictionaryMap } from 'common/helpers/mappers.helper';
import { IDictionaryParams, IStateParams, ICityParams, IDictionaryResponse } from 'entities/Dictionary/Dictionary.models';

export const dictionaryTransport = {
  getCompanyCategories: (params: IDictionaryParams): Promise<IDictionaryResponse[]> =>
    axios.get(`/company-categories${objectToQuery(params)}`).then(r => dictionaryMap(r.data)),
  getCompanySubCategories: (params: IDictionaryParams): Promise<IDictionaryResponse[]> =>
    axios.get(`/company-sub-categories${objectToQuery(params)}`).then(r => dictionaryMap(r.data)),
  getCountries: (params?: IDictionaryParams): Promise<IDictionaryResponse[]> => {
    const query = objectToQuery(params);
    return axios.get(`/countries${query}`).then(r => {
      return dictionaryMap(r.data);
    });
  },
  getStates: (params: IStateParams): Promise<IDictionaryResponse[]> =>
    axios.get(`/states${objectToQuery(params)}`).then(r => dictionaryMap(r.data)),
  getCities: (params: ICityParams): Promise<IDictionaryResponse[]> =>
    axios.get(`/cities${objectToQuery(params)}`).then(r => cityDictionaryMap(r.data)),
  getColleges: (params: IDictionaryParams): Promise<IDictionaryResponse[]> =>
    axios.get(`/colleges${objectToQuery(params)}`).then(r => dictionaryMap(r.data))
};
