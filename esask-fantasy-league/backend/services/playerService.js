
PlayerListService =  (res_data) =>{
    const sorted_res = res_data.sort((a,b) => (a.leaguePoints < b.leaguePoints) ? 1 : -1);

    for(let i = 0; i < sorted_res.length; i++){
        sorted_res[i].pos = i+1;
        if(i < 40){
            sorted_res[i].value =12500;
        }

        if(i > 39 && i < 100){
            sorted_res[i].value =10000;
        }

        if(i > 99 && i < 200){
            sorted_res[i].value =7500;
        }

        if(i > 199){
            sorted_res[i].value =0;
        }
    }

    return sorted_res;
}

module.exports = {PlayerListService};