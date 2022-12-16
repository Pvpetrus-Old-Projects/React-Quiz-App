import React from 'react';
import { Button } from 'react-bootstrap';
import * as Icon from "react-bootstrap-icons"

const DeleteForm = (props) => {
    const { index, deleteQuiz, onClose } = props;
    return (
        <div className='alertForm'>
            <span className='closeButton'>
                <Icon.XCircleFill color="dimgray" size={18} onClick={() => onClose()} />
            </span>
            <div className='ImportantInfoInAlert'>
                <Icon.Info size={60} color ="#017BFF" />
                Czy jesteś pewny, że chcesz usunąć ten quiz?
            </div>
            <div className='quizDeleteButtons'>
                <Button variant='primary' onClick={() => onClose()}>Nie</Button>
                <Button variant='danger' style={{ marginLeft: "10px" }} 
                    onClick={() => {
                        deleteQuiz(index);
                        onClose();
                    }}>Tak</Button>
            </div>
        </div>
    );
}

export default DeleteForm