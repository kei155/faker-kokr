import { textSource } from './text-source'

function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max)
}

function getLines(source: string): string[] {
  return source
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line)
}

function getWords(source: string): string[] {
  return source
    .split(/\s/)
    .map((word) => word.trim())
    .filter((word) => word)
}

function word() {
  const lines = getLines(textSource)
  const words = getWords(lines[getRandomNumber(lines.length - 1)])
  return words[getRandomNumber(words.length - 1)]
}

function words(count: number): string[] {
  const allWords = getLines(textSource).flatMap(getWords)
  return Array.from(new Array(count)).map(() => allWords[getRandomNumber(allWords.length - 1)])
}

function paragraph() {
  const lines = getLines(textSource)
  return lines[getRandomNumber(lines.length - 1)]
}
function paragraphs(count: number) {
  const lines = getLines(textSource)
  return Array.from(new Array(count)).map(() => lines[getRandomNumber(lines.length - 1)])
}

export { word, words, paragraph, paragraphs }
