import { Box, Typography } from "@mui/material";
import { Team } from "../../../interfaces/Team";

interface TeamsListProps{
    team:Team[];
    onTeamSelect:(selectedTeam:Team)=>void;
}
const TeamsList:React.FC<TeamsListProps> =({team,onTeamSelect})=>{
    return <Box>
        {team.map((data)=>{
            return <Box onClick={()=>{onTeamSelect(data)}}> <Typography> {data.name}</Typography></Box>
        })}
    </Box>
}
export default TeamsList;