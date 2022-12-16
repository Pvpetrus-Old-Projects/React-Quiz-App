import React from 'react';
import { Button } from 'react-bootstrap';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as Icon from "react-bootstrap-icons"

class EditForm extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.index)
        console.log(props.quizes)
        var q = props.quizes.filter(quiz => quiz.index_nr===props.index);

        this.state = {
            editCategory: q[0].category,
            editQuestion: q[0].question,
            editAnswer1: q[0].answers[0],
            editAnswer2: q[0].answers[1],
            editAnswer3: q[0].answers[2],
            editAnswer4: q[0].answers[3],
            editRightAnswerIndex: q[0].right_answer_index
        }
    }

    onChange(e) {
        var name = e.target.id;
        this.setState({
            [name]: e.target.value
        })
    }

    render() {
        const { index, quizes, editQuiz, onClose } = this.props;
        var q = quizes.filter(quiz => quiz.index_nr===index);
        return (
            <div className='alertForm'>
                <span className='closeButton'>
                    <Icon.XCircleFill color="dimgray" size={18} onClick={() => onClose()} />
                </span>
                <div className='quizCategoryEdit'>
                    <label className='quizEditLabel'>Kategoria: </label>
                    <input type="text" id="editCategory" defaultValue={q[0].category} style={{border: "none"}} onChange={(e) => this.onChange(e)} />
                </div>
                <div className='quizQuestionEdit'>
                    <label className='quizEditLabel'>Pytanie: </label>
                    <input type="text" id="editQuestion" defaultValue={q[0].question} style={{border: "none"}} onChange={(e) => this.onChange(e)} />
                </div>
                <div className='quizAnswerEdit'>
                    <label className='quizEditLabel'>Odpowiedź 1: </label>
                    <input type="text" id="editAnswer1" defaultValue={q[0].answers[0]} style={{border: "none"}} onChange={(e) => this.onChange(e)} />
                </div>
                <div className='quizAnswerEdit'>
                    <label className='quizEditLabel'>Odpowiedź 2: </label>
                    <input type="text" id="editAnswer2" defaultValue={q[0].answers[1]} style={{border: "none"}} onChange={(e) => this.onChange(e)} />
                </div>
                <div className='quizAnswerEdit'>
                    <label className='quizEditLabel'>Odpowiedź 3: </label>
                    <input type="text" id="editAnswer3" defaultValue={q[0].answers[2]} style={{border: "none"}} onChange={(e) => this.onChange(e)} />
                </div>
                <div className='quizAnswerEdit'>
                    <label className='quizEditLabel'>Odpowiedź 4: </label>
                    <input type="text" id="editAnswer4" defaultValue={q[0].answers[3]} style={{border: "none"}} onChange={(e) => this.onChange(e)} />
                </div>
                <div className='quizRightAnswerIndexEdit'>
                    <label className='quizEditLabel'>Poprawna odpowiedź: </label>
                    <input type="number" id="editRightAnswerIndex" defaultValue={q[0].right_answer_index} style={{border: "none"}} onChange={(e) => this.onChange(e)} />
                </div>
                <div className='quizEditButton'>
                    <Button variant='primary' onClick={() => editQuiz(index, this.state)}>Zapisz</Button>
                </div>
            </div>
        );
    }
}

export default EditForm