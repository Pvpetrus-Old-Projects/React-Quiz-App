import React from 'react';
import Quiz from './Quiz';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditForm from '../forms/EditForm';
import DeleteForm from '../forms/DeleteForm';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css'
import * as QuizesApi from '../api/QuizesApi'
import PropTypes from "prop-types"
class Quizes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quizes: [],
        };
        this.showEditForm = this.showEditForm.bind(this);
        this.showDeleteForm = this.showDeleteForm.bind(this);
        this.editQuiz = this.editQuiz.bind(this);
        this.deleteQuiz = this.deleteQuiz.bind(this);
    }

    componentDidMount(){
        const {quizes} = this.state;
        if(quizes.length === 0) {
          QuizesApi.getAllQuizes()
          .then(quizes => {
            this.setState({
              quizes: quizes
            })
          })
        }
    }

    showEditForm(id) {
        const { quizes } = this.state;
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div>
                        <EditForm quizes={quizes} index={id} onClose={onClose} editQuiz={this.editQuiz} />
                        <NotificationContainer />
                    </div>
                )
            }
        })
    }

    showDeleteForm(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <DeleteForm index={id} onClose={onClose} deleteQuiz={this.deleteQuiz} />
                )
            }
        })
    }

    updateQuizesList = (action, body) => {
        switch (action) {
          case "PUT":
            var list = this.state.quizes;
            var quizIndex = list.findIndex(quiz => quiz.index_nr === body.index_nr);
            list[quizIndex].category = body.category;
            list[quizIndex].question = body.question;
            list[quizIndex].answers = body.answers;
            list[quizIndex].right_answer_index = body.right_answer_index;
            this.setState({
              quizes: list
            });
            break;
          case "DELETE":
            var list = this.state.quizes;
            var quizIndex = list.findIndex(quiz => quiz.index_nr === body);
            list.splice(quizIndex,1)
            this.setState({
              quizes: list
            });
            break;
          default:
            break;
        }
    }

    editQuiz = (index, s) => {
        var body = {
          "index_nr": index,
          "category": s.category,
          "question": s.question,
          "answers": [s.answer1,s.answer2,s.answer3,s.answer4],
          "right_answer_index": parseInt(s.right_answer_index)
        }
        QuizesApi.editQuiz(index, body)
        .then(response => {
          if (response.status === 200) {
            this.updateQuizesList("PUT", body);
          }
        });
    }

    deleteQuiz = (id) => {
        QuizesApi.deleteQuiz(id)
        .then(response => {
          if(response.status === 204) {
            this.updateQuizesList("DELETE", id)
          }
        });
    }

    render() {
        return (
            <div>
                {this.state.quizes.map((quiz, key) => {
                    return (
                        <Quiz 
                        key={key}
                        index_nr={quiz.index_nr}
                        category={quiz.category}
                        question={quiz.question}
                        answers={quiz.answers}
                        right_answer_index={quiz.right_answer_index}
                        showEditForm={this.showEditForm}
                        showDeleteForm={this.showDeleteForm}
                        />
                    );
                })}
            </div>
        );
    }
}

Quizes.propTypes = {

}

export default Quizes
