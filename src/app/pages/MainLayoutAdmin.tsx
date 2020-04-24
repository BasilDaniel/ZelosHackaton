import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'entities/Auth/components/NotFound';
import MainPageAdmin from 'entities/User/adminComponents/MainPageAdmin';

class MainLayoutAdmin extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={MainPageAdmin} exact />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}
export default MainLayoutAdmin;
