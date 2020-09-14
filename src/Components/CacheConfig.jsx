import React, {useState} from 'react';
import {Button, Card, CardContent, CardHeader, CircularProgress, Divider, Grid, Radio, TextField} from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {makeStyles} from '@material-ui/styles';
import {Redirect} from "react-router-dom";
import {sendConfigurations} from "../Services/cacheService";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'left',
            color: theme.palette.text.secondary,
        },
        button: {
            marginLeft: theme.spacing(1),
        },
        topic: {
            color: 'black'
        },
        card: {
            margin: theme.spacing(4),
            border: 'solid 2px green'
        },
    }),
);

function CacheConfig(props) {
    const classes = useStyles();

    const [memorySize, setMemorySize] = useState(2);
    const [fileSize, setFileSize] = useState(2);
    const [strategy, setCacheStrategy] = useState('LRU');

    const [isConfigsLoading, setConfigsLoading] = useState(false);
    const [isConfigsLoaded, setIsConfigsLoaded] = useState(false);

    const setConfigurations = async (memorySize, fileSize, strategy) => {
        setConfigsLoading(true);
        const response = await sendConfigurations(memorySize, fileSize, strategy);
        setConfigsLoading(false);
        window.alert(response.data);
        if (response.data && response.data === 'Cache Successfully Configured!') {
            setIsConfigsLoaded(true);
        }
    }

    const onSubmit = (event) => {
        setConfigurations(memorySize, fileSize, strategy);
        event.preventDefault();
    };

    const handleFileSizeChange = (event) => {
        setFileSize(event.target.value);
    };

    const handleMemorySizeChange = (event) => {
        setMemorySize(event.target.value);
    };

    const handleStrategyChange = (event) => {
        setCacheStrategy(event.target.value);
    };

    if (isConfigsLoaded) {
        return <Redirect to='/orders'/>
    }

    return (
        <Card className={classes.card}>
            <CardHeader title="Configure Cache"/>
            <Divider/>
            <CardContent>
                {isConfigsLoading ? (<CircularProgress size={50} thickness={10}/>) : null}

                <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item>
                            <TextField
                                name="memoryCacheSize"
                                label="Memory Cache Max Size"
                                value={memorySize}
                                onChange={handleMemorySizeChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="dense"
                                type='number'
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                name="fileSystemCacheSize"
                                label="Filesystem Cache Max Size"
                                value={fileSize}
                                onChange={handleFileSizeChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="dense"
                                type='number'
                            />
                        </Grid>

                        <Grid item>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Cache Strategy</FormLabel>
                                <RadioGroup row aria-label="strategy" name="strategy" defaultValue='LRU' onChange={handleStrategyChange}>
                                    <FormControlLabel
                                        className={classes.topic}
                                        value="LRU"
                                        control={<Radio color="primary"/>}
                                        label="LRU"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        className={classes.topic}
                                        value="LFU"
                                        control={<Radio color="primary"/>}
                                        label="LFU"
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={isConfigsLoading}>
                                <b>Configure</b>
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
}

export default CacheConfig;
