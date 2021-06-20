export interface Word {
  data: string
  startTime: number
  endTime: number
}
export interface Sentence {
  words: [Word]
}

export interface Song {
  title: string
  thumbnail: string
}
