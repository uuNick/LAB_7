import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSale, deleteSale, sortSales, searchSales } from '../../../actions/Sale/saleAction';
import { fetchAllFurnitureModels } from '../../../actions/FurnitureModel/furnitureModelActions';
import '../Cards.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
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


const SaleCards = () => {
    const dispatch = useDispatch();
    const { sale, findSale, sortedSale, currentPage, totalPages, limit, loading, error } = useSelector(state => state.sale);
    const { allFurniture } = useSelector(state => state.furnitureModels);
    const [open, setOpen] = useState(false);
    const [saleToDelete, setSaleToDelete] = useState(null);
    const [sortBy, setSortBy] = useState(null); // Состояние для сортировки
    const [searchQuery, setSearchQuery] = useState('');
    const [inputSearch, setInputSearch] = useState('');

    const handleSearchChange = (event) => {
        setInputSearch(event.target.value);
    };

    const handleSearchSubmit = () => {
        setSearchQuery(inputSearch);
        if (searchQuery.trim() !== '') {
            dispatch(searchSales(searchQuery, currentPage, limit));
        } else {
            dispatch(fetchSale(currentPage, limit));
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setInputSearch('');
        dispatch(fetchSale(currentPage, limit));
    };


    const handleSortByChange = (event) => {
        const newSortBy = event.target.value === 'id' ? 'id' : null;
        setSortBy(newSortBy);
        if (newSortBy) {
            dispatch(sortSales(currentPage, limit));
        } else {
            dispatch(fetchSale(currentPage, limit));
        }
    };

    useEffect(() => {
        dispatch(fetchSale(currentPage, limit));
        if (allFurniture.length == 0) {
            dispatch(fetchAllFurnitureModels());
        }
    }, [dispatch, currentPage, limit]);

    useEffect(() => {
        if (searchQuery) {
            dispatch(searchSales(searchQuery, currentPage, limit));
        } else if (sortBy) {
            dispatch(sortSales(currentPage, limit, sortBy));
        } else {
            dispatch(fetchSale(currentPage, limit));
        }
    }, [searchQuery, sortBy, dispatch, currentPage, limit]);

    const salesToDisplay = searchQuery.trim() !== '' ? findSale : (sortBy ? sortedSale : sale);

    const handlePageChange = (page) => {
        if (searchQuery.trim() !== '') {
            dispatch(searchSales(searchQuery, page, limit));
        }
        else if (sortBy) {
            dispatch(sortSales(page, limit, sortBy));
        } else {
            dispatch(fetchSale(page, limit));
        }
    };


    const navigate = useNavigate();

    const goToAddSale = () => {
        navigate('/addSale');
    }

    const handleEdit = (item) => {
        navigate(`/editSale/${item.id}`, { state: item });
    };

    const handleDeleteOpen = (item) => {
        setOpen(true);
        setSaleToDelete(item);
    };

    const handleDeleteClose = () => {
        setOpen(false);
        setSaleToDelete(null);
    };

    const handleDeleteConfirm = () => {
        if (saleToDelete) {
            dispatch(deleteSale(saleToDelete.id));
            handleDeleteClose();
        }
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    const furnitureMap = allFurniture.reduce((map, furniture) => {
        map[furniture.furniture_model_id] = furniture.furniture_name;
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
                    placeholder="Поиск по furniture_model_id"
                    inputProps={{ 'aria-label': 'Search furniture_model_id' }}
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
                            <FormControlLabel value="id" control={<Radio />} label="По ID продажи" />
                            <FormControlLabel value="" control={<Radio />} label="Отменить" />
                        </RadioGroup>
                    </FormControl>
                    {/* <FormControl>
                    <FormLabel>{t("on_price")}</FormLabel>
                    <RadioGroup
                        value={sortOrder}
                        name="products_price"
                        onChange={(e) => dispatch(setSortOrder(e.target.value))}
                    >
                        <FormControlLabel value="none" control={<Radio />} label={t("def")} />
                        <FormControlLabel value="asc" control={<Radio />} label={t("cheap_ones_first")} />
                        <FormControlLabel value="desc" control={<Radio />} label={t("dear_ones_first")} />
                    </RadioGroup>
                </FormControl> */}
                </div>
                <div className="field_with_card_and_numeration">
                    <div className="cards">
                        {salesToDisplay.map(item => (
                            <Card key={item.id} sx={{ width: 345 }}>
                                <CardHeader
                                    title={item.id}
                                />
                                <CardContent>
                                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                        Количество: {item.quantity}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.primary', marginTop: "20px" }}>
                                        Номер контракта: {item.contract_number}
                                    </Typography >
                                    <Typography variant="body2" sx={{ color: 'text.primary', marginTop: "20px" }}>
                                        Наименование модели мебели: {furnitureMap[item.furniture_model_id] || 'Неизвестно'}
                                    </Typography >
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color='primary.contrastText' onClick={() => handleEdit(item)}>Редактировать</Button>
                                    <Button size="small" color='primary.contrastText' onClick={() => handleDeleteOpen(item)}>Удалить</Button>
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                    <Numeration totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                    <Button onClick={goToAddSale} color='primary.contrastText' sx={{ marginBottom: "50px" }}>Добавить покупку</Button>
                    <Dialog open={open} onClose={handleDeleteClose}>
                        <DialogTitle>Подтверждение удаления</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Вы уверены, что хотите удалить продажу? Это действие необратимо
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

export default SaleCards;