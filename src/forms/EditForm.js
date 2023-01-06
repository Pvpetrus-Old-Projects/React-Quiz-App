import React from 'react';
import { Button } from 'react-bootstrap';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as Icon from "react-bootstrap-icons"
import * as yup from 'yup';
import ValidationErrors from '../components/ValidationErrors';

const formSchema = yup.object().shape({
    category: yup.string().required("This field is required"),
    question: yup.string().required("This field is required"),
    answer1: yup.string().required("This field is required"),
    answer2: yup.string().required("This field is required"),
    answer3: yup.string().required("This field is required"),
    answer4: yup.string().required("This field is required"),
    right_answer_index: yup.number().typeError("This field is required and has to be a number")
        .positive("The number must be positive")
        .integer("The number must be an integer")
        .max(4, "The number cannot be greater than 4")
});

class EditForm extends React.Component {
    constructor(props) {
        super(props);
        var q = props.quizes.filter(quiz => quiz.index_nr === props.index);

        this.state = {
            category: q[0].category,
            question: q[0].question,
            answer1: q[0].answers[0],
            answer2: q[0].answers[1],
            answer3: q[0].answers[2],
            answer4: q[0].answers[3],
            right_answer_index: q[0].right_answer_index,
            categoryErrors: [],
            questionErrors: [],
            answer1Errors: [],
            answer2Errors: [],
            answer3Errors: [],
            answer4Errors: [],
            right_answer_indexErrors: []
        }

        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    async onChange(e) {
        var name = e.target.id;

        this.setState({
            [name]: e.target.value
        })

        let errors = [];

        await yup.reach(formSchema, name).validate(e.target.value)
            .catch(err => {

                const error = {
                    id: 0,
                    message: err.message
                };

                errors.push(error);
            });

        this.setState({
            [name + 'Errors']: errors
        })
    }
    async submitForm(index) {
        const isFormValid = await this.validateForm();

        if (isFormValid) {
            this.props.editQuiz(index, this.state);
            this.props.onClose();
        }
    }
    async validateForm() {
        const categoryErrors = [];
        const questionErrors = [];
        const answer1Errors = [];
        const answer2Errors = [];
        const answer3Errors = [];
        const answer4Errors = [];
        const right_answer_indexErrors = [];

        let isFormValid = true;

        await formSchema.validate({
            category: this.state.category,
            question: this.state.question,
            answer1: this.state.answer1,
            answer2: this.state.answer2,
            answer3: this.state.answer3,
            answer4: this.state.answer4,
            right_answer_index: this.state.right_answer_index,
        }, { abortEarly: false })
            .catch(err => {
                isFormValid = false;
            })

        return isFormValid;
    }

    render() {
        const { index, quizes, editQuiz, onClose } = this.props;
        var q = quizes.filter(quiz => quiz.index_nr === index);
        return (
            <div className='alertForm'>
                <span className='closeButton'>
                    <Icon.XCircleFill color="dimgray" size={18} onClick={() => onClose()} />
                </span>
                <div className='quizCategoryEdit'>
                    <label className='quizEditLabel'>Kategoria: </label>
                    <input type="text" id="category" defaultValue={q[0].category} style={{ border: "none" }} onChange={this.onChange} />
                    <ValidationErrors errorMessages={this.state.categoryErrors}></ValidationErrors>
                </div>
                <div className='quizQuestionEdit'>
                    <label className='quizEditLabel'>Pytanie: </label>
                    <input type="text" id="question" defaultValue={q[0].question} style={{ border: "none" }} onChange={this.onChange} />
                    <ValidationErrors errorMessages={this.state.questionErrors}></ValidationErrors>
                </div>
                <div className='quizAnswerEdit'>
                    <label className='quizEditLabel'>Odpowiedź 1: </label>
                    <input type="text" id="answer1" defaultValue={q[0].answers[0]} style={{ border: "none" }} onChange={this.onChange} />
                    <ValidationErrors errorMessages={this.state.answer1Errors}></ValidationErrors>
                </div>
                <div className='quizAnswerEdit'>
                    <label className='quizEditLabel'>Odpowiedź 2: </label>
                    <input type="text" id="answer2" defaultValue={q[0].answers[1]} style={{ border: "none" }} onChange={this.onChange} />
                    <ValidationErrors errorMessages={this.state.answer2Errors}></ValidationErrors>
                </div>
                <div className='quizAnswerEdit'>
                    <label className='quizEditLabel'>Odpowiedź 3: </label>
                    <input type="text" id="answer3" defaultValue={q[0].answers[2]} style={{ border: "none" }} onChange={this.onChange} />
                    <ValidationErrors errorMessages={this.state.answer3Errors}></ValidationErrors>
                </div>
                <div className='quizAnswerEdit'>
                    <label className='quizEditLabel'>Odpowiedź 4: </label>
                    <input type="text" id="answer4" defaultValue={q[0].answers[3]} style={{ border: "none" }} onChange={this.onChange} />
                    <ValidationErrors errorMessages={this.state.answer4Errors}></ValidationErrors>
                </div>
                <div className='quizRightAnswerIndexEdit'>
                    <label className='quizEditLabel'>Poprawna odpowiedź: </label>
                    <input type="number" id="right_answer_index" defaultValue={q[0].right_answer_index} style={{ border: "none" }} onChange={this.onChange} />
                    <ValidationErrors errorMessages={this.state.right_answer_indexErrors}></ValidationErrors>
                </div>
                <div className='quizEditButton'>
                    <Button variant='primary' onClick={() => this.submitForm(index)}>Zapisz</Button>
                </div>
            </div>
        );
    }
}

export default EditForm