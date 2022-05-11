import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb,BreadcrumbItem } from "reactstrap";
import {Link} from 'react-router-dom'
export default class DishDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { comments } = this.props;
    const dish = this.props.dishes[this.props.selectedDish];
    
    
    const renderDish = () => {
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle> <b> {dish.name} </b></CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    };

    const renderComments = () => {
      return (
        <Card>
          <CardBody>
            <h4>Comments</h4>
            <div className="list-group">
              {comments.map((item) => (
                <li key={item.id} className="list-group-item">
                  {item.comment} <br /> --- {item.author},
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(item.date)))}{" "}
                </li>
              ))}
            </div>
          </CardBody>
        </Card>
      );
    };
    
    return (
     < div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {renderDish()}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {renderComments()}
                    </div>
                </div>
            </div>

      // <div className="row col-12">
      //   <div className="col-12 col-md-5 m-1">{renderDish(dishprops)}</div>
      //   <div className="col-12 col-md-5 m-1">{renderComments(comments)}</div>
      // </div>
    );
  }
}
