import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ShowBudget from './pages/ShowBudget'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div><h1>Olá, baixe nosso aplicativo.</h1></div>} />
                <Route path="/customer/budget/show" element={<ShowBudget />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
