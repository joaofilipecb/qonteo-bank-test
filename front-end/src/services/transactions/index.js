import axios from "axios";

const insertInformationService = async (data) => {
    axios.post('http://localhost:8080/register/transaction', data)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            console.log(error);
        });
}

const getTransactionsService = async () => {

    const response = await axios.get('http://localhost:8080/list/transactions');
    return response.data;

}

export { insertInformationService, getTransactionsService }