import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Team } from '../interfaces/Team'; // Adjust the import path if necessary

interface TeamMembersProps {
    team: Team | null;
}

const TeamMembers: React.FC<TeamMembersProps> = ({ team }) => {
    if (!team || !team.teamMembers || team.teamMembers.length === 0) {
        return (
            <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
                <Typography variant="body1">No team members assigned.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center' }}>TEAM MEMBERS</Typography>
                            <List sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {team.teamMembers.map((member, index) => (
                                    <ListItem key={index} sx={{ width: '80%', justifyContent: 'center' }}>
                                        <ListItemText primary={member.user?.email || 'N/A'} sx={{ textAlign: 'center' }} />
                                  </ListItem>
                                ))}
                            </List>
                        </Box>
    );
};

export default TeamMembers;