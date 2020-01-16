import React, {Component} from 'react';
import {Link} from "react-router-dom";
export default class Courses extends Component {
    state = {
        courses : [],
    };
    componentDidMount() {
        const {context} = this.props;
        context.data.getCourses()
            .then(data => {
                this.setState({courses: data.courses});
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/error');
            })
        ;
    }

    render() {
        let html;
        const courses = this.state.courses;
        if(courses.length){
            html = courses.map( course => {
                return (
                    <div className="grid-33" key={course.id}><a className="course--module course--link" href={`/courses/${course.id}`} >
                        <h4  className="course--label">Course</h4>
                        <h3  className="course--title">{course.title}</h3>
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
