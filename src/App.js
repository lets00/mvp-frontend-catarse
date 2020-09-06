import React, { useState } from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Projects from './pages/Projects';
import Login from './pages/Login';
import Project from './pages/Project';
import Update from './pages/Update';

function App() {
  const [login, setLogin] = useState({ user_id: '', jwt: '' })
  const [title, setTitle] = useState('')

  const userLogged = user_login => {
    setLogin(user_login);
  }

  const updateTitle = title => {
    setTitle(title)
  }

  const logout = () => {
    setLogin({ user_id: '', jwt: '' })
  }

  return (
    <div>
      <Router>
        <Header isAuth={login['jwt']} logout={logout} title={title} updateTitle={updateTitle}/>
        <Switch>
          <Route path="/" exact>
            <Projects title={title}/>
          </Route>
          <Route path="/login" exact>
            <Login userLogged={userLogged} />
          </Route>
          <Route path="/project/:id" exact>
            <Project login={login} />
          </Route>
          <Route path="/project-edit/:id" exact>
            <Update login={login}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
