(function() {
    function SongPlayer() {
      /**
      * @desc object returned by the songplayer service for public use
      * @type {Object}
      */
      var SongPlayer = {};
      /**
      * @desc current song object from album songs array
      * @type {Object}
      */
      var currentSong = null;
      /**
      * @desc Buzz object audio file
      * @type {Object}
      */
      var currentBuzzObject = null;
      /**
      * @function playSong
      * @desc Plays currently scoped song and sets playing property to true
      */
      var playSong = function() {
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
            currentSong.playing = null;
          }

          currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
          });

          currentSong = song;
          };

          /**
          * @function .play
          * @desc public method for switching songs and playing songs when none are playing
          * @param {Object} song
          */
          SongPlayer.play = function(song) {
           if (currentSong !== song) {
             setSong(song);
             playSong();
        } else if (currentSong === song) {
          if (currentBuzzObject.isPaused()) {
          playSong();
        }
      }
   };
   /**
   * @function .pause
   * @desc public method for pausing the song
   * @param {Object} song
   */
   SongPlayer.pause = function(song) {
    currentBuzzObject.pause();
    song.playing = false;
};

         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
