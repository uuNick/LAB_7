import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBuyer, deleteBuyer, sortBuyers, searchBuyers } from '../../../actions/Buyer/buyerAction';
import '../Cards.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
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



const BuyerCards = () => {
  const dispatch = useDispatch();
  const { buyer, findBuyer, sortedBuyer, currentPage, totalPages, limit, loading, error } = useSelector(state => state.buyer);
  const [open, setOpen] = useState(false);
  const [buyerToDelete, setbuyerToDelete] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputSearch, setInputSearch] = useState('');

  const handleSearchChange = (event) => {
    setInputSearch(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log(inputSearch);
    setSearchQuery(inputSearch);
    if (searchQuery.trim() !== '') {
      dispatch(searchBuyers(searchQuery, currentPage, limit));
    } else {
      dispatch(fetchBuyer(currentPage, limit));
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setInputSearch('');
    dispatch(fetchBuyer(currentPage, limit));
  };

  const handleSortByChange = (event) => {
    const newSortBy = event.target.value === 'name' ? 'name' : null;
    setSortBy(newSortBy);
    if (newSortBy) {
      dispatch(sortBuyers(currentPage, limit));
    } else {
      dispatch(fetchBuyer(currentPage, limit));
    }
  };

  useEffect(() => {
    dispatch(fetchBuyer(currentPage, limit));
  }, [dispatch, currentPage, limit]);

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchBuyers(searchQuery, currentPage, limit));
    } else if (sortBy) {
      dispatch(sortBuyers(currentPage, limit, sortBy));
    } else {
      dispatch(fetchBuyer(currentPage, limit));
    }
  }, [searchQuery, sortBy, dispatch, currentPage, limit]);

  const buyersToDisplay = searchQuery.trim() !== '' ? findBuyer : (sortBy ? sortedBuyer : buyer);

  const handlePageChange = (page) => {
    console.log(buyersToDisplay);
    if (searchQuery.trim() !== '') {
      dispatch(searchBuyers(searchQuery, page, limit));
    }
    else if (sortBy) {
      dispatch(sortBuyers(page, limit, sortBy));
    } else {
      dispatch(fetchBuyer(page, limit));
    }
  };


  const navigate = useNavigate()

  const goToAddBuyer = () => {
    navigate("/addBuyer");
  }

  const handleEdit = (item) => {
    navigate(`/editBuyer/${item.buyer_id}`, { state: item });
  };

  const handleDeleteOpen = (item) => {
    setOpen(true);
    setbuyerToDelete(item);
  };

  const handleDeleteClose = () => {
    setOpen(false);
    setbuyerToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (buyerToDelete) {
      dispatch(deleteBuyer(buyerToDelete.buyer_id));
      handleDeleteClose();
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, margin: "50px auto" }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Поиск по имени или адресу"
          inputProps={{ 'aria-label': 'Search name or addresss' }}
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
              <FormControlLabel value="name" control={<Radio />} label="По имени" />
              <FormControlLabel value="" control={<Radio />} label="Отменить" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className='field_with_card_and_numeration'>
          <div className="cards">
            {buyersToDisplay.map(item => (
              <Card key={item.buyer_id} sx={{ width: 345 }}>
                <CardHeader
                  title={item.buyer_name}
                />
                <CardContent>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.buyer_address}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary', marginTop: "20px" }}>
                    {item.buyer_phone}
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
          <Button onClick={goToAddBuyer} color='primary.contrastText' sx={{ marginBottom: "50px" }}>Добавить покупателя</Button>
          <Dialog open={open} onClose={handleDeleteClose}>
            <DialogTitle>Подтверждение удаления</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Вы уверены, что хотите удалить покупателя? Это действие необратимо, и приведет к удалению контрактов, связанных с покупателем и продаж, которые были связаны с контрактами
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

export default BuyerCards;