export interface Word {
  data: string
  startTime: number
  endTime: number
}
export interface Sentence {
  words: [Word]
}
