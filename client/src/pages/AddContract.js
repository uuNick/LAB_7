import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { createContract } from '../actions/Contract/contractAction';
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
    buyer_id: Yup.number().required('Укажите id покупателя')
        .min(1, 'Id покупателя не может быть меньше 1'),
});

const AddContract = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');
    const error = useSelector((state) => state.contract.error);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleCreateContractSuccess = (message) => {
        setSeverity('success');
        setMessage(message);
        setOpen(true);
    };

    const handleCreateContractError = (message) => {
        setSeverity('error');
        setMessage(message);
        setOpen(true);
    };

    const formik = useFormik({
        initialValues: {
            contract_date: '',
            execution_date: '',
            buyer_id: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                dispatch(createContract(values));
                handleCreateContractSuccess("Контракт успешно создан");
                resetForm();
            } catch (error) {
                handleCreateContractError(error.message);
            }
        },
    });

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    }

    React.useEffect(() => {
        if (error) {
            handleCreateContractError(error);
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
                    Создать контракт
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    id="contract_date"
                    name="contract_date"
                    label="Дата создания контракта"
                    value={formik.values.contract_date}
                    onChange={formik.handleChange}
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
                <TextField
                    fullWidth
                    margin="normal"
                    id="buyer_id"
                    name="buyer_id"
                    label="Идентификатор покупателя"
                    value={formik.values.buyer_id}
                    onChange={formik.handleChange}
                    error={formik.touched.buyer_id && Boolean(formik.errors.buyer_id)}
                    helperText={formik.touched.buyer_id && formik.errors.buyer_id}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="outlined" color='primary.contrastText' type="submit">
                        Создать контракт
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

export default AddContract;