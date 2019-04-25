import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col } from 'react-bootstrap';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from "axios";

export default class Courses extends Component {
    constructor() {
        super()
        this.state = {
            courses: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount() {
        axios.get('http://localhost:5000/courses') // change this url to whichever end point to use
            .then(response => {
                const myData = [].concat(response.data)
                    .sort((a, b) =>
                        // console.log(a.votes>b.votes)
                        (a.votes < b.votes) ? 1 : ((b.votes < a.votes) ? -1 : 0)
                    )

                this.setState({
                    courses: myData
                })

            })
    }

    render() {
        const topicId = this.props.location.topic_id;
        let x
        if (topicId == undefined) {
          x = 1
        }
        return (
            <div>
                <Row className="Courses-title-row">
                  <Col>
                    <h3 className="text-align-center">C O U R S E S</h3>
                  </Col>
                </Row>
                <Row className="Courses-subtitle-row">
                  <Col>
                    <p className="text-align-center">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type.
                    </p>
                  </Col>
                </Row>
                {(() => {switch(x) {
                  case 1:
                    return(
                      <div>
                        {this.state.courses
                            .map((course, index) => {
                            let tagsArr = course.tags.split(",");
                            return (
                                <Card>
                                    <Card.Body>
                                        <span style={{ display: "inline-flex" }}>
                                            <Button style={{ maxWidth: "100px", maxHeight: "60px", minWidth: "100px", minHeight: "30px", textAlign: "center", margin: "auto" }}>{course.votes}</Button>
                                            <span>
                                                <Link to={{
                                                    pathname: '/path',
                                                    course: course
                                                }}>
                                                    <Card.Title>{course.name}</Card.Title>
                                                </Link>
                                                <Card.Text>{course.description}</Card.Text>
                                            </span>
                                        </span>
                                        <Row style={{ paddingLeft: "120px" }}>
                                            {tagsArr.map((tag) => {
                                                return (
                                                    <Card.Text style={{ paddingRight: "10px", boxSizing: "border-box" }}>{tag}</Card.Text>
                                                );
                                            })}
                                        </Row>
                                    </Card.Body>
                                </Card>

                            );
                        })};
                      </div>
                    )
                  default:
                    return (
                      <div>
                        {this.state.courses
                            .filter(course => course.topic_id === topicId)
                            .map((course, index) => {
                            let tagsArr = course.tags.split(",");
                            return (
                                <Card>
                                    <Card.Body>
                                        <span style={{ display: "inline-flex" }}>
                                            <Button style={{ maxWidth: "100px", maxHeight: "60px", minWidth: "100px", minHeight: "30px", textAlign: "center", margin: "auto" }}>{course.votes}</Button>
                                            <span>
                                                <Link to={{
                                                    pathname: '/path',
                                                    course: course
                                                }}>
                                                    <Card.Title>{course.name}</Card.Title>
                                                </Link>
                                                <Card.Text>{course.description}</Card.Text>
                                            </span>
                                        </span>
                                        <Row style={{ paddingLeft: "120px" }}>
                                            {tagsArr.map((tag) => {
                                                return (
                                                    <Card.Text style={{ paddingRight: "10px", boxSizing: "border-box" }}>{tag}</Card.Text>
                                                );
                                            })}
                                        </Row>

                                    </Card.Body>
                                </Card>

                            );
                        })}
                      </div>
                    )
                  }
                  })()}
            </div>
        );
      }


}

Courses.propTypes = {

};
