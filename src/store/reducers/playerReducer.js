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
} from "../actions/types";

const initialState = {
  accessToken: "",
  accessTokenExpirationTime: 0,
  refreshToken: "",
  deviceId: "",
  loggedIn: false,
  playing: false,
  error: "",
  currentTrack: {
    trackName: "Track Name",
    artistName: "Artist Name",
    albumName: "Album Name",
    albumImage:
      "https://developer.spotify.com/assets/branding-guidelines/icon4@2x.png",
    position: 0,
    duration: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload
      };
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload
      };
    case SET_ACCESS_TOKEN_EXPIRATION_TIME:
      return {
        ...state,
        accessTokenExpirationTime: action.payload
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.payload
      };
    case SET_DEVICE_ID:
      return {
        ...state,
        deviceId: action.payload
      };
    case SET_TRACK_NAME:
      return {
        ...state,
        currentTrack: { ...state.currentTrack, trackName: action.payload }
      };
    case SET_ALBUM_NAME:
      return {
        ...state,
        currentTrack: { ...state.currentTrack, albumName: action.payload }
      };
    case SET_ALBUM_IMAGE:
      return {
        ...state,
        currentTrack: { ...state.currentTrack, albumImage: action.payload }
      };
    case SET_ARTIST_NAME:
      return {
        ...state,
        currentTrack: { ...state.currentTrack, artistName: action.payload }
      };
    case SET_PLAYING:
      return {
        ...state,
        playing: action.payload
      };
    case SET_POSITION:
      return {
        ...state,
        currentTrack: { ...state.currentTrack, position: action.payload }
      };
    case SET_DURATION:
      return {
        ...state,
        currentTrack: { ...state.currentTrack, duration: action.payload }
      };
    default:
      return state;
  }
};
