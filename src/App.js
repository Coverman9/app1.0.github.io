import './App.css';
import React, { Component } from 'react';
import AboutMe from './components/AboutMe/aboutme';
import { Suspense } from 'react';
import Footer from './components/Footer/footer';
import Home from './components/Home/home';
import UsersContainer from './components/Users/UsersContainer';
//import DialogsContainer from './components/Dialogs/DialogsContainer';
import { Navigate, Route, Routes } from 'react-router-dom';
import ReviewsContainer from './components/Reviews/reviewsContainer';
//import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { initializeApp } from './redux/app-reducer';
import { connect } from "react-redux";
import Preloader from './components/common/Preloader/Preloader';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


class App extends Component {

  catchAllHandledErrors = (promise)=> {
    alert("some error ocured")
    
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllHandledErrors)
  }

  componentWillUnmount() {
    window.addEventListener("unhandledrejection", this.catchAllHandledErrors)
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className="App">
        <HeaderContainer />
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path='/dialogs/*' element={ <DialogsContainer />} />
            <Route path='/' element={<Navigate to = "/home" />} />
            <Route path='/home' element={<Home />} />
            <Route path='/aboutme' element={<AboutMe />} />
            <Route path='/reviews/*' element={<ReviewsContainer />} />
            <Route path='/users' element={<UsersContainer />} />
            <Route path='/profile/:userId' element={ <ProfileContainer />} />
            <Route path='/profile' element={<ProfileContainer />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<div>404 NOT FOUND</div>} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, { initializeApp })(App);
