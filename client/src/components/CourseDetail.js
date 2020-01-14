import React from 'react';
import {Link, withRouter} from "react-router-dom";
import ReactMarkdown from "react-markdown";
 class CourseDetail extends React.Component {
    render() {
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
                            <h4 className="course--label">label</h4>
                            <h3 className="course--title">Course Title</h3>
                            <p>By Joe Smith</p>
                        </div>
                        <div className="course--description">
                            <p> <ReactMarkdown>Course Description</ReactMarkdown></p>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>Course Estimated Time</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ReactMarkdown>{"points"}</ReactMarkdown>
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
