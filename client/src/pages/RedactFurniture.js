import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { updateFurniture } from '../actions/FurnitureModel/furnitureModelActions';
import {
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    Snackbar
} from '@mui/material';

const validationSchema = Yup.object({
    furniture_name: Yup.string().required('Укажите название мебели'),
    model: Yup.string().required('Укажите модель'),
    characteristics: Yup.string().required('Укажите характеристики модели мебели')
        .min(10, 'Характеристика должна содержать больше 10 символов'),
    price: Yup.number().required('Укажите цену').positive('Цена должна быть положительной'),
});

const RedactFurniture = () => {

    const location = useLocation();
    const item = location.state || { furniture_name: '', model: '', characteristics: '', price: '' };
    const { furnitureId } = useParams();


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

    const handleRedactFurnitureSuccess = (message) => {
        setSeverity('success');
        setMessage(message);
        setOpen(true);
    };

    const handleRedactFurnitureError = (message) => {
        setSeverity('error');
        setMessage(message);
        setOpen(true);
    };

    const formik = useFormik({
        initialValues: {
            furniture_name: item.furniture_name,
            model: item.model,
            characteristics: item.characteristics,
            price: item.price,
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            dispatch(updateFurniture(furnitureId, values))
                .then(() => {
                    handleRedactFurnitureSuccess("Мебель успешно обновлена");
                })
                .catch(e => {
                    handleRedactFurnitureError(`Ошибка при обновлении мебели: ${e.message}`);
                    resetForm();
                });
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
                    Изменить мебель
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    id="furniture_name"
                    name="furniture_name"
                    label="Название мебели"
                    value={formik.values.furniture_name}
                    onChange={formik.handleChange}
                    error={formik.touched.furniture_name && Boolean(formik.errors.furniture_name)}
                    helperText={formik.touched.furniture_name && formik.errors.furniture_name}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="model"
                    name="model"
                    label="Модель"
                    value={formik.values.model}
                    onChange={formik.handleChange}
                    error={formik.touched.model && Boolean(formik.errors.model)}
                    helperText={formik.touched.model && formik.errors.model}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="characteristics"
                    name="characteristics"
                    label="Характеристики"
                    value={formik.values.characteristics}
                    onChange={formik.handleChange}
                    error={formik.touched.characteristics && Boolean(formik.errors.characteristics)}
                    helperText={formik.touched.characteristics && formik.errors.characteristics}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="price"
                    name="price"
                    label="Цена"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="outlined" color='primary.contrastText' type="submit" sx={{ width: "170px" }}>
                        Изменить мебель
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

export default RedactFurniture;