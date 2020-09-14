import React, {useState} from 'react';
import {Button, Card, CardContent, CardHeader, Divider, Grid, Radio, TextField} from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {makeStyles} from '@material-ui/styles';
import {v4 as uuidv4} from 'uuid';

const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        button: {
            marginLeft: 1,
        },
        topic: {
            color: 'black'
        },
        card: {
            margin: theme.spacing(4),
            border: 'solid 2px blue'
        },
    }),
);

function NewOrderForm(props) {
    const classes = useStyles();
    const orderNumber = uuidv4().substr(0, 20);
    const [orderName, setOrderName] = useState('');
    const [cardType, setCardType] = useState('HSBC');

    const {isOrderSaving, saveOrder} = props;

    const onSubmit = (event) => {
        saveOrder(orderNumber, orderName, cardType);
        event.preventDefault();
    };

    const handleNameChange = (event) => {
        setOrderName(event.target.value);
    };

    const handleCardTypeChange = (event) => {
        setCardType(event.target.value);
    };

    return (
        <Card className={classes.card}>
            <CardHeader title="Add New Order To Cache"/>
            <Divider/>
            <CardContent>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item>
                            <TextField
                                name="orderNumber"
                                label="Order ID"
                                value={orderNumber}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="dense"
                                aria-readonly={"true"}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                name="name"
                                label="Name"
                                value={orderName}
                                onChange={handleNameChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="dense"
                            />
                        </Grid>

                        <Grid item>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Card Type</FormLabel>
                                <RadioGroup row aria-label="cardType" name="cardType" defaultValue="HSBC" onChange={handleCardTypeChange}>
                                    <FormControlLabel
                                        className={classes.topic}
                                        value="HSBC"
                                        control={<Radio color="primary"/>}
                                        label="HSBC"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        className={classes.topic}
                                        value="AMEX"
                                        control={<Radio color="primary"/>}
                                        label="AMEX"
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                                disabled={isOrderSaving || orderName.length === 0}>
                                <b>Add New Order</b>
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
}

export default NewOrderForm;
