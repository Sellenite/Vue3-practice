import { get } from './base'

export function processSongs(songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }

  const arr = songs.map((song) => {
    return song.mid
  });

  return get('/api/getSongsUrl', {
    mid: encodeURIComponent(JSON.stringify(arr))
  }).then((result) => {
    const map = result.map
    return songs.map((song) => {
      return {
        ...song,
        url: map[song.mid]
      }
    }).filter((song) => {
      return song.url && song.url.indexOf('vkey') > -1
    })
  })
}

const lyricMap = {}

export function getLyric(song) {
  if (song.lyric) {
    return Promise.resolve(song.lyric)
  }
  const mid = song.mid
  const lyric = lyricMap[mid]
  if (lyric) {
    return Promise.resolve(lyric)
  }

  return get('/api/getLyric', {
    mid
  }).then((result) => {
    const lyric = result ? result.lyric : '[00:00:00]该歌曲暂时无法获取歌词'
    lyricMap[mid] = lyric
    return lyric
  })
}
