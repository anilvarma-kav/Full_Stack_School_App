import React from 'react';
import Form from './Form';
import config from "../config";

export default class UpdateCourse extends React.Component {
    state = {
        id:'',
        title : '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId:'',
        user: {},
        errors:[],
        forbidden: false,
        exists: true,
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        //console.log(id);
        const {context} = this.props;
        fetch(`${config.apiBaseURL}/courses/${id}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);

                    if(res.course){
                        const course = res.course;
                        if(context.authenticatedUser.id !== course.userId){
                            this.setState({forbidden : true});
                        }
                        else{
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
        if(context.authenticatedUser.id !== this.state.userId){
            console.log(context.authenticatedUser.id, this.state.userId);
            //this.setState({forbidden : true});
        }
    }

    render() {
        const {context} = this.props;
        const authUser = context.authenticatedUser;
        const courseId = this.props.match.params.id;
        const {
            title,
            id,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
            user,
            errors,
        } = this.state;
        if(this.state.forbidden){
            this.props.history.push('/forbidden');
        }
        if(!this.state.exists){
            this.props.history.push('/notfound');
        }
        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <Form
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Update Course"
                    elements={() => (
                        <React.Fragment>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div><input id="title" name="title" type="text" value={title}
                                                className="input-title course--title--input" onChange={this.change} placeholder="Course title..."
                                    /></div>
                                    <p>By {user.firstName} {user.lastName}</p>
                                </div>
                                <div className="course--description">
                                    <div><textarea id="description" name="description" value={description}
                                                   onChange={this.change} placeholder="Course description..." /></div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div><input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime}
                                                        className="course--time--input" onChange={this.change} placeholder="Hours" />
                                            </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div><textarea id="materialsNeeded" name="materialsNeeded" className value={materialsNeeded}
                                                           onChange={this.change} placeholder="List materials..." /></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </React.Fragment>
                    )} />
            </div>
        )
    }
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState( () => {
            return{
                [name]: value
            }

        });
    };
    submit = () => {
        const {context} = this.props;
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
        } = this.state;
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        };
        context.data.updateCourse(course, this.state.user)
            .then( errors => {
                if(errors.length){
                    this.setState({errors});
                }
                else{
                    console.log(`Course: ${course.title} successfully created`);
                    this.props.history.push('/');
                }
            })
            .catch( err => {
                console.log(err);
                this.props.history.push('/error');
            })
    };
    cancel = () => {
        this.props.history.push('/');
    };
}
