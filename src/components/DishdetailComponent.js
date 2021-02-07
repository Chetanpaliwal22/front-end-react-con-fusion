import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    }
    else {
        return (<div></div>)
    }
}

function RenderComments({ comments }) {
    if (comments != null) {
        const formattedComment = comments.map(comment => {

            return (
                <React.Fragment>
                    <li>{comment.comment}</li><br />
                    <li>-- {comment.author}, {comment.date}</li><br />
                </React.Fragment>
            )
        });
        return (
            <ul className="list-unstyled">
                {formattedComment}
                <CommentForm />
            </ul>
        )
    }
    else {
        return (<div></div>)
    }
}

const DishDetail = props => {

    if (props.dish) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length < len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
    }

    render() {
        const { isModalOpen } = this.state;
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-edit fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control" >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Author"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }} />
                                    <Errors className="text-danger" model=".author" show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Should have more than 3 Characters',
                                            maxLength: 'Should have 15 or less Characters'
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="feedback" md={12}>Your feedback</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        resize="none"
                                        rows="6"
                                        className="form-control"
                                        validators={{
                                            required,
                                        }} />
                                    <Errors className="text-danger" model=".comment" show="touched"
                                        messages={{
                                            required: 'Required'
                                        }} />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
export default DishDetail;