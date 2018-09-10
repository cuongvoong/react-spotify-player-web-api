import React, { Component } from "react";
import { connect } from "react-redux";
import "./Player.css";
import AlbumArt from "../components/AlbumArt";
import MediaPanel from "../components/MediaPanel";
import {
  setLoggedIn,
  setAccessToken,
  setAccessTokenExpirationTime,
  setRefreshToken,
  setDeviceId,
  setAlbumName,
  setAlbumImage,
  setTrackName,
  setArtistName,
  setPlaying,
  setPosition,
  setDuration
} from "../store/actions/playerActions";

class Player extends Component {
  constructor(props) {
    super(props);

    this.player = null;
    this.playerCheckInterval = null;
    this.playerCurrentStateInterval = null;
    this.refreshAccessTokenInterval = null;
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");
    const expires_in = params.get("expires_in");

    if ((access_token && refresh_token) || false) {
      this.props.setAccessToken(access_token);
      this.props.setRefreshToken(refresh_token);
      this.props.setAccessTokenExpirationTime(expires_in);
      this.props.setLoggedIn(true);

      this.playerCurrentStateInterval = setInterval(() => {
        if (this.props.player.playing) {
          this.getPlayerCurrentState();
        }
      }, 1000);
    }

    this.playerCheckInterval = setInterval(() => {
      this.checkForPlayer();
    }, 1000);

    //Check every minute if access token will expire within 10 minutes.
    //If yes, refresh token
    // this.refreshAccessTokenInterval = setInterval(() => {
    //   const now = Math.round(Date.now() / 1000);
    //   if (this.props.player.accessTokenExpirationTime - now < 3540) {
    //     console.log("Refreshing Token");
    //     this.getNewAccessToken();
    //     this.checkForPlayer();
    //   }
    // }, 60000);

    //Refresh access token after 90% lifetime
    // const tokenRefreshInterval = Math.round(
    //   ((parseInt(expires_in, 10) * 9) / 10) * 1000
    // );
    // this.refreshAccessTokenInterval = setInterval(() => {
    //   this.getNewAccessToken();
    //   if (this.player != null) this.player.connect();
    // }, tokenRefreshInterval);
  }

  componentWillUnmount() {
    clearInterval(this.playerCurrentStateInterval);
    clearInterval(this.refreshAccessTokenInterval);
  }

  getNewAccessToken = () => {
    const url =
      "https://arcane-forest-45215.herokuapp.com/refresh_token?refresh_token=" +
      this.props.player.refreshToken;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        const { access_token, expires_in } = response;
        this.props.setAccessToken(access_token);
        this.props.setAccessTokenExpirationTime(expires_in);
      })
      .catch(error => {
        console.error(error);
      });
  };

  getPlayerCurrentState() {
    this.player.getCurrentState().then(state => {
      if (!state) {
        console.error("User is not playing music through the Web Playback SDK");
        return;
      }

      const { position } = state;
      this.props.setPosition(position);
    });
  }

  checkForPlayer() {
    const { accessToken } = this.props.player;

    if (window.Spotify !== null) {
      clearInterval(this.playerCheckInterval);

      this.player = new window.Spotify.Player({
        name: "Cuong's Web API Spotify Player",
        getOAuthToken: cb => {
          cb(accessToken);
        }
      });
      this.createEventHandlers();

      // finally, connect!
      this.player.connect();
    }
  }

  createEventHandlers() {
    // Error handling
    this.player.on("initialization_error", message => {
      console.error(message);
    });
    this.player.on("authentication_error", message => {
      console.error(message);
      this.props.setLoggedIn(false);
    });
    this.player.on("account_error", message => {
      console.error(message);
    });
    this.player.on("playback_error", message => {
      console.error(message);
    });

    // Playback status updates
    this.player.on("player_state_changed", state => {
      // console.log(state);
      this.onStateChanged(state);
    });

    // Ready
    this.player.on("ready", async data => {
      const { device_id } = data;
      // console.log("Spotify player is ready!");
      await this.props.setDeviceId(device_id);
      // this.transferPlayBackHere();
    });
  }

  onStateChanged(state) {
    // if we're no longer listening to music, we'll get a null state.
    if (state !== null) {
      const { current_track: currentTrack } = state.track_window;

      const { position, duration } = state;

      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const albumImages = currentTrack.album.images;
      const albumArt = albumImages.pop().url;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const playing = !state.paused;

      this.props.setTrackName(trackName);
      this.props.setAlbumName(albumName);
      this.props.setAlbumImage(albumArt);
      this.props.setArtistName(artistName);
      this.props.setPlaying(playing);
      this.props.setPosition(position);
      this.props.setDuration(duration);
    }
  }

  /* Spotify Premium Feature only - Returns 403 for non-premium users*/
  // transferPlayBackHere() {
  //   const { deviceId, accessToken } = this.props.player;
  //   const url = "https://api.spotify.com/v1/me/player/";
  //   fetch(url, {
  //     method: "PUT",
  //     headers: {
  //       authorization: `Bearer ${accessToken}`,
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       device_ids: [deviceId],
  //       play: true
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  handlePreviousTrackButton = () => {
    this.player.previousTrack();
  };

  handleTogglePlayButton = () => {
    if (this.player != null) {
      this.player.togglePlay();
    }
  };

  handleNextTrackButton = () => {
    this.player.nextTrack();
  };

  handleChangePosition = position => {
    if (this.props.player.playing) {
      this.player.seek(position);
    }
  };

  render() {
    const { loggedIn, error, currentTrack, playing } = this.props.player;

    const {
      artistName,
      trackName,
      albumName,
      albumImage,
      position,
      duration
    } = currentTrack;

    return (
      <div className="Player">
        {error && <p>Error: {error}</p>}
        {loggedIn ? (
          <React.Fragment>
            <AlbumArt albumImage={albumImage} />
            <MediaPanel
              trackName={trackName}
              albumName={albumName}
              artistName={artistName}
              playing={playing}
              position={position}
              duration={duration}
              onPreviousTrackButton={this.handlePreviousTrackButton}
              onTogglePlayButton={this.handleTogglePlayButton}
              onNextTrackButton={this.handleNextTrackButton}
              onChangePosition={this.handleChangePosition}
            />
          </React.Fragment>
        ) : (
          <div className="login">
            <a
              href="https://arcane-forest-45215.herokuapp.com/login"
              className="login-button"
            >
              LOGIN TO SPOTIFY
            </a>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player
});

export default connect(
  mapStateToProps,
  {
    setLoggedIn,
    setAccessToken,
    setAccessTokenExpirationTime,
    setRefreshToken,
    setDeviceId,
    setAlbumName,
    setAlbumImage,
    setTrackName,
    setArtistName,
    setPlaying,
    setPosition,
    setDuration
  }
)(Player);
