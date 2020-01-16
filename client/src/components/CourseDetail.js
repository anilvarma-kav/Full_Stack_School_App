import React from 'react';
import {Link, withRouter} from "react-router-dom";
import ReactMarkdown from "react-markdown";
 class CourseDetail extends React.PureComponent {
     state = {
         id: '',
         title: '',
         description : '',
         estimatedTime: '',
         materialsNeeded:'',
         user: {},
         userId: '',
         exists: true,
     };
     componentDidMount() {
         const id = this.props.match.params.id;
         const {context} = this.props;
         context.data.getCourse(id)
             .then(data => {
                 if(data.course){
                     this.setState({id: data.course.id,
                         title: data.course.title,
                         description : data.course.description,
                         estimatedTime: data.course.estimatedTime,
                         materialsNeeded:data.course.materialsNeeded,
                         user: data.course.user,
                         userId: data.course.userId,
                         exists: true,
                     });
                 }
                 else {
                     this.setState({exists: false});
                 }
             })
             .catch(err => {
                 this.setState({exists: false});
             })
         ;
     }

     render() {
         if(!this.state.exists){
             this.props.history.push('/notfound');
         }
         const {context} = this.props;
         const authUser = context.authenticatedUser;
         let html;
         if(authUser){
             if(authUser.id === this.state.userId ){
                 const {id} = this.state;
                 html = (
                     <span>
                        <a className="button" href={`/courses/${id}/update`}>Update Course</a>
                        <a className="button" onClick={this.deleteCourse} href={`/`}>Delete Course </a>
                     </span>
             );
             }
         }
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                        {html}
                        <Link className="button button-secondary" to="/">Return to List</Link>

                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{this.state.title}</h3>
                            <p>By {this.state.user.firstName} {this.state.user.lastName}</p>
                        </div>
                        <div className="course--description">
                             <ReactMarkdown>{this.state.description}</ReactMarkdown>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{this.state.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ReactMarkdown>{this.state.materialsNeeded}</ReactMarkdown>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    deleteCourse = () => {
         const {context} = this.props;
         const user = context.authenticatedUser;
         const courseId = this.state.id;
         context.data.deleteCourse(courseId, user)
             .then(() => {
                 console.log(`${this.state.title} was deleted successfully`);
                 this.props.history.push('/');
             })
             .catch(err => {
                 console.log(err);
             });
         console.log('Deleted');
    };
}

export default withRouter (CourseDetail);
