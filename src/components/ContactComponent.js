import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';
import { Fade, Loop } from 'react-animation-components';


// validation logic
const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
// that is a curried function
const minLength = len => val => val && (val.length >= len);
const isNumber = val => !isNaN(+val);
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: '',
            agree: false,
            contactType: 'By Phone',
            feedback: '',
            // formfeedback will show error messages to the user. this touched state is how to know whether or not to show those to the user - its boolean
            touched: {
                //just tracks if they clicked into the iniput field by using the blur metghod
                firstName: false,
                lastName: false,
                phoneNum: false,
                email: false
            }
        };
        // removed to use redux
        // this.handleInputChange = this.handleInputChange.bind(this);
        // so we can use the "this" inside that inchange method and have it pt to the right object


        this.handleSubmit = this.handleSubmit.bind(this);
        // binds "this"
    }


    // removed to use redux :(
    // validate(firstName, lastName, phoneNum, email) {

    //     const errors = {
    //         firstName: '',
    //         lastName: '',
    //         phoneNum: '',
    //         email: ''
    //     };

    //     if (this.state.touched.firstName) {
    //         if (firstName.length < 2) {
    //             errors.firstName = 'First name must be at least 2 characters';
    //         } else if (firstName.length > 15) {
    //             errors.firstName = 'First name mustbe 15 chars or less.';
    //         }
    //     }

    //     if (this.state.touched.lastName) {
    //         if (lastName.length < 2) {
    //             errors.lastName = 'Last name must be at least 2 characters';
    //         } else if (lastName.length > 15) {
    //             errors.lastName = 'Last name mustbe 15 chars or less.';
    //         }
    //     }

    //     const reg = /^\d+$/;
    //     if (this.state.touched.phoneNum && !reg.test(phoneNum)) {
    //         errors.phoneNum = 'The phone number should contain only nums.';
    //     }

    //     if (this.state.touched.email && !email.includes('@')) {
    //         errors.email = 'That is not a valid email.';
    //     }

    //     return errors;
    // }


    // removed to use redux
    //     handleBlur = (field) => () => {
    // // dont need to use .bind bc its an arrow func and its bound w/o usingthat method
    //         this.setState({
    //             touched: {...this.state.touched, [field]: true}
    //             // spreads it out so we can access the entire obj, then we change just the touched state
    //         });
    //     }

    //     // handles changes of form eles
    //     handleInputChange(event) {
    //         const target = event.target;
    //         const name = target.name;
    //         const value = target.type === 'checkbox' ? target.checked : target.value;

    //         this.setState({
    //             [name]: value
    //             // ~3min in - this is the same as the "value" defined above... but i dont get why this works
    //             // now need to bind the reference to the "this" keyword for this method in the class constructor
    //         })
    //     }

    // handles changes of form changes (idk???)
    handleSubmit(values) {
        // console.log("Current state is: " + JSON.stringify(values));    //    global method that makes a string from an obj
        // alert("Current state is: " + JSON.stringify(values));
        this.props.resetFeedbackForm();
        this.props.postFeedback(values); // sends to the server
        
        // react-redux form will handle this now
        // event.preventDefault();  // this prevents the page from refreshing after the form is submitted   
    }

    render() {
        // removed to use redux
        // const errors = this.validate(this.state.firstName, this.state.lastName, this.state.phoneNum, this.state.email);

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>Contact Us</h2>
                        <hr />
                    </div>
                </div>
<Loop in interval="1000">
    <Fade>
                <div className="row row-content align-items-center">
                    <div className="col-sm-4">
                        <h5>Our Address</h5>
                        <address>
                            1 Nucamp Way<br />
                            Seattle, WA 98001<br />
                            U.S.A.
                        </address>
                    </div>
                    <div className="col">
                        <a role="button" className="btn btn-link" href="tel:+12065551234"><i className="fa fa-phone" /> 1-206-555-1234</a><br />
                        <a role="button" className="btn btn-link" href="mailto:fakeemail@fakeemail.co"><i className="fa fa-envelope-o" /> campsites@nucamp.co</a>
                    </div>
                </div>
</Fade></Loop>
                <div className="row row-content">
                    <div className="col-12">
                        <h2>Send us your Feedback</h2>
                        <hr />
                    </div>
                    <div className="col-md-10">
                        {/* has to have a model now to connect it to the state in redux store */}
                        <Form model="feedbackForm" onSubmit={values => this.handleSubmit(values)}>
                            {/* and the entire form gets an onSusbmit event handler set to the method we defined */}
                            <Row className="form-group">
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text
                                        model=".firstName"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    // removed for redux

                                    //                             value={this.state.firstName}
                                    //                             invalid={errors.firstName}
                                    //                             // I dont totally u/s why we need the invalid method... she said if thereis an error message, the errors will eval to true and otherwose return nothing
                                    // to make this controlled, we have to set the value (in handeinputchange) to the state property we defied b4 to hold this input
                                    // (whatever attribute it is correspnding to above)

                                    //                             onBlur={this.handleBlur("firstName")}
                                    // // this is for tracking the touched state. if user clicks in and then out it triggers this
                                    //                             onChange={this.handleInputChange} 
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".firstName"// just needs to match the model of the corresponding control comp
                                        show="touched"// will only show error messages if the field is touched by the user. Easy!, it's already set up for us
                                        component="div"// tells it to show error messages in a div
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 chars.',
                                            maxLength: 'Must be 15 chars of less.'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastName" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".lastName"// just needs to match the model of the corresponding control comp
                                        show="touched"// will only show error messages if the field is touched by the user. Easy!, it's already set up for us
                                        component="div"// tells it to show error messages in a div
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 chars.',
                                            maxLength: 'Must be 15 chars of less.'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Control.text model=".phoneNum" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(10),
                                            maxLength: maxLength(15),
                                            isNumber
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".phoneNum"// just needs to match the model of the corresponding control comp
                                        show="touched"// will only show error messages if the field is touched by the user. Easy!, it's already set up for us
                                        component="div"// tells it to show error messages in a div
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 10 chars.',
                                            maxLength: 'Must be 15 chars or less.',
                                            isNumber: 'Must be a number.'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required,
                                            validEmail
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".email"// just needs to match the model of the corresponding control comp
                                        show="touched"// will only show error messages if the field is touched by the user. Easy!, it's already set up for us
                                        component="div"// tells it to show error messages in a div
                                        messages={{
                                            required: 'Required',
                                            validEmail: 'Invalid email.'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 4, offset: 2 }}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox
                                                model=".agree"
                                                name="agree"
                                                className="form-check-input"
                                            /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <Control.select model=".contactType" name="contactType"
                                        className="form-control">
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".feedback" id="feedback" name="feedback"
                                        rows="12"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;