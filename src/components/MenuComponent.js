import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';
import DishDetail from './DishdetailComponent';


function RenderMenuItem ({dish, onClick}) {
    return (
        <Card onClick={()=>onClick(dish.id)} >
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    );
}

function RenderDish({dish,comments}) {
    if (dish != null){
        return(
            <DishDetail dish={dish} comments={comments.filter(item=>item.dishId === dish.id)} />
        );}
    else
        return(
            <div></div>
        );
}

const Menu = (props) => {
    
    const menu = props.dishes.map((dish) => {
        return (
            <div className="col-12 col-md-5 m-1"  key={dish.id}>
                <RenderMenuItem dish={dish} onClick={props.onClick} />
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                {menu}
            </div>
            <div className="row">
              <div  className="col-12 m-1">
                <RenderDish dish={props.dishes[props.selectedDish]} comments={props.comments} />
                {/* {renderDish(props.dishes[props.selectedDish],props.comments.filter(item=>item.dishId===props.selectedDish))} */}
              </div>
            </div>
        </div>
    );
}

export default Menu;
