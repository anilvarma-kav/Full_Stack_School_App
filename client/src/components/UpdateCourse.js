import React from 'react';
import Form from './Form';


export default class UpdateCourse extends React.PureComponent {
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
        const {context} = this.props;

        // Call API to get the course with id
        context.data.getCourse(id)
            .then(data => {
                console.log(data);
                if(data.course){
                    if(context.authenticatedUser.id !== data.course.userId){
                        this.setState({forbidden : true});
                    }
                    else {
                        this.setState({
                            id: data.course.id,
                            title: data.course.title,
                            description : data.course.description,
                            estimatedTime: data.course.estimatedTime,
                            materialsNeeded:data.course.materialsNeeded,
                            user: data.course.user,
                            userId: data.course.userId,
                            exists: true,
                        });
                    }
                }
                else if(data.errors){
                    this.setState({exists: false});
                }
                else{
                    this.props.history.push('/error');
                }

            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/error'); // handle rejected promises
            });
    }

    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            user,
            errors,
        } = this.state;
        // If forbidden for current user
        if(this.state.forbidden){
            this.props.history.push('/forbidden');
        }
        //If course doesn't exists
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
                                            <div><textarea id="materialsNeeded" name="materialsNeeded"  value={materialsNeeded}
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

    // Updating state for each change in the input fields
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState( () => {
            return{
                [name]: value
            }

        });
    };

    // Call API for updating the course
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
        context.data.updateCourse(course,this.state.id, context.authenticatedUser)
            .then( errors => {
                if(errors.length){
                    this.setState({errors});
                }
                else{
                    console.log(`Course: ${course.title} successfully updated`);
                    this.props.history.push(`/courses/${this.state.id}`);
                }
            })
            .catch( err => {
                console.log(err);
                this.props.history.push('/error');
            })
    };
    cancel = () => {
        this.props.history.push(`/courses/${this.state.id}`);
    };
}
