(function() {
     function SongPlayer($rootScope, Fixtures) {
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
      * @function stopSong
      * @desc Stops currently scoped song and sets playing property to null
      */
      var stopSong = function(song) {
        currentBuzzObject.stop();
        song.playing = null;
      }
      /**
      * @function setSong
      * @desc Stops currently playing song and loads new audio file as currentBuzzObject
      * @param {Object} song
      */
      var setSong = function(song) {
          if (currentBuzzObject) {
            stopSong(SongPlayer.currentSong);
          }

          currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
          });

          currentBuzzObject.bind('timeupdate', function() {
            $rootScope.$apply(function() {
              SongPlayer.currentTime = currentBuzzObject.getTime();
            });
          });
          currentBuzzObject.bind('volumechange', function() {
            $rootScope.$apply(function() {
              SongPlayer.volume = currentBuzzObject.getVolume();
            });
          });

          SongPlayer.currentSong = song;
          SongPlayer.currentAlbum = currentAlbum;
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
          * @desc Current volume of playback (Buzz 0-100)
          * @type {Number}
          */
          SongPlayer.volume = null;
          /**
          * @desc current song object from album songs array
          * @type {Object}
          */
          SongPlayer.currentSong = null;
          /**
          * @desc Current playback time (in seconds) of currently playing song
          * @type {Number}
          */
          SongPlayer.currentTime = null;
          /**
          * @desc current song object from album songs array
          * @type {Object}
          */
          SongPlayer.currentAlbum = null;
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
    * @function setVolume
    * @desc Set volume (1-100) of currently playing song using Buzz setVolume
    * @param {Number} volume
    */
    SongPlayer.setCurrentVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
              }
    };
    /**
    * @function setCurrentTime
    * @desc Set current time (in seconds) of currently playing song
    * @param {Number} time
    */
    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
          currentBuzzObject.setTime(time);
        }
    };
    /**
    * @function .previous
    * @desc decrements the currentSongIndex value
    */
    SongPlayer.previous = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex--;

        if (currentSongIndex < 0) {
          stopSong(SongPlayer.currentSong);
        } else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
          }
    };
    /**
    * @function .next
    * @desc increments the currentSongIndex value
    */
    SongPlayer.next = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex++;

          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
    };

         return SongPlayer;
    }

    angular
        .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
