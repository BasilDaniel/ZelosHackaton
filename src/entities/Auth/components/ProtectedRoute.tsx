import React, { ComponentClass, FunctionComponent } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { ERoutes } from 'app/App';
import { communicationAuth, IAuthConnectedProps } from 'entities/Auth/Auth.communication';

interface IComponentProps {
  userRole?: string;
  routesComponents?: { component: ComponentClass | FunctionComponent; userRole: string }[];
  defaultRoute?: string;
}

type AllProps = RouteProps & IAuthConnectedProps & IComponentProps;

class ProtectedRoute extends React.Component<AllProps> {
  constructor(props: IAuthConnectedProps) {
    super(props);
    const { authModel, initAuthModel } = this.props;
    const { data } = authModel;
    if (!data?.access) {
      initAuthModel();
    }
  }
  render() {
    const {
      authModel,
      defaultRoute = `/${ERoutes.Login}`,
      routesComponents,
      component,
      path,
      location,
      exact,
      sensitive,
      strict,
      render,
      userRole
    } = this.props;
    const { data, loading } = authModel;
    const routeComponent = userRole && routesComponents && routesComponents.find(item => item.userRole === userRole)?.component;

    if (loading) {
      return null;
    }

    return !data?.access ? (
      <Redirect
        to={{
          pathname: defaultRoute
        }}
      />
    ) : (
      <Route
        path={path}
        component={routeComponent ? routeComponent : component}
        location={location}
        exact={exact}
        sensitive={sensitive}
        strict={strict}
        render={render}
      />
    );
  }
}

export default communicationAuth.injector(ProtectedRoute);
