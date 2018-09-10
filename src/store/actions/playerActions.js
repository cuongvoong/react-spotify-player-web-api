import {
  SET_LOGGED_IN,
  SET_ACCESS_TOKEN,
  SET_ACCESS_TOKEN_EXPIRATION_TIME,
  SET_REFRESH_TOKEN,
  SET_DEVICE_ID,
  SET_TRACK_NAME,
  SET_ALBUM_NAME,
  SET_ALBUM_IMAGE,
  SET_ARTIST_NAME,
  SET_PLAYING,
  SET_POSITION,
  SET_DURATION
} from "./types";

export const setLoggedIn = loginStatus => dispatch => {
  dispatch({
    type: SET_LOGGED_IN,
    payload: loginStatus
  });
};

export const setAccessToken = accessToken => dispatch => {
  dispatch({
    type: SET_ACCESS_TOKEN,
    payload: accessToken
  });
};

export const setAccessTokenExpirationTime = expires_in => dispatch => {
  const now = Math.round(Date.now() / 1000);
  const accessTokenExpirationTime = now + parseInt(expires_in, 10);

  dispatch({
    type: SET_ACCESS_TOKEN_EXPIRATION_TIME,
    payload: accessTokenExpirationTime
  });
};

export const setRefreshToken = refreshToken => dispatch => {
  dispatch({
    type: SET_REFRESH_TOKEN,
    payload: refreshToken
  });
};

export const setDeviceId = deviceId => dispatch => {
  dispatch({
    type: SET_DEVICE_ID,
    payload: deviceId
  });
};

export const setTrackName = trackName => dispatch => {
  dispatch({
    type: SET_TRACK_NAME,
    payload: trackName
  });
};

export const setAlbumName = albumName => dispatch => {
  dispatch({
    type: SET_ALBUM_NAME,
    payload: albumName
  });
};

export const setAlbumImage = albumImage => dispatch => {
  dispatch({
    type: SET_ALBUM_IMAGE,
    payload: albumImage
  });
};

export const setArtistName = artistName => dispatch => {
  dispatch({
    type: SET_ARTIST_NAME,
    payload: artistName
  });
};

export const setPlaying = status => dispatch => {
  dispatch({
    type: SET_PLAYING,
    payload: status
  });
};

export const setPosition = position => dispatch => {
  dispatch({
    type: SET_POSITION,
    payload: position
  });
};

export const setDuration = duration => dispatch => {
  dispatch({
    type: SET_DURATION,
    payload: duration
  });
};
