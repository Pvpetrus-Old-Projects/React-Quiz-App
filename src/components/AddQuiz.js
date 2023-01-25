import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as QuizesApi from '../api/QuizesApi'
import * as yup from 'yup';
import ValidationErrors from './ValidationErrors';
import PropTypes from "prop-types"
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

class AddQuiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index_nr: 1,
            category: '',
            question: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            right_answer_index: '',
            categoryErrors: [],
            questionErrors: [],
            answer1Errors: [],
            answer2Errors: [],
            answer3Errors: [],
            answer4Errors: [],
            right_answer_indexErrors: []
        };
        QuizesApi.getAllQuizes()
            .then(quizes => {
                if (quizes.length > 0) {
                    this.setState({
                        index_nr: Math.max(...quizes.map(quiz => quiz.index_nr)) + 1
                    })
                } else {
                    this.setState({
                        index_nr: 1
                    })
                }
            })

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    async handleInputChange(e) {
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

    async onClick() {

        const isFormValid = await this.validateForm();

        if (isFormValid) {
            this.props.addQuiz(this.state)

            this.setState({
                index_nr: this.state.index_nr + 1,
                category: '',
                question: '',
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: '',
                right_answer_index: '',
                categoryErrors: [],
                questionErrors: [],
                answer1Errors: [],
                answer2Errors: [],
                answer3Errors: [],
                answer4Errors: [],
                right_answer_indexErrors: []
            })
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

                err.inner.forEach((f, index) => {
                    const errorMessage = {
                        id: index,
                        message: f.message
                    };

                    if (f.path === 'category') {
                        categoryErrors.push(errorMessage);
                    }
                    else if (f.path === 'question') {
                        questionErrors.push(errorMessage);
                    }
                    else if (f.path === 'answer1') {
                        answer1Errors.push(errorMessage);
                    }
                    else if (f.path === 'answer2') {
                        answer2Errors.push(errorMessage);
                    }
                    else if (f.path === 'answer3') {
                        answer3Errors.push(errorMessage);
                    }
                    else if (f.path === 'answer4') {
                        answer4Errors.push(errorMessage);
                    }
                    else if (f.path === 'right_answer_index') {
                        right_answer_indexErrors.push(errorMessage);
                    }
                });

                this.setState({
                    categoryErrors: categoryErrors,
                    questionErrors: questionErrors,
                    answer1Errors: answer1Errors,
                    answer2Errors: answer2Errors,
                    answer3Errors: answer3Errors,
                    answer4Errors: answer4Errors,
                    right_answer_indexErrors: right_answer_indexErrors,
                });
            }
            )

        return isFormValid;
    }

    render() {
        return (
            <div style={{backgroundColor: "lightblue",
            width:'25%',
            'text-align':'center',
            'margin':'auto',
            'margin-top':'25px',
            'border':'double',
            padding:'25px'}}>
                <h1>Dodaj quiz</h1>
                <input type="text" placeholder="Kategoria" id="category" onChange={this.handleInputChange} value={this.state.category} className="mb-2" /><br></br>
                <ValidationErrors errorMessages={this.state.categoryErrors}></ValidationErrors>

                <input type="text" placeholder="Pytanie" id="question" onChange={this.handleInputChange} value={this.state.question} className="mb-2" /><br></br>
                <ValidationErrors errorMessages={this.state.questionErrors}></ValidationErrors>

                <input type="text" placeholder="Odpowiedź 1" id="answer1" onChange={this.handleInputChange} value={this.state.answer1} className="mb-2" /><br></br>
                <ValidationErrors errorMessages={this.state.answer1Errors}></ValidationErrors>

                <input type="text" placeholder="Odpowiedź 2" id="answer2" onChange={this.handleInputChange} value={this.state.answer2} className="mb-2" /><br></br>
                <ValidationErrors errorMessages={this.state.answer2Errors}></ValidationErrors>

                <input type="text" placeholder="Odpowiedź 3" id="answer3" onChange={this.handleInputChange} value={this.state.answer3} className="mb-2" /><br></br>
                <ValidationErrors errorMessages={this.state.answer3Errors}></ValidationErrors>

                <input type="text" placeholder="Odpowiedź 4" id="answer4" onChange={this.handleInputChange} value={this.state.answer4} className="mb-2" /><br></br>
                <ValidationErrors errorMessages={this.state.answer4Errors}></ValidationErrors>

                <input type="number" placeholder="Poprawna odpowiedź" id="right_answer_index" onChange={this.handleInputChange} onKeyDown={this.handleInputChange} value={this.state.right_answer_index} className="mb-2" /><br></br>
                <ValidationErrors errorMessages={this.state.right_answer_indexErrors}></ValidationErrors>

                <button className='btn btn-primary rounded' onClick={this.onClick}>Dodaj</button>
            </div>
        );
    }
}

AddQuiz.propTypes = {
    addQuiz: PropTypes.func
  }
  
export default AddQuiz