import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

    function RenderDish({dish}){

        if (dish != null) {
            return (
                <React.Fragment>
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg width="100%" src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1" >
                        <h2>Comments</h2>
                        <RenderComments dish={dish} />
                    </div>
                </React.Fragment>
            )
        }
        else {
            return (<div></div>)
        }
    }
    
    const DishDetails = (props) => {
        //const { dish } = props;
        return (
            <div className="row">
                <RenderDish dish={props.dish} />
            </div>
        );
    }

    function RenderComments({dish}) {
        if (dish != null) {
            var comments = dish.comments;
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
                </ul>
            )
        }
        else {
            return (<div></div>)
        }
    }

export default DishDetails;