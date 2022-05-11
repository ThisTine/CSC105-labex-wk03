import React, { Component } from "react";
import { connect } from 'react-redux';
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import { Switch, Route, Redirect,withRouter } from "react-router-dom";
import DishDetail from './DishdetailComponent';
import Contact from "./ContactComponent";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const DishWithId = (props) => { 
  const {match:{params:{dishId}}} = props
  return(
    <div className="container my-5">
      {dishId && <DishDetail 
      comments={props.comments.filter(item=>item.dishId+"" === dishId)} 
      dishes={props.dishes} selectedDish={dishId}  />}
    </div>
  );
};


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      selectedDish: null,
    };
    this.onDishSelect = this.onDishSelect.bind(this);
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  // componentDidMount(){
  //   console.log(this.props)
  // }

  render() {
    const HomePage = () => {
      
      return(
          <Home 
              dish={this.props.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/menu"
            component={() => (
              <Menu
                dishes={this.props.dishes}
                onClick={this.onDishSelect}
                selectedDish={this.state.selectedDish}
                comments={this.state.comments}
              />
            )}
          />
          <Route exact path="/contactus" component={Contact} />
          <Route path='/menu/:dishId' component={connect(mapStateToProps)(DishWithId)} />
          <Redirect to="/home" />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
