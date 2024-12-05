import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { updateSale } from '../actions/Sale/saleAction';
import {
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    Snackbar
} from '@mui/material';

const validationSchema = Yup.object({
    quantity: Yup.number().required('Укажите количесвто купленной мебели')
        .min(0, 'Количество купленной мебели должно быть больше 0'),
});

const RedactSale = () => {

    const location = useLocation();
    const item = location.state || { quantity: ''};
    const { saleId } = useParams();

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleEditSaleSuccess = (message) => {
        setSeverity('success');
        setMessage(message);
        setOpen(true);
    };

    const handleEditSaleError = (message) => {
        setSeverity('error');
        setMessage(message);
        setOpen(true);
    };

    const formik = useFormik({
        initialValues: {
            quantity: item.quantity,
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            dispatch(updateSale(saleId, values))
                .then(() => {
                    handleEditSaleSuccess("Количество продажи успешно обновлено");
                })
                .catch(e => {
                    handleEditSaleError(`Ошибка при обновлении количество продажи: ${e.message}`);
                    resetForm();
                });
        },
    });

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/sales');
    }

    return (
        <>
            <Box component="form" onSubmit={formik.handleSubmit} noValidate
                sx={{
                    maxWidth: '30em',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    textAlign: 'center',
                }}>
                <Typography variant="h5" gutterBottom>
                    Изменить количество мебели
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    id="quantity"
                    name="quantity"
                    label="Количество мебели"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                    helperText={formik.touched.quantity && formik.errors.quantity}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="outlined" color='primary.contrastText' type="submit" sx={{width: "170px"}}>
                        Изменить количество
                    </Button>
                    <Button variant="outlined" color='primary.contrastText' onClick={goBack}>
                        Назад
                    </Button>
                </Box>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default RedactSale;