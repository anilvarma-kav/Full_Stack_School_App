import React from 'react';
import {Link, withRouter} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import config from "../config";
 class CourseDetail extends React.Component {
     state = {
         id: '',
         title: '',
         description : '',
         estimatedTime: '',
         materialsNeeded:'',
         user: {},
         userId: '',
         exists: false,
     }
     componentDidMount() {
         const id = this.props.match.params.id;
         console.log(id);
         fetch(`${config.apiBaseURL}/courses/${id}`)
             .then(res => res.json())
             .then(res => {
                 console.log(res);
                 if(res.course){
                     const course = res.course;
                     this.setState({
                         id: course.id,
                         title: course.title,
                         description : course.description,
                         estimatedTime: course.estimatedTime,
                         materialsNeeded:course.materialsNeeded,
                         user: course.user,
                         userId: course.userId,
                         exists: true,
                     });
                 }
                 else{
                     this.setState({
                        exists: false,
                     });
                 }

             })
             .catch( err => {
                 console.log(err);
             });

     }

     render() {
         const {context} = this.props;
         const authUser = context.authenticatedUser;
         let html;
         if(authUser){
             if(authUser.id === this.state.userId || authUser.id){
                 html = (<div className="grid-100"><span><Link className="button" to="courses/id/update">Update Course</Link><Link className="button" to="id/delete">Delete Course</Link></span></div>)
             }
         }
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                        {html}
                        <Link className="button button-secondary" to="/">Return to List</Link>
                        </span>
                        </div>
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
