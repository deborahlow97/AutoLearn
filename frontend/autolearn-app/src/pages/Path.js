import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col } from 'react-bootstrap';
import {Button, Card, CardBody, CardText, CardTitle} from "reactstrap";
import {Link} from "react-router-dom";
import axios from 'axios';
import './courses.css';

export default class Path extends Component {
    constructor () {
        super()
        this.state = {
            paths: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.upvote = this.upvote.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:5000/paths') // change this url to whichever end point to use
            .then(response => {
                return this.setState({paths: response.data})
            })
    }

    upvote(numOfVotes, index){
        numOfVotes += 1
        var myCopiedData = this.state.paths
        myCopiedData[index].votes = numOfVotes
        console.log(numOfVotes)
        this.setState({
            courses: myCopiedData
        })
        // return numOfVotes
        console.log(this.state.courses)
    }

    render() {
        const courseDetails = this.props.location.course;
        let y
        if (courseDetails == undefined) {
          y = 1
        }
        return (
            <div>
              <Container>
                <Row className="Courses-title-row">
                  <Col>
                    <h3 className="text-align-center">P A T H S</h3>
                  </Col>
                </Row>
                <Row className="Courses-subtitle-row">
                  <Col>
                    <p className="text-align-center">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type.
                    </p>
                  </Col>
                </Row>
                {(() => {switch(y) {
                  case 1:
                    return(
                      <div>
                        {this.state.paths
                            .map((path, index) => {
                            return (
                                <Card>
                                    <CardBody>
                                        <span style={{ display: "inline-flex" }}>
                                            <Button onClick={this.upvote.bind(this, path.votes, index)} className="Courses-upvote-btn" style={{ maxWidth: "100px", maxHeight: "60px", minWidth: "100px", minHeight: "30px", textAlign: "center", margin: "auto" }}>{path.votes}</Button>
                                            <span>
                                              <CardTitle>{path.name}</CardTitle>
                                              <CardText>{path.description}</CardText>
                                            </span>
                                        </span>
                                    </CardBody>
                                </Card>
                            );
                        })}
                      </div>
                    )
                  default:
                    return (
                        <div>
                            <Card>
                                <CardBody>
                                    <span style={{ display: "inline-flex" }}>
                                        <Button onClick={this.upvote.bind(this, courseDetails.votes)} className="Courses-upvote-btn" style={{ maxWidth: "100px", maxHeight: "60px", minWidth: "100px", minHeight: "30px", textAlign: "center", margin: "auto" }}>{courseDetails.votes}</Button>
                                        <span>
                                          <CardTitle>{courseDetails.name}</CardTitle>
                                          <CardText>{courseDetails.description}</CardText>
                                        </span>
                                    </span>
                                </CardBody>
                            </Card>
                            <p>Suggested Paths</p>
                            {this.state.paths
                                .filter(path => {
                                        const name = path.courses_links.split(',');
                                        return name.includes('/courses/' + courseDetails.id);
                                    }

                                )
                                .map((path, index) => {
                                return (
                                    <Card>
                                        <CardBody>
                                            <span style={{ display: "inline-flex" }}>
                                                <Button onClick={this.upvote.bind(this, path.votes, index)} className="Courses-upvote-btn" style={{ maxWidth: "100px", maxHeight: "60px", minWidth: "100px", minHeight: "30px", textAlign: "center", margin: "auto" }}>{path.votes}</Button>
                                                <span>
                                                  <CardTitle>{path.name}</CardTitle>
                                                  <CardText>{path.description}</CardText>
                                                </span>
                                            </span>
                                        </CardBody>
                                    </Card>
                                );
                            })}
                        </div>
                    );
                  }
                  })()}
              </Container>
            </div>
        );
    }
}

Path.propTypes = {

};
