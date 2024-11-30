import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSale } from '../../../actions/Sale/saleAction';
import { fetchAllFurnitureModels } from '../../../actions/FurnitureModel/furnitureModelActions';
import '../Cards.css';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import Numeration from '../../Numeration/Numeration';


const SaleCards = () => {
    const dispatch = useDispatch();
    const { sale, currentPage, totalPages, limit, loading, error } = useSelector(state => state.sale);
    const { allFurniture } = useSelector(state => state.furnitureModels);

    useEffect(() => {
        dispatch(fetchSale(currentPage, limit));
        if (allFurniture.length == 0) {
            dispatch(fetchAllFurnitureModels());
        }
    }, [dispatch, currentPage, limit]);

    const handlePageChange = (page) => {
        dispatch(fetchSale(page, limit));
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    const furnitureMap = allFurniture.reduce((map, furniture) => {
        map[furniture.furniture_model_id] = furniture.furniture_name;
        return map;
    }, {});

    return (
        <div className="wrapper">
            <div className="cards">
                {sale.map(item => (
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
                    </Card>
                ))}
            </div>
            <Numeration totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
        </div>
    );
};

export default SaleCards;