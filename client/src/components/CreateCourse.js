import React from 'react';
import Form from './Form';

export default class CreateCourse extends React.Component {
    state = {
        title : '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId:'',
        user: {},
        errors:[],
    }
    componentDidMount() {
        const {context} = this.props;
        const authUser = context.authenticatedUser;
        this.setState({userId: authUser.id, user: authUser});
    }

    render() {
        const {
            errors,
        } = this.state;

        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <Form
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Create Course"
                    elements={() => (
                        <React.Fragment>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div><input id="title" name="title" type="text"
                                                className="input-title course--title--input" onChange={this.change} placeholder="Course title..."
                                    /></div>
                                    <p>By {this.state.user.firstName} {this.state.user.lastName}</p>
                                </div>
                                <div className="course--description">
                                    <div><textarea id="description" name="description"
                                                   onChange={this.change} placeholder="Course description..." /></div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div><input id="estimatedTime" name="estimatedTime" type="text"
                                                        className="course--time--input" onChange={this.change} placeholder="Hours" />
                                            </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div><textarea id="materialsNeeded" name="materialsNeeded"
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
        context.data.createCourse(course, this.state.user)
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
