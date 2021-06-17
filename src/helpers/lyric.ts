// https://github.com/sl1673495/vue-netease-music/blob/master/src/utils/lrcparse.js

// [00:14.17] Trăng soi trong đêm mây trôi lặng thầm
// [00:17.62] Bên thềm nhà gió nhẹ nhàng
// [
//   {time: 14, content: 'Trăng soi trong đêm mây trôi lặng thầm'},
//   {time: 17, content: 'Bên thềm nhà gió nhẹ nhàng'}
// ]

interface Lyric {
  time: number;
  content: string;
}

export function lyricParser(lrc: string): Lyric[] {
  const lyrics = lrc.split('\n')
  const lrcObj = []
  for (let i = 0; i < lyrics.length; i++) {
    const lyric = decodeURIComponent(lyrics[i])
    const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
    const timeRegExpArr = lyric.match(timeReg)
    if (!timeRegExpArr) continue
    const content = lyric.replace(timeReg, '')
    for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
      const t = timeRegExpArr[k]
      const min = Number(String(t.match(/\[\d*/i)).slice(1))
      const sec = Number(String(t.match(/:\d*/i)).slice(1))
      const time = min * 60 + sec
      if (content !== '') {
        lrcObj.push({ time: time, content })
      }
    }
  }
  return lrcObj
}
