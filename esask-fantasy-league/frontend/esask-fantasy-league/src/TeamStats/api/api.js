import axios from 'axios';
import backendHost from "../../api/backendHost";
export async function getData(teamID, startDate, endDate) {
    const response = await axios.get(
        backendHost.BACKEND_HOST + '/api/teams/'+ teamID+'/'+startDate+'/'+endDate, {
          headers: {

          }
        }  
      );
    
      return response;
}