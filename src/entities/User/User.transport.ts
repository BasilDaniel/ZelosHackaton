import axios from 'axios';
import { objectToQuery } from 'common/helpers/filters.helper';
import { IUserModel, IUserQueryParams, IUserCollection } from 'entities/User/User.models';

const basePath = '/user';

export const usersTransport = {
  getUserCollection: (filter: IUserQueryParams): Promise<IUserCollection> =>
    axios.get(`${basePath}${objectToQuery(filter)}`).then(r => r.data),
  getUserModel: (userId: string): Promise<IUserModel> => axios.get(`${basePath}/${userId}`).then(r => r.data)
};
