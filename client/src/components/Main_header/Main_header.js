import React from 'react';
import "./Main_header.css";

const Main_header = () => {
    return (
        <header>
            <div className="header_wrapper">
                <div className="first_block">
                    <p className="menu_link">TEXT</p>
                </div>
                <div className="menu">
                    <nav className="body_menu flex">
                        <ul className="menu_list flex">
                            <li className="menu_item"> <a href="#" className="menu_link">Мебель</a></li>
                            <li className="menu_item"> <a href="#" className="menu_link">Покупатели</a></li>
                            <li className="menu_item"> <a href="#" className="menu_link">Контракты</a></li>
                            <li className="menu_item"> <a href="#" className="menu_link">Покупки</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Main_header;