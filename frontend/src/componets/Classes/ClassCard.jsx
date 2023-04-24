import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card, CardActions,
    CardContent, CardHeader,
    ListItem, Menu, MenuItem
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ExpandMore} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {Link, NavLink} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState} from "react";

export default function ClassCard({classItem}) {
    const [anchorEl, setAnchorEl] = useState(null);


    return (
        <>
            <Card sx={{height: '100%'}}>
                <CardHeader
                    title={classItem.name}
                    action={
                        <>
                            <IconButton
                                aria-label="more"
                                aria-controls={`menu-for-${classItem.id}`}
                                aria-haspopup="true"
                                onClick={(e) => setAnchorEl(e.currentTarget)}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id={`menu-for-${classItem.id}`}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem>Edit</MenuItem>
                                <MenuItem>Delete</MenuItem>
                            </Menu>
                        </>
                    }
                />
                <CardContent>
                    <Typography>Класний керівник:</Typography>
                    <Typography>
                        <Button component={NavLink} to={`/students/${classItem.teacher.id}`}>
                            {`${classItem.teacher.first_name} ${classItem.teacher.second_name}`}
                        </Button>
                    </Typography>
                    <Typography sx={{mt: 2}}>Староста класу:</Typography>
                    <Typography>
                        <Button component={NavLink} to={`/students/${classItem.monitor.id}`}>
                            {`${classItem.monitor.first_name} ${classItem.monitor.second_name}`}
                        </Button>
                    </Typography>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore/>}>
                            <Typography>Учні:</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul style={{listStyleType: "none", padding: 0}}>
                                {classItem.students.map((student) => (
                                    <li key={student.id}>
                                        <Button component={NavLink} to={`/students/${student.id}`}>
                                            {`${student.first_name} ${student.second_name}`}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
            </Card>
        </>
    )
}