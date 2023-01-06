import React from "react";
import PropTypes from "prop-types"
import { Card, Form } from "react-bootstrap";

function QuizQuestion(props) {

    return (
        <Card bg="info">
            <Card.Header>{props.question}</Card.Header>
            {props.answers.map((e, index) => <Card.Body key={index}>
                <Form.Check
                    style={{ float: "left" }}
                    type="radio"
                    name="answerIndex"
                    label={props.answers[index]}
                    value={index + 1}
                    onChange={f => props.handleInputChange(f)}
                    checked={props.answerIndex == index + 1}></Form.Check>
            </Card.Body>)}
        </Card>
    )
}

QuizQuestion.propTypes = {
    question: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.string),
    handleInputChange: PropTypes.func
}

export default QuizQuestion;