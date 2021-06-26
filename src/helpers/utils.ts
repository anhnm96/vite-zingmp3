export function displayDuration(sec: number, type = 1): string {
  const format = (val: number) => `0${Math.floor(val)}`.slice(-2)
  const hours = sec / 3600
  const minutes = (sec % 3600) / 60
  const seconds = sec % 60
  if (type === 1) {
    if (format(hours) !== '00') {
      return `${format(hours)} giờ ${format(minutes)} phút`
    } else {
      return `${format(minutes)} phút`
    }
  }
  if (type === 2) {
    return [format(minutes), format(seconds)].join(':')
  }
}

export function formatTime(time: number): string {
  const minutes = Math.floor(time / 60) || 0;
  const seconds = Math.round((time - minutes * 60) || 0);

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
