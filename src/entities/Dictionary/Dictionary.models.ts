export interface INameDictionary {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
}
export interface ICityNameDictionary {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  state: INameDictionary;
}
export interface IValueDictionary {
  id: string;
  createdAt: string;
  updatedAt: string;
  value: string;
}
export interface IDictionaryFrom {
  value: INameDictionary;
}
export interface ICompanyCategories extends INameDictionary {}
export interface ICompanySubCategories extends INameDictionary {}
export interface ICountries extends INameDictionary {}
export interface IStates extends INameDictionary {}
export interface ICities extends INameDictionary {}
export interface IColleges extends INameDictionary {}

export interface IDictionaryParams {
  name?: string;
  offset?: number;
  limit?: number;
}
export interface IDictionaryResponse {
  value: string;
  label: string;
  labelInfo?: string;
}
export interface IStateParams extends IDictionaryParams {
  countryId: string;
}
export interface ICityParams extends IStateParams {
  countryId: string;
  stateId: string;
}

export interface IDictionaryMeta {
  count: number;
}

export interface IDictionaryCollection<D = INameDictionary> {
  data: D[];
  meta: IDictionaryMeta;
}
