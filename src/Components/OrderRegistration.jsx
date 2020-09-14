import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CircularProgress, Divider} from '@material-ui/core';

import {makeStyles} from '@material-ui/styles';
import NewOrderForm from './NewOrderForm';
import OrdersTable from "./OrdersTable";
import {createOrder, getAllOrders, updateOrder} from "../Services/cacheService";

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
            border: 'solid 2px green',
            backgroundColor: 'whitesmoke'
        },
    }),
);

function OrderRegistration(props) {
    const classes = useStyles();

    const [isOrderSaving, setIsOrderSaving] = useState(false);

    const [orders, setOrders] = useState([]);
    const [isOrdersLoading, setIsOrdersLoading] = useState(false);

    const getOrdersProcessed = (data) => {
        let memoryOrders = [], fileOrders = [];
        if (data.memoryCacheOrders) {
            memoryOrders = data.memoryCacheOrders.map((order) => ({
                ...order,
                cacheType: 'Memory'
            }));
        }
        if (data.fileSystemCacheOrders) {
            fileOrders = data.fileSystemCacheOrders.map((order) => ({
                ...order,
                cacheType: 'File System'
            }));
        }
        return [...memoryOrders, ...fileOrders];
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllOrders();
            if (res.data && res.data.memoryCacheOrders) {
                setOrders(getOrdersProcessed(res.data));
            }
        };
        fetchData();
    }, []);


    const updateOrderAccess = async (orderId) => {
        setIsOrdersLoading(true);
        const res = await updateOrder(orderId);
        if (res.data) {
            setOrders(getOrdersProcessed(res.data));
        }
        setIsOrdersLoading(false);
    };

    const saveNewOrder = async (orderId, orderName, cardType) => {
        setIsOrderSaving(true);
        const res = await createOrder(orderId, orderName, cardType);
        console.log(res);
        if (res.data) {
            setOrders(getOrdersProcessed(res.data));
        }
        setIsOrderSaving(false);
    };

    return (
        <Card className={classes.card}>
            <CardHeader title="Cached Orders View"/>
            <Divider/>
            <CardContent>
                {(isOrdersLoading || isOrderSaving) ? (<CircularProgress size={50} thickness={10}/>) : null}
                <NewOrderForm
                    saveOrder={saveNewOrder}
                    isOrderSaving={isOrderSaving}
                />
                <OrdersTable
                    orders={orders}
                    updateOrder={updateOrderAccess}
                    isOrdersLoading={isOrdersLoading}/>
            </CardContent>
        </Card>
    );
}

export default OrderRegistration;
