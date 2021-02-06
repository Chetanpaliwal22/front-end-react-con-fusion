import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Input, Label } from 'reactstrap';

function toggleModal() {
    // this.setState({
    //     isModalOpen: !this.state.isModalOpen
    // });
}

function handleLogin(event) {
    //this.toggleModal();
    alert("Username: " + this.username.value + " Password: " + this.password.value + " Remember: " + this.remember.checked);
    event.preventDefault();
}

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
                <Modal isOpen={true} >
                    <ModalHeader isOpen={true} >Submit Comment</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label htmlFor="name">Rating</Label>
                            <Input type="select" id="name" name="name" >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="name">Your Name</Label>
                            <Input type="text" id="name" name="name" />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="comment">Comment</Label>
                            <Input type="textarea"
                                name="comment" rows="6"
                            />
                        </FormGroup>
                        <Button type="submit" value="submit" color="bg-primary">Submit</Button>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;