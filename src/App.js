import React, { useState } from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Projects from './pages/Projects';

function App() {
  const [login, setLogin] = useState({ user_id: '', jwt: '' })

  const userLogged = user_login => {
    setLogin(user_login);
  }

  const logout = () => {
    setLogin({ user_id: '', jwt: '' })
  }

  return (
    <div>
      <Router>
        <Header isAuth={true} logout={logout} />
        <Switch>
          <Route path="/" exact>
            <Projects />
          </Route>
          <Route path="/login" exact>
          </Route>
          <Route path="/project/:id" exact>
          </Route>
          <Route path="/project-edit/:id" exact>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
