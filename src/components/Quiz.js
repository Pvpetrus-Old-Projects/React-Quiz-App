import React from "react";
import PropTypes from "prop-types"
import * as Icon from "react-bootstrap-icons"
const Quiz = (props) => {
    return (
      <div style={{backgroundColor: "lightblue",
      width:'25%',
      'text-align':'center',
      'margin':'auto',
      'margin-top':'25px',
      'border':'double',
      'padding-bottom':'15px',}}><br/>


        <h3>{props.index_nr}  {props.category}</h3>
        <p>{props.question}</p>
        <div style={{'padding-left':'85px','text-align':'left',}}>
        <ol>
        {props.answers.map((answer, key) => {
            return <li key={key} >{answer}</li>
        })}
        </ol>
        </div>
        <p>Poprawna odpowiedź: {props.right_answer_index}</p>
        <div className="justifyRow">
        <div onClick={() => props.showEditForm(props.index_nr)}>
            <Icon.Pencil size={32} color="blue" className="item" />
            <i>Edit</i>
        </div>
        <div onClick={() => props.showDeleteForm(props.index_nr)}>
            <Icon.Trash size={30} color="black" className="item" />
            <i>Delete</i>
        </div>
        </div>
      </div>
    );
  };

  Quiz.propTypes = {
    index_nr: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    right_answer_index: PropTypes.number.isRequired
  }
  
  export default Quiz;