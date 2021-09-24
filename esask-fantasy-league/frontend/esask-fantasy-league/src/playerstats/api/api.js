import axios from 'axios';
import backendHost from "../../api/backendHost";
export async function getData(sumonnerIDProp) {
    const response = await axios.get(
        backendHost+'/api/player/'+ sumonnerIDProp  //this should be replaced by props.sumonnerID or sumonnerIDProp
      );
    
      return response;
}