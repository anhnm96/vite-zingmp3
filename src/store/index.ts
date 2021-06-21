import { createStore } from 'vuex'
import { Howl } from 'howler'
import { formatTime } from '@/helpers/utils'
import { Song } from '../types'
interface SetStatePayload {
  prop: string
  value: any
}

let timeout: number
const store = createStore({
  state: {
    howler: null,
    currentSong: null as Song,
    playlist: null,
    seek: '0:00',
    playerProgress: 0,
    isMuted: false,
    volume: 0.5,
    isPlaying: false,
    showLyric: false,
    showPlaylist: true
  },
  mutations: {
    setState(state, payload: SetStatePayload) {
      // @ts-ignore
      state[payload.prop] = payload.value
    },
    setCurrentSong(state, payload) {
      state.howler?.pause()
      state.currentSong = payload
    },
    toggleShowPlaylist(state) {
      state.showPlaylist = !state.showPlaylist
    },
    updateMediaSessionMetaData(state) {
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
    }
  },
  actions: {
    loadSong({ commit, state, dispatch, getters }, payload) {
      // destroy Howl object 
      if (state.howler instanceof Howl) {
        state.howler.unload()
        console.log('unload')
        commit('setState', { prop: 'isPlaying', value: false })
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
        commit('setState', { prop: 'isPlaying', value: true })
        dispatch('progress')
      })
      state.howler.on('pause', () => {
        clearTimeout(timeout)
        commit('setState', { prop: 'isPlaying', value: false })
        console.log('pause', state.currentSong.title)
      })
      state.howler.on('unlock', () => {
        console.log('unlock', state.currentSong.title)
      })
      state.howler.on('stop', () => {
        console.log('stop', state.currentSong.title)
        commit('setState', { prop: 'isPlaying', value: false })
      })

      state.howler.on('end', () => {
        console.log('end', state.currentSong.title)
        commit('setState', { prop: 'currentSong', value: getters.nextSongs[0] })
        // commit('setState', { prop: 'isPlaying', value: false })
      })

      commit('updateMediaSessionMetaData')
      state.howler.play()
    },
    progress({ commit, state, dispatch }) {
      timeout = setTimeout(() => {
        console.log('timemout')
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
  },
  getters: {
    currentIndex(state) {
      return state.playlist?.song.items.findIndex((song: Song) => song.encodeId === state.currentSong.encodeId)
    },
    previousSongs(state, getters) {
      if (getters.currentIndex < 1) return []
      return state.playlist.song.items.slice(0, getters.currentIndex)
    },
    nextSongs(state, getters) {
      if (getters.currentIndex < 0) return []
      return state.playlist.song.items.slice(getters.currentIndex + 1)
    },
    duration(state) {
      return formatTime(state.currentSong.duration)
    }
  }
})

export default store
