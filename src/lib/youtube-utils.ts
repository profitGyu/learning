// YouTube 관련 유틸리티 함수들

/**
 * YouTube 영상 ID로부터 썸네일 URL을 생성합니다
 * @param videoId YouTube 영상 ID
 * @param quality 썸네일 화질 ('maxres' | 'hq' | 'mq' | 'sd')
 * @returns 썸네일 URL
 */
export function getYouTubeThumbnail(
  videoId: string, 
  quality: 'maxres' | 'hq' | 'mq' | 'sd' = 'maxres'
): string {
  const qualityMap = {
    maxres: 'maxresdefault',
    hq: 'hqdefault',
    mq: 'mqdefault',
    sd: 'sddefault'
  };
  
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * YouTubeSong 객체에 썸네일 URL이 없으면 자동으로 생성합니다
 * @param song YouTubeSong 객체
 * @returns 썸네일 URL이 포함된 YouTubeSong 객체
 */
export function ensureThumbnailUrl<T extends { thumbnailUrl?: string; youtubeId: string }>(song: T): T {
  if (!song.thumbnailUrl && song.youtubeId) {
    return {
      ...song,
      thumbnailUrl: getYouTubeThumbnail(song.youtubeId)
    };
  }
  return song;
}
