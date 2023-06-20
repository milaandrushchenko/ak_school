import React, {useState} from "react";
import {
    Card,
    CardContent,
    CardHeader, Chip, Paper,
    Tab,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Tabs,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import TaskCard from "../Tasks/TaskCard.jsx";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder.js";
import {formattedDate} from "../../../utils/common.js";
import TimerIcon from "@mui/icons-material/Timer.js";
import FactCheckIcon from "@mui/icons-material/FactCheck.js";
import {useSelector} from "react-redux";

export default function StudentTabs( {subject}){
    const [selectedTab, setSelectedTab] = useState(0);
    const {user} = useSelector((state) => state.currentUser)
    const {statements, isLoading} = useSelector((state) => state.statements)
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    return (
        <>
            <Tabs value={selectedTab} onChange={handleTabChange}
                  indicatorColor="primary">
                <Tab label="Завдання"/>
                <Tab label="Тести"/>
            </Tabs>
            {selectedTab === 0 && (
                <Grid container spacing={2} sx={{pt: 4}}>
                    {subject.tasks && subject.tasks.length > 0 ? subject.tasks.map((task) => (
                            <Grid key={task.id} item xs={12}>
                                <TaskCard task={task}/>
                            </Grid>
                        )) : <Typography sx={{pl:3, pt:4}} variant="h4" color="grey">Завдання відсутні</Typography>
                    }
                </Grid>
            )}
            {selectedTab === 1 && (
                <div style={{paddingTop: "20px"}}>
                    {subject.tests.length > 0 ? subject.tests.map((test)=>{
                        if (test.is_active){
                            return (
                                <Link key={test.id} to={'/tests/passing/' + test.slug} style={{textDecoration: 'none'}}>
                                    <Card sx={{height: '100%'}}>
                                        <CardHeader sx={{borderBottom: "1px solid lightGrey"}}
                                                    title={
                                                        <Typography variant="h5" color='primary'>{test.title}</Typography>
                                                    }/>
                                        <CardContent>
                                            <Grid container justifyContent="space-between">
                                                <Grid item md={6}>
                                                    <Box display="flex" alignItems="center">
                                                        <QueryBuilderIcon style={{marginRight: 10}}/>
                                                        <Typography
                                                            sx={{color: 'gray', fontStyle: 'italic', paddingRight: '5px'}}>
                                                            {'Дата вікриття :'} </Typography>
                                                        <Typography> {formattedDate(test.start_time)}</Typography>
                                                    </Box>
                                                    <Box style={{paddingTop: 5}} display="flex" alignItems="center">
                                                        <QueryBuilderIcon style={{marginRight: 10}}/>
                                                        <Typography
                                                            sx={{color: 'gray', fontStyle: 'italic', paddingRight: '5px'}}>
                                                            Дата закриття:
                                                        </Typography>
                                                        <Typography>{formattedDate(test.end_time)}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item  md={6}>
                                                    <Box style={{paddingTop: 5}} display="flex" alignItems="center">
                                                        <TimerIcon style={{marginRight: 10}}/>
                                                        <Typography
                                                            sx={{color: 'gray', fontStyle: 'italic', paddingRight: '5px'}}>
                                                            Тривалість:
                                                        </Typography>
                                                        <Typography> {test.time_limit ? test.time_limit + ' хвилин' : 'Необмежений у часі'}</Typography>
                                                    </Box>
                                                    <Box style={{paddingTop: 5}} display="flex" alignItems="center">
                                                        <FactCheckIcon style={{marginRight: 10}}/>
                                                        <Typography
                                                            sx={{color: 'gray', fontStyle: 'italic', paddingRight: '5px'}}>
                                                            Кількість спроб:</Typography>
                                                        <Typography> {test.max_attempts}</Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )
                        }
                    }) : <Typography sx={{pl:3, pt:4}} variant="h4" color="grey">Тести відсутні</Typography>}
                </div>
            )}
        </>
    )
}