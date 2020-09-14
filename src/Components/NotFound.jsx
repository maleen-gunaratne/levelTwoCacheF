import React from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: 2,
            textAlign: 'left',
            color: 'whitesmoke',
        },
        button: {
            marginLeft: 1,
        },
        topic: {
            color: 'black'
        }
    }),
);

function NewOrderForm(props) {
    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            <Grid item>
                <Paper className={classes.paper}>
                    <Grid container spacing={2} className={classes.topic}>
                        <Grid item>
                            <Typography variant="h1" align="center"><b>Page Not Found</b></Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default NewOrderForm;
