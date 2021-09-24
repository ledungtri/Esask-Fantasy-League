import axios from 'axios';
import backendHost from "../../api/backendHost";
export async function getData(sumonnerIDProp) {
    const response = await axios.get(
        'http://localhost:3001/api/player/'+ sumonnerIDProp, {
          headers: {
            
          }
        }  //this should be replaced by props.sumonnerID or sumonnerIDProp
      );
    
      return response;
}