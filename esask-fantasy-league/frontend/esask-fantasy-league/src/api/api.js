import axios from 'axios';
import backendHost from "./backendHost";

const api = axios.create({
    baseURL: backendHost.BACKEND_HOST + '/api'
});

export const createTeam = payload => api.post(`/teams`, payload);

const apis = {
    createTeam
    
};

export default apis;