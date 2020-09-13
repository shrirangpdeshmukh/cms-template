import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
export class Card extends Component {
  render() {
    return (
      <Row>
        <Col md={12} xs={12}>
          <div
            className={"card" + (this.props.plain ? " card-plain" : "")}
            style={{
              borderRadius: "10px",
              boxShadow: "17px 14px 22px -18px rgba(97,76,97,1)",
              border: "0.2px solid #ccc",
              paddingBottom: "0",
              marginBottom: "6px",
            }}
          >
            <span
              className="text-muted small pull-right"
              style={{ padding: "10px", paddingRight: "12px" }}
            >
              {this.props.stats}
            </span>
            <div className="header">
              <a href={this.props.userLink}>
                <h4
                  className="title"
                  style={{
                    fontSize: "0.98em",
                    color: "black",
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  {this.props.title}
                </h4>
              </a>
            </div>
            <div className={"content"} style={{ fontSize: "0.9em" }}>
              {this.props.content}
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Card;
