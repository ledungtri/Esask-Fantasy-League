import axios from 'axios';

export async function getData(sumonnerIDProp) {
    const response = await axios.get(
        'http://localhost:3001/api/player/'+ sumonnerIDProp  //this should be replaced by props.sumonnerID or sumonnerIDProp
      );
    
      return response;
}