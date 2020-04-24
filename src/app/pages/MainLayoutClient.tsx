import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from 'entities/Auth/components/NotFound';
import MainPageClient from 'entities/User/clientComponents/MainPageClient';

class MainLayoutClient extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={MainPageClient} exact />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}
export default MainLayoutClient;
