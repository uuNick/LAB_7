import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { updateContract } from '../actions/Contract/contractAction';
import {
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    Snackbar
} from '@mui/material';

const validationSchema = Yup.object({
    contract_date: Yup.date().required('Дата контракта обязательна'),
    execution_date: Yup.date().required('Дата исполнения контракта обязательна')
        .min(Yup.ref('contract_date'), 'Дата начала исполнения контракта не может быть раньше даты создания контракта'),
});

const RedactContract = () => {

    const location = useLocation();
    const item = location.state || { contract_date: '', execution_date: '',};
    const { contractNumber } = useParams();

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

    const handleRedactContractSuccess = (message) => {
        setSeverity('success');
        setMessage(message);
        setOpen(true);
    };

    const handleRedactContractError = (message) => {
        setSeverity('error');
        setMessage(message);
        setOpen(true);
    };

    const formik = useFormik({
        initialValues: {
            contract_date: item.contract_date,
            execution_date: item.execution_date,
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            dispatch(updateContract(contractNumber, values))
                .then(() => {
                    handleRedactContractSuccess("Контракт успешно обновлён");
                })
                .catch(e => {
                    handleRedactContractError(`Ошибка при обновлении контракта: ${e.message}`);
                    resetForm();
                });
        },
    });

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/contracts');
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
                    Изменить контракт
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    id="contract_date"
                    name="contract_date"
                    label="Дата создания контракта"
                    value={formik.values.contract_date}
                    error={formik.touched.contract_date && Boolean(formik.errors.contract_date)}
                    helperText={formik.touched.contract_date && formik.errors.contract_date}
                    />
                <TextField
                    fullWidth
                    margin="normal"
                    id="execution_date"
                    name="execution_date"
                    label="Дата исполнения контракта"
                    value={formik.values.execution_date}
                    onChange={formik.handleChange}
                    error={formik.touched.execution_date && Boolean(formik.errors.execution_date)}
                    helperText={formik.touched.execution_date && formik.errors.execution_date}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="outlined" color='primary.contrastText' type="submit">
                        Изменить контракт
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

export default RedactContract;