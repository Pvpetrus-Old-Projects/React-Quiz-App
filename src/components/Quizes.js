import React from 'react';
import Quiz from './Quiz';
import AddQuiz from './AddQuiz'
import { Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import QuizClass from '../class/QuizClass';
import EditForm from '../forms/EditForm';
import DeleteForm from '../forms/DeleteForm';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css'
import NotificationManager from 'react-notifications/lib/NotificationManager';

class Quizes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quizes: [...props.quizes],
        };
        this.showEditForm = this.showEditForm.bind(this);
        this.showDeleteForm = this.showDeleteForm.bind(this);
        this.addQuiz = this.addQuiz.bind(this);
        this.editQuiz = this.editQuiz.bind(this);
        this.deleteQuiz = this.deleteQuiz.bind(this);
    }

    createNotification(message) {
        NotificationManager.success('Success', message);
    }

    onChange(e) {
        var name = e.target.id;
        this.setState({
            [name]: e.target.value
        })
    }

    showEditForm(id) {
        console.log(id)
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

    onClick() {
        confirmAlert({
            customUI: ({onClose}) => {
                <div>
                    <hi>Dodaj zawartość</hi>
                    <p><textarea cols="50" rows="10" id="question" defaultValue={this.state.question} onChange={(e) => this.onChange(e)}></textarea></p>
                    <Button style={{float: "right"}} variant="danger" onClick={onClose} >Zamknij</Button>
                </div>
            }
        })
    }

    addQuiz(s) {
        this.setState(state => {
            var quizes = state.quizes;
            var id;
            if(quizes.length > 0) id = Math.max(...state.quizes.map(quiz => quiz.index_nr)) + 1;
            else id = 1;
            var answers = [s.answer1, s.answer2, s.answer3, s.answer4];
            let newQuiz = new QuizClass(id, s.category, s.question, answers, parseInt(s.right_answer_index));
            quizes.push(newQuiz);
            return {quizes: quizes}
        });
    }

    editQuiz(index, s) {
        this.setState(state => {
            var quizes = state.quizes;
            var q = quizes.map(quiz => {
                if(quiz.index_nr===index) {
                    quiz.category = s.editCategory
                    quiz.question = s.editQuestion
                    var editAnswers = [s.editAnswer1,s.editAnswer2,s.editAnswer3,s.editAnswer4]
                    quiz.answers = editAnswers
                    quiz.right_answer_index = parseInt(s.editRightAnswerIndex)
                    return quiz;
                }
                else {
                    return quiz;
                }
            })
            return {quizes: q}
        });
        this.createNotification('Quiz został edytowany');
    }

    deleteQuiz(index) {
        this.setState(state => {
            var quizes = state.quizes;
            var q = quizes.filter(quiz => quiz.index_nr!==index);
            return {quizes: q}
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
                <AddQuiz addQuiz={this.addQuiz} />
            </div>
        );
    }
}

export default Quizes
