import {Grid, Typography} from "@mui/material";

export default function NotFound () {
    return (
        <>
            <Grid container>
                <Grid item sx={{mt:2}} xs={4}>
                    <img src="/idk.png" alt="logo" style={{maxWidth: "100%"}}/>
                </Grid>
                <Grid item sx={{mt:15}} xs={8} justifyContent="center">
                    <Typography color="primary" variant="h4">СТОРІНКУ НЕ ЗНАЙДЕНО</Typography>
                </Grid>
            </Grid>
        </>
    );
}