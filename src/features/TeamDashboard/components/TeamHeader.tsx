import { Box, Typography } from "@mui/material"
interface TeamHeaderProps{
    teamName:string;
    tagLine:string;
}
const TeamHeader:React.FC<TeamHeaderProps> =({teamName,tagLine})=>{
    return <Box display="flex" gap={0.5} flexDirection={"column"} alignItems={
        "center"
     }
     justifyContent={
    "center"
     }
     mt={2}
     sx={{backgroundColor:"red"}}
     >
        <Typography variant="h5"> {teamName} </Typography>
        <Typography variant="body2"> {tagLine}</Typography>
    </Box>
}
export default TeamHeader;