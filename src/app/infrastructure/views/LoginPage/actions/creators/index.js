/* eslint-disable */
import axios from 'axios'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from '../types'

export const userLoginActions = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const { data } = await axios
      .get(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/user`)
      .catch(function (error) {
        console.log(error)
      })

    const isChecked = data.filter(
      (user) => user.user_email == email && user.user_password == password
    )

    if (isChecked.length) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: isChecked[0]
      })
    } else {
      throw new Error('Email veya şifreniz geçersiz!')
    }

    localStorage.setItem('userInfo', JSON.stringify(isChecked[0]))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

//LOGOUT
export const logout = () => (dispatch) => {
  localStorage.setItem('userInfo', '')
  dispatch({ type: USER_LOGOUT })
}
