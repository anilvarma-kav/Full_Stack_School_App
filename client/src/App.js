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


import withContext from "./Context";

import PrivateRoute from "./PrivateRoute";

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <HeaderWithContext/>
                    <Switch>
                        <Route exact path="/" component={Courses}/>
                        <PrivateRoute path="/courses/create" component={CreateCourse} />
                        <PrivateRoute path="/courses/:id/update" component={UpdateCourse}/>
                        <Route path="/courses/:id" component={CourseDetailWithContext}/>
                        <Route path="/signin" component={UserSignInWithContext} />
                        <Route path="/signup" component={UserSignUpWithContext} />
                        <Route path="/signout" component={UserSignOutWithContext} />
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        );
    }


}

