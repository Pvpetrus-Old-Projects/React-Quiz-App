import axios from 'axios'; 
axios.defaults.baseURL = "http://localhost:7777/"; 

export const getAllQuizes = async () => { 
    try {
        const response = await axios.get("quizes");
        return response.data;
    } catch (error) {
        return error;
    }
}
    
export const getQuizById = async (id) => { 
    try {
        const response = await axios.get('quizes/' + id);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const addQuiz = async (body) => {
    try {
        const response = await axios.post("/quizes", body);
        return response;
    } catch (error) {
        return error;
    }
}

export const editQuiz = async (id, body) => {
    try {
        const response = await axios.put("/quizes/" + id, body);
        return response;
    } catch (error) {
        return error;
    }
}

export const deleteQuiz = async (id) => { 
    try {
        const response = await axios.delete("/quizes/" + id);
        return response;
    } catch (error) {
        return error;
    }
}