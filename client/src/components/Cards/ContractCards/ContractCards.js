import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContract } from '../../../actions/Contract/contractAction';
import { fetchAllBuyers } from '../../../actions/Buyer/buyerAction';
import '../Cards.css';
import { Card, CardHeader, CardMedia, CardContent, Typography } from '@mui/material';
import Numeration from '../../Numeration/Numeration';


const ContractCards = () => {
    const dispatch = useDispatch();
    const [buyerNames, setBuyerNames] = useState({});
    const { contract, currentPage, totalPages, limit, loading, error } = useSelector(state => state.contract);
    const {allBuyers} = useSelector(state => state.buyer);

    useEffect(() => {
        dispatch(fetchContract(currentPage, limit));
        if(allBuyers.length == 0)
        {
            dispatch(fetchAllBuyers());
        }
    }, [dispatch, currentPage, limit]);

    const handlePageChange = (page) => {
        dispatch(fetchContract(page, limit));
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    const buyerMap = allBuyers.reduce((map, buyer) => {
        map[buyer.buyer_id] = buyer.buyer_name;
        return map;
    }, {});

    return (
        <div className="wrapper">
            <div className="cards">
                {contract.map(item => (
                    <Card key={item.contract_number} sx={{ width: 345 }}>
                        <CardHeader
                            title={item.contract_number}
                        />
                        <CardContent>
                            <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                Contract date: {item.contract_date}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.primary', marginTop: "20px" }}>
                                Execution date: {item.execution_date}
                            </Typography >
                            <Typography variant="body2" sx={{ color: 'text.primary', marginTop: "20px" }}>
                                Buyer name: {buyerMap[item.buyer_id] || 'Неизвестно'}
                            </Typography >
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Numeration totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
        </div>
    );
};

export default ContractCards;