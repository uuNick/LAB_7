import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { createSale } from '../actions/Sale/saleAction';
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
    contract_number: Yup.number().required('Укажите номер контракта')
        .min(1, 'Номер контракта не может быть меньше 1'),
    furniture_model_id: Yup.number().required('Укажите id мебели')
        .min(1, 'Id мебели не может быть меньше 1'),
});

const AddSale = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');
    const error = useSelector((state) => state.sale.error);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleCreateSaleSuccess = (message) => {
        setSeverity('success');
        setMessage(message);
        setOpen(true);
    };

    const handleCreateSaleError = (message) => {
        setSeverity('error');
        setMessage(message);
        setOpen(true);
    };

    const formik = useFormik({
        initialValues: {
            quantity: '',
            contract_number: '',
            furniture_model_id: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                dispatch(createSale(values));
                handleCreateSaleSuccess("Продажа успешно создана");
                resetForm();
            } catch (error) {
                handleCreateSaleError(error.message);
            }
        },
    });

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    }

    React.useEffect(() => {
        if (error) {
            handleCreateSaleError(error);
        }
    }, [error]);

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
                    Создать продажу
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
                <TextField
                    fullWidth
                    margin="normal"
                    id="contract_number"
                    name="contract_number"
                    label="Номер контракта"
                    value={formik.values.contract_number}
                    onChange={formik.handleChange}
                    error={formik.touched.contract_number && Boolean(formik.errors.contract_number)}
                    helperText={formik.touched.contract_number && formik.errors.contract_number}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="furniture_model_id"
                    name="furniture_model_id"
                    label="Идентификатор мебели"
                    value={formik.values.furniture_model_id}
                    onChange={formik.handleChange}
                    error={formik.touched.furniture_model_id && Boolean(formik.errors.furniture_model_id)}
                    helperText={formik.touched.furniture_model_id && formik.errors.furniture_model_id}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="outlined" color='primary.contrastText' type="submit">
                        Создать продажу
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

export default AddSale;