(function() {
    function SongPlayer(Fixtures) {
      /**
      * @desc object returned by the songplayer service for public use
      * @type {Object}
      */
      var SongPlayer = {};
      /**
      * @desc gets current album information for the playing song
      * @type {Object}
      */
      var currentAlbum = Fixtures.getAlbum();
      /**
      * @desc Buzz object audio file
      * @type {Object}
      */
      var currentBuzzObject = null;
      /**
      * @function playSong
      * @desc Plays currently scoped song and sets playing property to true
      */
      var playSong = function(song) {
        currentBuzzObject.play();
        song.playing = true;
      }
      /**
      * @function setSong
      * @desc Stops currently playing song and loads new audio file as currentBuzzObject
      * @param {Object} song
      */
      var setSong = function(song) {
          if (currentBuzzObject) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
          }

          currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
          });

          SongPlayer.currentSong = song;
          };
          /**
          * @function getSongIndex
          * @desc Retrieves songIndex from current song albumData
          * @param {Object} song
          */
          var getSongIndex = function(song) {
              return currentAlbum.songs.indexOf(song);
          };
          /**
          * @desc current song object from album songs array
          * @type {Object}
          */
          SongPlayer.currentSong = null;
          /**
          * @function .play
          * @desc public method for switching songs and playing songs when none are playing
          * @param {Object} song
          */
          SongPlayer.play = function(song) {
          song = song || SongPlayer.currentSong;
           if (SongPlayer.currentSong !== song) {
             setSong(song);
             playSong(song);
           } else if (SongPlayer.currentSong === song) {
             if (currentBuzzObject.isPaused()) {
               playSong(song);
          }
        }
    };
   /**
   * @function .pause
   * @desc public method for pausing the song
   * @param {Object} song
   */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };
    /**
    * @function .previous
    * @desc decrements the currentSongIndex value
    */
    SongPlayer.previous = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex--;

        if (currentSongIndex < 0) {
          currentBuzzObject.stop();
          SongPlayer.currentSong.playing = null;
        } else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
          }
    };

         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
