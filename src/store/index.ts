import { createStore } from 'vuex'
import { Howl } from 'howler'

interface SetStatePayload {
  prop: string;
  value: any;
}
const store = createStore({
  state: {
    howler: null,
    currentSong: null
  },
  mutations: {
    setState(state, payload: SetStatePayload) {
      // @ts-ignore
      state[payload.prop] = payload.value
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
    }
  },
  actions: {
    loadSong({ commit, state }, payload) {
      commit('setState', {
        prop: 'howler',
        value: new Howl({
          src: [payload.source],
          html5: true
        })
      })
      commit('setState', {
        prop: 'currentSong',
        value: payload.song
      })
      commit('updateMediaSessionMetaData')
      state.howler.play()

    }
  },
  getters: {
    isPlaying(state) {
      return state.howler?.playing()
    }
  }
})

export default store
