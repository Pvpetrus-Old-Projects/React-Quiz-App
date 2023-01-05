import React from "react";
import PropTypes from "prop-types"
import * as Icon from "react-bootstrap-icons"
import * as QuizesApi from '../api/QuizesApi'
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import QuizQuestion from "./QuizQuestion";


class Solve extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      quizQuestions: [],
      currentQuestionIndex: 0,
      answerIndex: 0,
      score: 0,
      category: "Matematyka",
      beginClicked: false,
      endOfQuiz: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.chooseQuestions = this.chooseQuestions.bind(this);
    this.loadNextQuestion = this.loadNextQuestion.bind(this);
    this.finishQuiz = this.finishQuiz.bind(this);
  }

  componentDidMount() {
    QuizesApi.getAllQuizes()
      .then(questions => {
        this.setState({
          questions: questions
        })
      })
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    })
  }
  chooseQuestions() {
    const questions = this.state.questions.filter(e => e.category === this.state.category);
    const result = [];
    const usedIndexes = [];
    let index;
    let taken;
    let requiredLength = 10;

    if (questions.length < 10) {
      requiredLength = questions.length;
    }

    while (result.length < requiredLength) {
      index = parseInt((Math.random() * (questions.length - 1)).toFixed(0));
      taken = usedIndexes.includes(index);

      if (taken === false) {
        usedIndexes.push(index);
        result.push(questions[index]);
      }
    }

    return result;
  }
  startQuiz() {
    const quizQuestions = this.chooseQuestions();

    this.setState({
      quizQuestions: quizQuestions,
      beginClicked: true,
      currentQuestionIndex: 0
    })
  }
  loadNextQuestion() {
    const point = this.state.answerIndex == this.state.quizQuestions[this.state.currentQuestionIndex].right_answer_index ? 1 : 0;

    this.setState((state) => {
      return {
        currentQuestionIndex: state.currentQuestionIndex + 1,
        score: (state.score + point),
        answerIndex: 0
      }
    })
  }
  finishQuiz() {
    this.setState({
      currentQuestionIndex: 0,
      beginClicked: false,
      endOfQuiz: true
    })
  }

  render() {
    return (
      <div>
        <Row className="mt-3">
          <Col lg={3}>
            <Form.Select name="category" value={this.state.category} onChange={e => this.handleInputChange(e)}>
              <option value="Matematyka">Matematyka</option>
              <option value="Lektury">Lektury</option>
              <option value="Przysłowia">Przysłowia</option>
            </Form.Select>
          </Col>
          <Col lg={3}>
            <Button variant="primary" className="rounded" onClick={() => this.startQuiz()}>Start the quiz</Button>
          </Col>
        </Row>
        <Container className="text-center mt-3" style={{ width: "50%" }}>
          <Row>
            {this.state.beginClicked ?
              <div>
                <QuizQuestion
                  answerIndex={this.state.answerIndex}
                  question={this.state.quizQuestions[this.state.currentQuestionIndex].question}
                  answers={this.state.quizQuestions[this.state.currentQuestionIndex].answers}
                  handleInputChange={this.handleInputChange}>
                </QuizQuestion>
                {this.state.currentQuestionIndex !== this.state.quizQuestions.length - 1 ?
                  <Button variant="primary" className="rounded mt-2" onClick={() => this.loadNextQuestion()}>Next</Button>
                  : <Button variant="primary" className="rounded mt-2" onClick={() => this.finishQuiz()}>End the quiz</Button>}
              </div>

              : <span></span>}

            {this.state.endOfQuiz ?
              <div >
                <h3 style={{color:"green"}}>You have successfully finished the quiz!</h3><br></br>
                <h4>Your score: {this.state.score}/{this.state.quizQuestions.length}</h4>
              </div>
              : <span></span>}
          </Row>
        </Container>
      </div>

    )
  }
}

Solve.propTypes = {

}

export default Solve;