import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuyer } from '../../../actions/Buyer/buyerAction';
import '../Cards.css';
// import { styled } from '@mui/material/styles';
// import { red } from '@mui/material/colors';
import { Card, CardHeader, CardMedia, CardContent, Typography } from '@mui/material';
import Numeration from '../../Numeration/Numeration';


const BuyerCards = () => {
  const dispatch = useDispatch();
  const { buyer, currentPage, totalPages, limit, loading, error } = useSelector(state => state.buyer);

  useEffect(() => {
    dispatch(fetchBuyer(currentPage, limit));
    console.log(buyer);
  }, [dispatch, currentPage, limit]);

  const handlePageChange = (page) => {
    dispatch(fetchBuyer(page, limit));
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="wrapper">
      <div className="cards">
        {buyer.map(item => (
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
          </Card>
        ))}
      </div>
      <Numeration totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
    </div>
  );
};

export default BuyerCards;