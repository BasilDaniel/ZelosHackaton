import { actionsTypes, APIProvider, BaseStrategy, Branch, buildCommunication, StoreBranch } from '@axmit/redux-communications';
import { buildCollectionResponseFormatter, buildCollectionPreRequestDataMapper } from 'common/helpers/formatter.helper';
import { usersTransport } from 'entities/User/User.transport';
import { IUserModel, IUserCollection, IUserQueryParams } from 'entities/User/User.models';

const namespace = 'users';

export interface IUsersConnectedProps {
  usersUserCollection: StoreBranch<IUserCollection>;
  usersUserModel: StoreBranch<IUserModel, any, any>;
  getUsersUserCollection(params: IUserQueryParams): void;
  getUsersUserModel(userId: string): void;
  clearUsersUserCollection(): Promise<void>;
}

const userCollection = [
  new APIProvider(actionsTypes.get, usersTransport.getUserCollection, {
    responseFormatter: buildCollectionResponseFormatter<IUserCollection, IUserQueryParams>(),
    preRequestDataMapper: buildCollectionPreRequestDataMapper<IUserQueryParams>()
  })
];
const userModel = [new APIProvider(actionsTypes.get, usersTransport.getUserModel)];

const branches = [new Branch('userCollection', userCollection), new Branch('userModel', userModel)];

const strategy = new BaseStrategy({
  namespace,
  branches
});

const communicationUsers = buildCommunication<IUsersConnectedProps>(strategy);

export { communicationUsers };
