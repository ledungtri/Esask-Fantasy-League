import axios from 'axios';
import backendHost from "../../api/backendHost";

let URL="";

export async function getData(sumonnerIDProp, startDate=null, endDate=null) {
  if(startDate!=null & endDate!=null)
     URL = backendHost.BACKEND_HOST + '/api/player/'+sumonnerIDProp+'/'+startDate+'/'+endDate;
  else 
    URL = backendHost.BACKEND_HOST + '/api/player/'+sumonnerIDProp;


    const response = await axios.get(
        URL, {
          headers: {

          }
        }  
      );
    
      return response;
}