import React, {Component} from 'react';
import {Link} from "react-router-dom";
import config from "../config";
export default class Courses extends Component {
    state = {
        courses : [],
    };
    componentDidMount() {
        fetch(`${config.apiBaseURL}/courses`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({courses: res.courses});
            })
            .catch( err => {
                console.log(err);
            })
    }

    render() {
        let html;
        const courses = this.state.courses;
        if(courses.length){
            html = courses.map( course => {
                let href = `/courses/${course.id}`;
                return (
                    <div className="grid-33"><a className="course--module course--link" href={href}>
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                    </a></div>
                )
            })
        }
        return (
            <div className="bounds">
                {html}
                <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
                    <h3 className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                             viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>
                        New Course
                    </h3>
                </Link></div>
            </div>
        )
    }
}
