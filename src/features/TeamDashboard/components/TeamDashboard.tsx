import { Box } from "@mui/material"

import { useEffect, useState } from "react";
import { Team } from "../../../interfaces/Team";
import TeamHeader from "./TeamHeader";
import TeamsList from "./TeamsList";
import { getTeamDetails } from "../services/api";

const TeamDashboard = ()=>{

    const [teamDetails,setTeamDetails] = useState<Team[]>([]);
    const [selectedTeamDetail,setSelectedTeamDetail]= useState<Team>();
    useEffect(()=>{
        getTeamDetails().then((data)=>{
            setTeamDetails(data);
            setSelectedTeamDetail(data[0]);
            
        })
    },[])
    
    const teams: Team[] = [
        { name: "Red Warriors", id: "team-1" },
        { name: "Blue Strikers", id: "team-2" },
        { name: "Green Titans", id: "team-3" },
        { name: "Yellow Falcons", id: "team-4" }
      ];
      const barInput=[{teamName:"t1",score:150}]
    return<Box>
        <TeamHeader  tagLine="This is my tag line" teamName="Winners"/>
        <TeamsList  team={teams} onTeamSelect={(team)=>{console.log(team.id);setSelectedTeamDetail(team)}}></TeamsList>
    </Box>
}
export default TeamDashboard;