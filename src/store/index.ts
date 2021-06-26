import { createStore } from 'vuex'
import { Howl } from 'howler'
import { formatTime, shuffle } from '@/helpers'
import { Song, Playlist } from '../types'

interface SetStatePayload {
  prop: string
  value: any
}

export enum PlayerState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  PAUSE = 'PAUSE'
}

export enum PlayerMode {
  DEFAULT = 'DEFAULT',
  REPEAT_LIST = 'REPEAT_LIST',
  REPEAT_SONG = 'REPEAT_SONG'
}

let timeout: number
const store = createStore({
  state: {
    theme: 'dark',
    howler: null,
    currentSong: null as Song,
    playlist: null as Playlist,
    seek: '0:00',
    playerProgress: 0,
    isMuted: false,
    volume: 0.5,
    playerState: PlayerState.IDLE,
    showLyric: false,
    showPlaylist: true,
    isShuffled: false,
    shuffledList: [] as Song[],
    playerMode: PlayerMode.DEFAULT
  },
  mutations: {
    setTheme(state, payload) {
      state.theme = payload
    },
    setState(state, payload: SetStatePayload) {
      // @ts-ignore
      state[payload.prop] = payload.value
    },
    setCurrentSong(state, payload: Song) {
      state.howler?.pause()
      state.currentSong = payload
    },
    toggleShowPlaylist(state) {
      state.showPlaylist = !state.showPlaylist
    },
    updateMediaSessionMetaData(state) {
      // https://developers.google.com/web/updates/2017/02/media-session
      const navigator: any = window.navigator
      const MediaMetadata: any = (<any>window).MediaMetadata
      if ('mediaSession' in navigator === false) {
        return
      }
      navigator.mediaSession.metadata = new MediaMetadata({
        title: state.currentSong.title,
        artist: state.currentSong.artistsNames,
        album: 'Zing MP3',
        artwork: [
          {
            src: state.currentSong.thumbnailM,
            type: 'image/jpg',
            sizes: '512x512',
          },
        ],
      })
    },
    togglePlay(state) {
      if (state.howler?.playing()) {
        state.howler.pause()
      } else {
        state.howler.play()
      }
    },
    setVolume(state, payload: number) {
      if (state.isMuted) {
        state.howler.mute(false)
        state.isMuted = false
      }
      state.volume = payload
      state.howler.volume(payload)
    },
    toggleShowLyric(state) {
      state.showLyric = !state.showLyric
    },
    toggleMute(state) {
      state.isMuted = !state.isMuted
      state.howler.mute(state.isMuted)
    },
    toggleShuffleSongList(state) {
      state.isShuffled = !state.isShuffled
      if (state.isShuffled) {
        const currentIndex = state.playlist.song.items.findIndex((song: Song) => song.encodeId === state.currentSong.encodeId)
        state.shuffledList = [state.currentSong, ...shuffle([...state.playlist.song.items.slice(0, currentIndex), ...state.playlist.song.items.slice(currentIndex + 1)])]
      }
    },
    setNextPlayerMode(state) {
      if (state.playerMode === PlayerMode.DEFAULT)
        state.playerMode = PlayerMode.REPEAT_LIST
      else if (state.playerMode === PlayerMode.REPEAT_LIST)
        state.playerMode = PlayerMode.REPEAT_SONG
      else
        state.playerMode = PlayerMode.DEFAULT
    }
  },
  actions: {
    loadSong({ commit, state, dispatch, getters }, payload) {
      // destroy Howl object 
      if (state.howler instanceof Howl) {
        state.howler.unload()
        clearTimeout(timeout)
      }

      commit('setState', {
        prop: 'howler',
        value: new Howl({
          src: [payload],
          html5: true,
          volume: state.volume
        })
      })

      state.howler.on('play', () => {
        console.log('play', state.currentSong.title)
        // clear old timeout
        clearTimeout(timeout)
        commit('setState', { prop: 'playerState', value: PlayerState.PLAYING })
        dispatch('progress')
      })
      state.howler.on('pause', () => {
        clearTimeout(timeout)
        // if we want howler load other song howler will pause -> unload
        if (state.playerState !== PlayerState.LOADING)
          commit('setState', { prop: 'playerState', value: PlayerState.PAUSE })
        console.log('pause', state.currentSong.title)
      })
      state.howler.on('unlock', () => {
        console.log('unlock', state.currentSong.title)
      })
      state.howler.on('stop', () => {
        console.log('stop', state.currentSong.title)
        clearTimeout(timeout)
        if (state.playerState !== PlayerState.LOADING)
          commit('setState', { prop: 'playerState', value: PlayerState.PAUSE })
      })

      state.howler.on('end', () => {
        console.log('end', state.currentSong.title)
        clearTimeout(timeout)
        if (state.playerMode === PlayerMode.REPEAT_SONG) {
          state.howler.play()
          return
        }
        if (getters.nextSongs.length === 0) {
          if (state.playerMode === PlayerMode.REPEAT_LIST) {
            commit('setState', { prop: 'currentSong', value: getters.songList[0] })
          } else {
            commit('setState', { prop: 'playerState', value: PlayerState.PAUSE })
          }
          return
        }
        commit('setState', { prop: 'currentSong', value: getters.nextSongs[0] })
      })

      commit('updateMediaSessionMetaData')
      state.howler.play()
    },
    progress({ commit, state, dispatch }) {
      timeout = setTimeout(() => {
        // console.log('timemout')
        const currentTime = state.howler.seek()
        commit('setState', { prop: 'seek', value: formatTime(currentTime) })
        commit('setState', { prop: 'playerProgress', value: (currentTime / state.howler.duration()) * 100 })
        dispatch('progress')
      }, 500)
    },
    updateSeek({ state, commit }, percentage: number) {
      // update playerProgress state
      commit('setState', { prop: 'playerProgress', value: percentage })
      // make howler seek to selected progress
      const seconds = (percentage / 100) * state.howler.duration()
      state.howler.seek(seconds)
    },
    playNext({ commit, getters }) {
      if (!getters.nextSongs.length) return
      commit('setState', { prop: 'currentSong', value: getters.nextSongs[0] })
    },
    playPrevious({ commit, getters }) {
      console.log('playPrevious', getters.previousSongs)
      if (!getters.previousSongs.length) return
      commit('setState', { prop: 'currentSong', value: getters.previousSongs[getters.previousSongs.length - 1] })
    }
  },
  getters: {
    currentIndex(state, getters) {
      return getters.songList.findIndex((song: Song) => song.encodeId === state.currentSong.encodeId)
    },
    previousSongs(_state, getters) {
      if (getters.currentIndex < 1) return []
      return getters.songList.slice(0, getters.currentIndex)
    },
    nextSongs(_state, getters) {
      if (getters.currentIndex < 0) return []
      return getters.songList.slice(getters.currentIndex + 1)
    },
    songList(state) {
      if (state.playlist === null) return []
      if (state.isShuffled) {
        return state.shuffledList
      } else {
        return state.playlist.song.items
      }
    },
    duration(state) {
      return formatTime(state.currentSong.duration)
    }
  }
})

export default store
