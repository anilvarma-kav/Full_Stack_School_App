import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import NotFound from './components/NotFound';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';

import apiBaseURL from './config';
import './styles/global.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses : [],
        }
    }
    getCourses = () => {
        axios.get(`${apiBaseURL.apiBaseURL}/courses`)
            .then( res => {
                console.log(res.data.courses);
                this.setState({
                    courses : res.data.courses,
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    // call getCourses() when App component mounted
    componentDidMount() {
        this.getCourses();
    }

    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <Switch>
                        <Route exact path="/" render = {() => <Courses courses={this.state.courses}/> }/>
                        <Route path="/courses/create" component={CreateCourse} />
                        <Route path="/courses/:id/update" component={UpdateCourse}/>
                        <Route path="/courses/:id" render={() => <CourseDetail courses={this.state.courses}/>}/>
                        <Route path="/signin" component={UserSignIn} />
                        <Route path="/signup" component={UserSignUp} />
                        <Route path="/signout" component={UserSignOut} />
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        );
    }


}

