import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api'
});

export const createTeam = payload => api.post(`/teams`, payload);

const apis = {
    createTeam
};

export default apis;