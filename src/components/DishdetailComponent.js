import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  FormFeedback
} from "reactstrap";
import { Link } from "react-router-dom";

class CommentFrom extends React.Component {
  constructor(props){
    super(props)
    this.state={
      isOpen:false,
      rating:1,
      name:"",
      comment:"",
    }
    this.onToggle = this.onToggle.bind(this)
    this.validateForm = this.validateForm.bind(this)
    
  }
  
  onToggle = ()=>{
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen
    })
  }

  unControllFromInput =(state,value)=>{
    let inputstate = {...this.state}
    inputstate[state] = value
    this.setState(inputstate)
  }

  validateForm = ()=>{
    if(this.state.name.length < 3) return "Must be greater than 2 characters"
    if(this.state.name.length > 15) return "Must be 15 characters or less"
    return null
  }

  render(){
    return(
      <>
      <Modal isOpen={this.state.isOpen} toggle={()=>this.onToggle()} >
        <ModalHeader toggle={()=>this.onToggle()} >Submit Comment</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Rating</Label>
              <Input type="number" onChange={(e)=>this.unControllFromInput("rating",e.target.value)}  min={1} max={5} defaultValue={1} />
            </FormGroup>
            <FormGroup>
              <Label>Your Name</Label>
              <Input invalid={this.validateForm() !== null} valid={!this.validateForm()} type="text" onChange={(e)=>this.unControllFromInput("name",e.target.value)} />
              <FormFeedback>{this.validateForm()}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>Comment</Label>
              <Input type="textarea" rows="6" onChange={(e)=>this.unControllFromInput("comment",e.target.value)}   />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <div style={{width:"100%"}}>
          <Button className="btn-info mr-auto" disabled={this.validateForm() !== null}  onClick={this.onToggle}  >Submit</Button>
          </div>
        </ModalFooter>
      </Modal>
      <Button outline className="mt-3" onClick={this.onToggle} > <span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
      </>
    )
  }
}

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
            <CardTitle>
              {" "}
              <b> {dish.name} </b>
            </CardTitle>
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
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">{renderDish()}</div>
          <div className="col-12 col-md-5 m-1">{renderComments()}
          <CommentFrom />
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
