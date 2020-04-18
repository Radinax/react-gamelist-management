export const maxNumber = type => {
  if(type === 'year') return '4'
  if(type === 'score') return '2'
  return '100'
}

export const minNumber = type => {
  if(type === 'year') return '4'
  if(type === 'score') return '1'
  return '0'
}

export const inputType = type => {
  if(type === 'textarea') return 'textarea'
  return 'text'
}

export const text = {
  game: 'Game',
  console: 'Console',
  genre: 'Genre',
  score: 'Score',
  year: 'Year',
  warning: 'Are you sure you want to erase this game from the list?',
  description: 'Description',
  summary: 'Summary',
  graphics: 'Graphics',
  gameplay: 'Gameplay',
  music: 'Music',
  conclusion: 'Conclusion',
  img: 'Img'
}

export const listOfConsoles = ['PC', 'PSX', 'PS2', 'PS3', 'PS4', 'SNES', 'N64', 'GameCube', 'Wii', 'Wii U', 'Switch', 'GBA', 'DS', '3DS', 'PSP', 'Vita']
export const listOfGenre = ['JRPG', 'SRPG', 'RPG', 'ARPG', 'Open World', 'Metroidvania', 'Action', 'FPS']
