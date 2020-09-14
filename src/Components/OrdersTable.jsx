import React from 'react';
import {Button, Card, CardContent, CardHeader, Divider,} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
        button: {
            marginLeft: theme.spacing(1),
        },
        card: {
            margin: theme.spacing(4),
            border: 'solid 2px darkorange'
        },
        greenRow: {
            backgroundColor: 'lightgreen'
        },
        orangeRow: {
            backgroundColor: 'orange'
        }
    }),
);

function OrdersTable(props) {
    const classes = useStyles();
    const {orders, updateOrder, isOrdersLoading} = props;

    return (
        <Card className={classes.card}>
            <CardHeader title="Current Orders In Cache"/>
            <Divider/>
            <CardContent>
                <Table className="orders-table-table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Cache Type</b></TableCell>
                            <TableCell><b>Order Number</b></TableCell>
                            <TableCell><b>Order Name</b></TableCell>
                            <TableCell><b>Card Type</b></TableCell>
                            <TableCell><b>Access Count</b></TableCell>
                            <TableCell><b>Increase Access Count</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(({orderNo, name, cardType, accessCount, cacheType}, index) => (
                            <TableRow key={index} className={cacheType === 'Memory' ? classes.greenRow : classes.orangeRow}>
                                <TableCell>
                                    <b>{cacheType}</b>
                                </TableCell>
                                <TableCell>
                                    {orderNo}
                                </TableCell>
                                <TableCell>
                                    {name}
                                </TableCell>
                                <TableCell>
                                    {cardType}
                                </TableCell>
                                <TableCell>
                                    {accessCount}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        type="button"
                                        onClick={() => cacheType === 'Memory' ? updateOrder(orderNo) : console.log('Not Yet Implemented')}
                                        disabled={isOrdersLoading}>
                                        <b>Update</b>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default OrdersTable;
