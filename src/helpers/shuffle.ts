export function shuffle(array: any[]) {
  const newArr: any[] = [...array]
  for (let i = newArr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[randomIndex]] = [newArr[randomIndex], newArr[i]]
  }
  return newArr
}
