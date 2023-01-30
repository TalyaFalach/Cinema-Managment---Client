
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from './pages/LoginPage/Login';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main/MainPage';
import MoviesPage from './pages/Movies/MoviesPage';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import Users from './pages/UsersPage/Users.jsx'
import EditUserPage from './pages/EditUserPage/EditUserPage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import AddUser from './pages/AddUserPage/AddUser';
import AddMovie from './pages/AddMoviePage/AddMovie';

import EditMoviePage from './pages/EditMoviePage/EditMoviePage';
import MembersPage from './pages/MembersPage/MembersPage.jsx';
import EditMember from './pages/EditMemberPage/EditMember';
import AddMemberPage from './pages/AddMemberPage/AddMemberPage';

function App() {
  return (
    <div className="App ">
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/main' element={<MainPage/>}/>
        <Route path='/movies' element={<MoviesPage/>}/>
        <Route path='/createaccount' element={<CreateAccount/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/edituser' element={<EditUserPage/>}/>
        <Route path='/adduser' element={<AddUser/>}/>
        <Route path='/pagenotfound' element={<PageNotFound/>}/>
        <Route path='/addmovie' element={<AddMovie/>}/>
        <Route path='/editmovie' element={<EditMoviePage/>}/>
        <Route path='/members' element={<MembersPage/>}/>
        <Route path='/editmember' element={<EditMember/>}/>
        <Route path='/addmember' element={<AddMemberPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
