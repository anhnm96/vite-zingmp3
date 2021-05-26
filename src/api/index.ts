import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string || 'http://localhost:8080'
})

export function fetchPlaylist(id: string) {
  return request({
    url: '/playlist/getDetail?id=' + id
  })
}

export function fetchStreaming(id: string) {
  return request({
    url: '/song/getStreaming?id=' + id
  })
}

export function fetchHome(page = 1) {
  console.log('fetHome')
  return request({
    url: '/home?page=' + page
  })
}

export function fetchSong(id: string) {
  return request({
    url: '/song/getDetail?id=' + id
  })
}

export function fetchKaraokeLyric(id: string) {
  return request({
    url: '/lyric?id=' + id
  })
}

export function fetchLyric(link: string) {
  return request({
    url: link
  })
}

export default request