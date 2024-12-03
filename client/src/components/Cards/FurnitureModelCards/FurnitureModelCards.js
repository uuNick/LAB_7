import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchFurniture } from '../../../actions/FurnitureModel/furnitureModelActions';
import '../Cards.css';
// import { styled } from '@mui/material/styles';
// import { red } from '@mui/material/colors';
import { Card, CardHeader, CardMedia, CardContent, Typography, Button } from '@mui/material';
import Numeration from '../../Numeration/Numeration';



const FurnitureModels = () => {
  const dispatch = useDispatch();
  const { furniture, currentPage, totalPages, limit, loading, error } = useSelector(state => state.furnitureModels);

  useEffect(() => {
    dispatch(fetchFurniture(currentPage, limit));
  }, [dispatch, currentPage, limit]);

  const handlePageChange = (page) => {
    dispatch(fetchFurniture(page, limit));
  };

  const navigate = useNavigate();

  const goToAddFurniture = () => {
    navigate('/addFurnitureModel');
  }

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="wrapper">
      <div className="cards">
        {furniture.map(item => (
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
          </Card>
        ))}
      </div>
      <Numeration totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
      <Button onClick={goToAddFurniture} color='primary.contrastText' sx={{ marginBottom: "50px" }}>Добавить модель мебели</Button>
    </div>
  );
};

export default FurnitureModels;