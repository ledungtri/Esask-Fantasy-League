// Checking if contest is open

CheckContestOpen = (res_data) => {
    
    for (i = 0; i < res_data.length; i++){
        if (res_data[i].startDate > Date.now){
            res_data[i].isContestOpen = true;
         } else {
             res_data[i].isContestOpen = false;
         }
    }   
}

module.exports = {CheckContestOpen};