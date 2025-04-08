const encouragingPhrases = ["Отлично!", "Так держать!", "Продолжайте в том же духе!", "Замечательно!"]

export const getRandomEncouragingPhrase = () => {
  return encouragingPhrases[Math.floor(Math.random() * encouragingPhrases.length)]
}