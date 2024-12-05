import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchFurniture, deleteFurniture, sortFurnitures, searchFurnitures } from '../../../actions/FurnitureModel/furnitureModelActions';
import '../Cards.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {
  Card,
  CardHeader,
  CardMedia,
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



const FurnitureModels = () => {
  const dispatch = useDispatch();
  const { furniture, findFurniture, sortedFurniture, currentPage, totalPages, limit, loading, error } = useSelector(state => state.furnitureModels);
  const [open, setOpen] = useState(false);
  const [furnitureToDelete, setfurnitureToDelete] = useState(null);
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
      dispatch(searchFurnitures(searchQuery, currentPage, limit));
    } else {
      dispatch(fetchFurniture(currentPage, limit));
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setInputSearch('');
    dispatch(fetchFurniture(currentPage, limit));
  };

  const handleSortByChange = (event) => {
    const newSortBy = event.target.value === 'name' ? 'name' : null;
    setSortBy(newSortBy);
    if (newSortBy) {
      dispatch(sortFurnitures(currentPage, limit));
    } else {
      dispatch(fetchFurniture(currentPage, limit));
    }
  };


  useEffect(() => {
    dispatch(fetchFurniture(currentPage, limit));
  }, [dispatch, currentPage, limit]);

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchFurnitures(searchQuery, currentPage, limit));
    } else if (sortBy) {
      dispatch(sortFurnitures(currentPage, limit, sortBy));
    } else {
      dispatch(fetchFurniture(currentPage, limit));
    }
  }, [searchQuery, sortBy, dispatch, currentPage, limit]);

  const furnituresToDisplay = searchQuery.trim() !== '' ? findFurniture : (sortBy ? sortedFurniture : furniture);

  const handlePageChange = (page) => {
    if (searchQuery.trim() !== '') {
      dispatch(searchFurnitures(searchQuery, page, limit));
    }
    else if (sortBy) {
      dispatch(sortFurnitures(page, limit, sortBy));
    } else {
      dispatch(fetchFurniture(page, limit));
    }
  };


  const navigate = useNavigate();

  const goToAddFurniture = () => {
    navigate('/addFurnitureModel');
  }

  const handleEdit = (item) => {
    navigate(`/editFurniture/${item.furniture_model_id}`, { state: item });
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  const handleDeleteOpen = (item) => {
    setOpen(true);
    setfurnitureToDelete(item);
  };

  const handleDeleteClose = () => {
    setOpen(false);
    setfurnitureToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (furnitureToDelete) {
      dispatch(deleteFurniture(furnitureToDelete.furniture_model_id));
      handleDeleteClose();
    }
  };

  return (
    <>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, margin: "50px auto" }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Поиск по имени или характеристикам"
          inputProps={{ 'aria-label': 'Search name or characteristics' }}
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
            {furnituresToDisplay.map(item => (
              <Card key={item.furniture_model_id} sx={{ width: 345 }}>
                <CardHeader
                  title={item.furniture_name}
                  subheader={item.model}
                />
                {/* <CardMedia
              component="img"
              height="194"
              image="/static/images/cards/paella.jpg"
              alt="text"
            /> */}
                <CardContent>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.characteristics}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary', marginTop: "20px" }}>
                    {item.price}
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
          <Button onClick={goToAddFurniture} color='primary.contrastText' sx={{ marginBottom: "50px" }}>Добавить модель мебели</Button>
          <Dialog open={open} onClose={handleDeleteClose}>
            <DialogTitle>Подтверждение удаления</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Вы уверены, что хотите удалить мебель? Это действие необратимо и приведет к удалению продаж, связанных с указанной мебелью!
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

export default FurnitureModels;