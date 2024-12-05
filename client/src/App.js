import React from "react";
import Furniture from "./pages/Furniture";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotFound404 from "./pages/NotFound404";
import Buyers from "./pages/Buyers";
import Contracts from "./pages/Contracts";
import Sales from "./pages/Sales";
import AddBuyer from "./pages/AddBuyer";
import AddFurniture from "./pages/AddFurniture";
import AddContract from "./pages/AddContract";
import AddSale from "./pages/AddSale";
import RedactBuyer from "./pages/RedactBuyer";
import RedactFurniture from "./pages/RedactFurniture";
import RedactContract from "./pages/RedactContract";
import RedactSale from "./pages/RedactSale";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Navigate to="/furniture" />} />
          <Route path="/furniture/*" element={<Furniture />} />
          <Route path="/addFurnitureModel" element={<AddFurniture />}/>
          <Route path="/editFurniture/:furnitureId" element={<RedactFurniture/>}/>
          <Route path="/sales" element={<Sales />} />
          <Route path="/addSale" element={<AddSale/>} />
          <Route path="/editSale/:saleId" element={<RedactSale/>} />
          <Route path="/buyers" element={<Buyers />} />
          <Route path="/addBuyer" element={<AddBuyer />}/>
          <Route path="/editBuyer/:buyerId" element={<RedactBuyer />}/>
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/addContract" element={<AddContract/>}/>
          <Route path="/editContract/:contractNumber" element={<RedactContract/>}/>
          <Route path="*" element={<NotFound404/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
