import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import {BrowserRouter as Router,Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoutes from './Services/ProtectedRoutes';
import Error from './Error';


function App() {
  const isAuthenticated=localStorage.getItem('access-token')
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/login' element={isAuthenticated ? <Navigate to={'/error'}/> : <Login/> } 
        
        />
        <Route path='/register' element={isAuthenticated ? <Navigate to={'/error'}/> : <Register/>}/>
        <Route path='/'  element={<ProtectedRoutes/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='*' element={<Error/>} />
        </Route>
        </Routes>
    </Router>
    </div>
  );
}

export default App;
