import axios from 'axios';
import backendHost from "../../api/backendHost";
export async function getData(sumonnerIDProp) {
    const response = await axios.get(
        backendHost.BACKEND_HOST + '/api/player/'+ sumonnerIDProp, {
          headers: {

          }
        }  
      );
    
      return response;
}