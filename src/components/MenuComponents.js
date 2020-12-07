import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import Dishdetail from "./DishdetailComponent";

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        }
    }

    onDishSelect(dish) {
        this.setState({
            selectedDish: dish
        })
    }

    renderDish(dish) {
        if (dish == null) {
            return (
                <div></div>
            )
        }

        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.text} />
                <CardBody>
                    <CardTitle> {dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.text} />
                        <CardImgOverlay className="ml-5">
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div >
            );
        });

        return (
            <div className="container" >
                <div className="row">
                    {menu}
                </div>
                <Dishdetail dish={this.state.selectedDish} />
            </div>
        );
    }

}
export default Menu;