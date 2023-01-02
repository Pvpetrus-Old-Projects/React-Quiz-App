import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as QuizesApi from '../api/QuizesApi'

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
            right_answer_index: ''
        };
        QuizesApi.getAllQuizes()
        .then(quizes => {
        if(quizes.length > 0){
            this.setState({
                index_nr: Math.max(...quizes.map(quiz => quiz.index_nr)) + 1
            })
        } else{
            this.setState({
                index_nr: 1
            })
        }
        })
    }

    onChange(e) {
        var name = e.target.id;
        this.setState({
            [name]: e.target.value
        })
    }

    onClick() {
        this.props.addQuiz(this.state)
        this.setState({
            index_nr: this.state.index_nr+1,
            category: '',
            question: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            right_answer_index: ''
        })
    }

    render() {
        return (
            <div>
                <h1>Dodaj quiz</h1>
                <input type="text" placeholder="Kategoria" id="category" onChange={(e) => this.onChange(e)} value={this.state.category}/>
                <input type="text" placeholder="Pytanie" id="question" onChange={(e) => this.onChange(e)} value={this.state.question}/><br/>
                <input type="text" placeholder="Odpowiedź 1" id="answer1" onChange={(e) => this.onChange(e)} value={this.state.answer1}/>
                <input type="text" placeholder="Odpowiedź 2" id="answer2" onChange={(e) => this.onChange(e)} value={this.state.answer2}/>
                <input type="text" placeholder="Odpowiedź 3" id="answer3" onChange={(e) => this.onChange(e)} value={this.state.answer3}/>
                <input type="text" placeholder="Odpowiedź 4" id="answer4" onChange={(e) => this.onChange(e)} value={this.state.answer4}/><br/>
                <input type="number" placeholder="Poprawna odpowiedź" id="right_answer_index" onChange={(e) => this.onChange(e)} value={this.state.right_answer_index}/>
                <button onClick={() => this.onClick()}>Dodaj</button>
            </div>
        );
    }
}

export default AddQuiz