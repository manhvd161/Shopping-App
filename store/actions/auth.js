export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyClGUjBfDc5jS5s7-aWV4T1BnTvL88YNwQ',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      if (errorId === 'EMAIL_EXISTS') {
        message = 'Email đã tồn tại!';
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyClGUjBfDc5jS5s7-aWV4T1BnTvL88YNwQ',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'Tài khoản không tồn tại';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'Mật khẩu không hợp lệ';
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
  };
};
