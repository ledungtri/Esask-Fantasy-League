import axios from 'axios';

const api = axios.create({
    baseURL : 'http://localhost:3001/api'
})

//_id is the players accountID and sId is the sumonnerID 
export const getPlayerByName = (_id) => api.get(`/player/${_id}`);
//export const getPlayerByName = (_id, _sId) => api.get(`/player/${_id}/${_sId}`);

const apis = {
    getPlayerByName
}

export default apis;