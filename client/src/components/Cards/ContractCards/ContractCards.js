import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchContract, deleteContract, sortContracts, searchContracts } from '../../../actions/Contract/contractAction';
import { fetchAllBuyers } from '../../../actions/Buyer/buyerAction';
import '../Cards.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Paper,
    InputBase,
    Divider
} from '@mui/material';
import Numeration from '../../Numeration/Numeration';


const ContractCards = () => {
    const dispatch = useDispatch();
    const { contract, findContract, sortedContract, currentPage, totalPages, limit, loading, error } = useSelector(state => state.contract);
    const { allBuyers } = useSelector(state => state.buyer);
    const [open, setOpen] = useState(false);
    const [contractToDelete, setContractToDelete] = useState(null);
    const [sortBy, setSortBy] = useState(null); // Состояние для сортировки
    const [searchQuery, setSearchQuery] = useState('');
    const [inputSearch, setInputSearch] = useState('');

    const handleSearchChange = (event) => {
        setInputSearch(event.target.value);
    };

    const handleSearchSubmit = () => {
        console.log(inputSearch);
        setSearchQuery(inputSearch);
        if (searchQuery.trim() !== '') {
            dispatch(searchContracts(searchQuery, currentPage, limit));
        } else {
            dispatch(fetchContract(currentPage, limit));
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setInputSearch('');
        dispatch(fetchContract(currentPage, limit));
    };


    const handleSortByChange = (event) => {
        const newSortBy = event.target.value === 'date' ? 'date' : null;
        setSortBy(newSortBy);
        if (newSortBy) {
            dispatch(sortContracts(currentPage, limit));
        } else {
            dispatch(fetchContract(currentPage, limit));
        }
    };

    useEffect(() => {
        dispatch(fetchContract(currentPage, limit));
        if (allBuyers.length == 0) {
            dispatch(fetchAllBuyers());
        }
    }, [dispatch, currentPage, limit]);

    useEffect(() => {
        if (searchQuery) {
            dispatch(searchContracts(searchQuery, currentPage, limit));
        } else if (sortBy) {
            dispatch(sortContracts(currentPage, limit, sortBy));
        } else {
            dispatch(fetchContract(currentPage, limit));
        }
    }, [searchQuery, sortBy, dispatch, currentPage, limit]);

    const contractsToDisplay = searchQuery.trim() !== '' ? findContract : (sortBy ? sortedContract : contract);

    const handlePageChange = (page) => {
        if (searchQuery.trim() !== '') {
            dispatch(searchContracts(searchQuery, page, limit));
        }
        else if (sortBy) {
            dispatch(sortContracts(page, limit, sortBy));
        } else {
            dispatch(fetchContract(page, limit));
        }
    };


    const navigate = useNavigate()

    const goToAddContract = () => {
        navigate("/addContract");
    }

    const handleEdit = (item) => {
        navigate(`/editContract/${item.contract_number}`, { state: item });
    };

    const handleDeleteOpen = (item) => {
        setOpen(true);
        setContractToDelete(item);
    };

    const handleDeleteClose = () => {
        setOpen(false);
        setContractToDelete(null);
    };

    const handleDeleteConfirm = () => {
        if (contractToDelete) {
            dispatch(deleteContract(contractToDelete.contract_number));
            handleDeleteClose();
        }
    };


    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    const buyerMap = allBuyers.reduce((map, buyer) => {
        map[buyer.buyer_id] = buyer.buyer_name;
        return map;
    }, {});

    return (
        <>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, margin: "50px auto" }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Поиск по contract_date"
                    inputProps={{ 'aria-label': 'Search contract_date' }}
                    value={inputSearch}
                    onChange={handleSearchChange}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearchSubmit}>
                    <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton color="primary.contrastText" sx={{ p: '10px' }} aria-label="clear" onClick={handleClearSearch}>
                    <CloseIcon />
                </IconButton>
            </Paper>
            <div className="wrapper">
                <div className="filter_product_category">
                    <FormControl>
                        <FormLabel>Сортировка</FormLabel>
                        <RadioGroup
                            value={sortBy || ''}
                            name="sort"
                            onChange={handleSortByChange}
                        >
                            <FormControlLabel value="date" control={<Radio />} label="Дата создания контракта" />
                            <FormControlLabel value="" control={<Radio />} label="Отмена" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="field_with_card_and_numeration">
                    <div className="cards">
                        {contractsToDisplay.map(item => (
                            <Card key={item.contract_number} sx={{ width: 345 }}>
                                <CardHeader
                                    title={item.contract_number}
                                />
                                <CardContent>
                                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                        Дата создания контракта: {item.contract_date}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.primary', marginTop: "20px" }}>
                                        Начало действия контракта: {item.execution_date}
                                    </Typography >
                                    <Typography variant="body2" sx={{ color: 'text.primary', marginTop: "20px" }}>
                                        Имя покупателя: {buyerMap[item.buyer_id] || 'Неизвестно'}
                                    </Typography >
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color='primary.contrastText' onClick={() => handleEdit(item)}>Редактировать</Button>
                                    <Button size="small" color='primary.contrastText' onClick={() => handleDeleteOpen(item)} >Удалить</Button>
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                    <Numeration totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                    <Button onClick={goToAddContract} color='primary.contrastText' sx={{ marginBottom: "50px" }}>Добавить контракт</Button>
                    <Dialog open={open} onClose={handleDeleteClose}>
                        <DialogTitle>Подтверждение удаления</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Вы уверены, что хотите удалить контракт? Это действие необратимо и удалит сваязанные с контрактами продажи!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteClose} color='primary.contrastText'>Отмена</Button>
                            <Button onClick={handleDeleteConfirm} color="error">Удалить</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </>
    );
};

export default ContractCards;