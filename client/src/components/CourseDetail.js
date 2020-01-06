import React from 'react';
import {Link, withRouter} from "react-router-dom";
import ReactMarkdown from "react-markdown";
 class CourseDetail extends React.Component {
    render() {
        const {params} = this.props.match;
        let courses = this.props.courses;
        console.log(courses);
        let course = courses.filter( course => course.id == params.id);
        console.log(course);
        console.log(params.id);
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100"><span><Link className="button" to="courses/id/update">Update Course</Link><Link className="button" to="id/delete">Delete Course</Link></span><Link className="button button-secondary" to="/">Return to List</Link></div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course[0].title}</h3>
                            <p>By Joe Smith</p>
                        </div>
                        <div className="course--description">
                            <p> <ReactMarkdown>{course[0].description}</ReactMarkdown></p>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{course[0].estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter (CourseDetail);
