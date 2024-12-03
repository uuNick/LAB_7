import React, {useState} from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { createBuyer } from '../actions/Buyer/buyerAction';
import {
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    Snackbar
} from '@mui/material';

const validationSchema = Yup.object({
    buyer_name: Yup.string().required('Укажите имя покупателя'),
    buyer_address: Yup.string().required('Укажите адрес'),
    buyer_phone: Yup.string()
        .required('Укажите номер телефона')
        .matches(/^[0-9]+$/, "Укажите только цифры")
        .min(10, 'Номер должен содержать минимум 10 цифр')
        .max(20, 'Номер не может превышать 20 цифр')
});

const AddBuyer = () => {

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

    const handleCreateBuyerSuccess = (message) => {
        setSeverity('success');
        setMessage(message);
        setOpen(true);
    };

    const handleCreateBuyerError = (message) => {
        setSeverity('error');
        setMessage(message);
        setOpen(true);
    };

    const formik = useFormik({
        initialValues: {
            buyer_name: '',
            buyer_address: '',
            buyer_phone: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            try {
                dispatch(createBuyer(values));
                handleCreateBuyerSuccess("Покупатель успешно создан");
                resetForm();
            } catch (e) {
                handleCreateBuyerError(`Ошибка при создании покупателя`);
            }
        },
    });

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
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
                    Создать покупателя
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    id="buyer_name"
                    name="buyer_name"
                    label= "Имя покупателя"
                    value={formik.values.buyer_name}
                    onChange={formik.handleChange}
                    error={formik.touched.buyer_name && Boolean(formik.errors.buyer_name)}
                    helperText={formik.touched.buyer_name && formik.errors.buyer_name}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="buyer_address"
                    name="buyer_address"
                    label="Адрес"
                    value={formik.values.buyer_address}
                    onChange={formik.handleChange}
                    error={formik.touched.buyer_address && Boolean(formik.errors.buyer_address)}
                    helperText={formik.touched.buyer_address && formik.errors.buyer_address}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="buyer_phone"
                    name="buyer_phone"
                    label="Номер телефона"
                    value={formik.values.buyer_phone}
                    onChange={formik.handleChange}
                    error={formik.touched.buyer_phone && Boolean(formik.errors.buyer_phone)}
                    helperText={formik.touched.buyer_phone && formik.errors.buyer_phone}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="outlined" color='primary.contrastText' type="submit">
                        Создать покупателя
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

export default AddBuyer;