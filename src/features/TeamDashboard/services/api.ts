import axios from "axios"
const getTeamDetails = async ()=>{
    return axios.get('backendurl'      
    ).then((result)=>{
        return result.data;
    }).catch((error)=>console.error(error))
}



export {getTeamDetails}