import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import './styles/global.css';

// Required Components
import Header from './components/Header';
import NotFound from './components/NotFound';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UnhandledError from "./components/UnhandledError";


import withContext from "./Context";
import PrivateRoute from "./PrivateRoute";
import Forbidden from "./components/Forbidden";

const CoursesWithContext = withContext(Courses);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

// App Component
export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <HeaderWithContext/>
                    <Switch>
                        <Route exact path="/" component={CoursesWithContext}/>
                        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
                        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext}/>
                        <Route path="/courses/:id" component={CourseDetailWithContext}/>
                        <Route path="/signin" component={UserSignInWithContext} />
                        <Route path="/signup" component={UserSignUpWithContext} />
                        <Route path="/signout" component={UserSignOutWithContext} />
                        <Route path='/forbidden' component={Forbidden}/>
                        <Route path='/error' component={UnhandledError}/>
                        <Route path='/notfound' component={NotFound}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

