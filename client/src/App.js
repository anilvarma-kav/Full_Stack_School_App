import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Header from './components/Header';
import NotFound from './components/NotFound';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';

import './styles/global.css';

function App() {
  return (
      <Router>
    <div>
        <Header/>
        <Switch>
            <Route exact path="/" component={Courses} />
            <Route path="/courses/create" component={CreateCourse} />
            <Route path="/courses/:id/update" component={UpdateCourse}/>
            <Route path="/courses/:id" component={CourseDetail}/>
            <Route path="/signin" component={UserSignIn} />
            <Route path="/signup" component={UserSignUp} />
            <Route path="/signout" component={UserSignOut} />
            <Route component={NotFound}/>
        </Switch>
    </div>
      </Router>
  );
}

export default App;
