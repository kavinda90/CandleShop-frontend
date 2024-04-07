import {createSlice} from "@reduxjs/toolkit";
import {getCookie, setCookie} from 'react-use-cookie';

const initialState = {
  isLoggedIn: getCookie('logged') === 'yes',
  userProfile: JSON.parse(localStorage.getItem('profile')),
  darkMode: true
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.userProfile = action.payload;
      localStorage.setItem('profile', JSON.stringify(action.payload));
      setCookie('logged', 'yes', {
        days: 1,
      });
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userProfile = null;
      localStorage.removeItem('profile');
      setCookie('logged', 'no', {
        days: 0,
      });
    },
    updateProfile: (state, action) => {
      state.userProfile = action.payload;
      localStorage.setItem('profile', JSON.stringify(action.payload));
    },
    changeMode: (state) => {
      state.darkMode = !state.darkMode;
      if (state.darkMode) {
        document.querySelector('html').setAttribute('data-theme', "dark");
      } else {
        document.querySelector('html').setAttribute('data-theme', "winter");
      }
    }
  },
});

// console.log(cartSlice);
export const {loginUser, logoutUser, updateProfile, changeMode} = authSlice.actions;

export default authSlice.reducer;
