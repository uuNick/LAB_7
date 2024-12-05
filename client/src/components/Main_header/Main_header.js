import React from 'react';
import "./Main_header.css";
import { useNavigate, Link } from 'react-router-dom';

const Main_header = () => {

    // const navigate = useNavigate();

    // const GoToFurniture = () => {
    //     navigate('/furniture');
    // };

    // const GoToBuyer = () => {
    //     navigate('/buyer');
    // };


    // const GoToSale = () => {
    //     navigate('/sale');
    // };


    // const GoToContract = () => {
    //     navigate('/contract');
    // };


    return (
        <header>
            <div className="header_wrapper">
                <div className="first_block">
                    <p className="menu_link">Проект мебель</p>
                </div>
                <div className="menu">
                    <nav className="body_menu flex">
                        <ul className="menu_list flex">
                            <li className="menu_item"> <Link to="/furniture" className="menu_link">Мебель</Link></li>
                            <li className="menu_item"> <Link to="/buyers" className="menu_link">Покупатели</Link></li>
                            <li className="menu_item"> <Link to="/contracts" className="menu_link">Контракты</Link></li>
                            <li className="menu_item"> <Link to="/sales" className="menu_link">Продажи</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Main_header;