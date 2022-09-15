import App from '../App'
import List from '../pages/List'
import Edit from '../pages/Edit'
import Login from '../pages/Login'
import Means from '../pages/Means'
import Registry from '../pages/Registry'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const baseRouter = () => (
    <Router>
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='/list' element={<List />}></Route>
                <Route path='/edit' element={<Edit />}></Route>
                <Route path='/means' element={<Means />}></Route>
            </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/registry' element={<Registry />}></Route>
        </Routes>
    </Router>
)
export default baseRouter;
