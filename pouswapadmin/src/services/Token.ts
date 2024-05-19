import axios from "axios";

class Token {
    getAll = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tokens/`);
        return response.data;
    }
}

export default Token;