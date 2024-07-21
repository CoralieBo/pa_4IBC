import axios from "axios";

class StatsService {
    getCryptoStats = async () => {
        try {
            const response = await axios.get(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=${process.env.REACT_APP_CRYPTO_COMPARE_KEY}`);
            return response.data.Data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}

export default StatsService;
