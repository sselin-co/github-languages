import React from "react";
import "../App.css";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";

class FieldEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.result = { value: "" };
    this.list = [];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    // this.props.passToContainer(this.list);
    this.props.passToContainer(this.state.value);
    event.preventDefault();
  }
  render() {
    const SubmitButton = () => {
      if (this.props.isLoading === true)
        return (
          <Button
            className="FieldEntry-input"
            variant="secondary"
            type="submit"
            disabled
          >
            <div>
              Loading...
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </div>
          </Button>
        );
      else
        return (
          <Button
            className="FieldEntry-input"
            variant="secondary"
            type="submit"
          >
            Submit
          </Button>
        );
    };
    return (
      <div>
        <header className="App-header">
          <div>
            <p>
              Enter a GitHub username to see a graphical overview of all the
              languages used across its (public) repositories.
            </p>
          </div>
        </header>
        <Form className="FieldEntry-input" onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Row className="align-items-center">
              <Col>
                <Form.Label visuallyHidden>GitHub Username</Form.Label>
              </Col>
              <Row>
                <Col>
                  <Form.Control
                    value={this.state.value}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Enter username"
                  />
                </Col>
              </Row>
            </Row>
            <Row>
              <Col>
                <SubmitButton />
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default FieldEntry;
