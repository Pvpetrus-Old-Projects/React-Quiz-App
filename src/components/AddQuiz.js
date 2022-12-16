import React from 'react';
import { Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class AddQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: '',
            question: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            right_answer_index: undefined
        };
    }

    onChange(e) {
        var name = e.target.id;
        this.setState({
            [name]: e.target.value
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

    render() {
        return (
            <div>
                <h1>Dodaj quiz</h1>
                <input type="text" placeholder="Kategoria" id="category" onChange={(e) => this.onChange(e)} />
                <input type="text" placeholder="Pytanie" id="question" onChange={(e) => this.onChange(e)} /><br/>
                <input type="text" placeholder="Odpowiedź 1" id="answer1" onChange={(e) => this.onChange(e)} />
                <input type="text" placeholder="Odpowiedź 2" id="answer2" onChange={(e) => this.onChange(e)} />
                <input type="text" placeholder="Odpowiedź 3" id="answer3" onChange={(e) => this.onChange(e)} />
                <input type="text" placeholder="Odpowiedź 4" id="answer4" onChange={(e) => this.onChange(e)} /><br/>
                <input type="number" placeholder="Poprawna odpowiedź" id="right_answer_index" onChange={(e) => this.onChange(e)} />
                <button onClick={() => this.props.addQuiz(this.state)}>Dodaj</button>
            </div>
        );
    }
}

export default AddQuiz