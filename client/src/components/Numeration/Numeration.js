import React from 'react';
import "./Numeration.css";
import { Button } from '@mui/material';

const Numeration = ({currentPage, totalPages, handlePageChange}) => {
    return (
        <div className="buttons">
            <Button variant='contained' color='primary.contrastText' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                &lt;
            </Button>
            <span>Страница {currentPage} из {totalPages}</span>
            <Button variant='contained' color='primary.contrastText' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                &gt;
            </Button>
        </div>
    );
};

export default Numeration;