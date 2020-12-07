import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    renderDishDetails(dish) {

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
                        {this.renderComments(dish)}
                    </div>
                </React.Fragment>
            )
        }
        else {
            return (<div></div>)
        }
    }

    render() {
        const { dish } = this.props;
        return (
            <div className="row">
                {this.renderDishDetails(dish)}
            </div>
        );
    }

    renderComments(dish) {
        if (dish != null) {
            var comments = dish.comments;
            const formattedComment = comments.map(comment => {

                return (
                    <React.Fragment>
                        <li>{comment.comment}</li><br />
                        <li>-- {comment.author}, {this.formatDate(comment.date)}</li><br />
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

    formatDate(date) {
        var dateFormat = require('dateformat');
        var newDate = dateFormat(date, "mmm, dd, yyyy");
        return newDate;
    }
}
export default Dishdetail;