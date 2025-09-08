# 일본어 학습 앱 - Japanese Learning App

Next.js + Tailwind CSS + shadcn/ui + TypeScript를 기반으로 한 **혁신적인 일본어 학습 플랫폼**입니다. 
ReactBits.dev의 애니메이션과 디자인 패턴을 참조하여 아름답고 인터랙티브한 UI를 구현했습니다.

## 🌟 주요 기능

### 📺 **YouTube 연동 학습** (NEW!)
- **실시간 영상-가사 동기화**: YouTube 영상과 가사가 실시간으로 동기화되어 자연스러운 학습 환경 제공
- **타임스탬프 기반 학습**: 각 가사 라인에 정확한 타임스탬프가 적용되어 영상과 완벽 동기화
- **인터랙티브 컨트롤**: 영상 재생/일시정지, 볼륨 조절, 구간 반복 등 학습에 최적화된 컨트롤
- **가사 클릭 이동**: 특정 가사를 클릭하면 해당 시점으로 즉시 이동
- **표시 옵션**: 로마지/한국어 번역 표시/숨김 기능으로 개인화된 학습 경험

### 🌸 **히라가나 암기** 
- 46개 히라가나 문자표와 인터랙티브 연습 모드
- 4지선다 퀴즈와 진행률 추적
- 성취도 기반 별점 시스템과 confetti 축하 효과

### 🎌 **가타카나 암기**
- 46개 가타카나 문자표와 다양한 학습 모드
- 연습 모드 + 메모리 게임으로 재미있는 학습
- 문제 셔플 기능과 향상된 게임 요소

### 📚 **기초 일본어**
- 카테고리별 학습 (인사, 동물, 음식, 숫자)
- 학습 모드와 퀴즈 모드 제공
- 직관적인 카테고리 아이콘과 진행률 추적

### 🎵 **J-Pop 학습**
- 실제 J-Pop 가사로 학습
- 듣기, 번역, 단어장 모드
- 자동 재생 시뮬레이션과 번역 정확도 측정

## 🛠 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **스타일링**: Tailwind CSS
- **컴포넌트**: shadcn/ui
- **애니메이션**: Framer Motion
- **언어**: TypeScript
- **YouTube 연동**: react-youtube
- **아이콘**: Lucide React
- **특수 효과**: React Confetti

## 📋 YouTube 연동 학습 특징

### 🎯 실시간 동기화
```typescript
// 예시: 타임스탬프 기반 가사 데이터
{
  startTime: 5, 
  endTime: 8,
  japanese: "踊りましょう", 
  romaji: "odori mashou", 
  korean: "춤을 춰요" 
}
```

### 🎮 인터랙티브 컨트롤
- **재생/일시정지**: 영상 제어와 동기화
- **구간 이동**: 10초 앞/뒤 이동 기능
- **볼륨 조절**: 세밀한 볼륨 컨트롤
- **가사 네비게이션**: 가사 클릭으로 해당 구간 이동

### 📱 반응형 디자인
- 모바일, 태블릿, 데스크톱 모든 화면 크기 지원
- 터치 친화적 인터페이스
- 적응형 레이아웃

## 🚀 시작하기

### 설치

```bash
# 저장소 클론
git clone <repository-url>

# 디렉토리 이동
cd japanese-learning-app

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

### 접속

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하세요.

## 📂 프로젝트 구조

```
src/
├── app/
│   ├── hiragana/          # 히라가나 학습 페이지
│   ├── katakana/          # 가타카나 학습 페이지
│   ├── basic/             # 기초 일본어 학습 페이지
│   ├── jpop/              # J-Pop 학습 페이지
│   ├── youtube/           # YouTube 연동 학습 페이지 (NEW!)
│   ├── layout.tsx         # 전역 레이아웃
│   └── page.tsx           # 메인 페이지
├── components/ui/         # shadcn/ui 컴포넌트들
├── lib/
│   ├── japanese-data.ts   # 일본어 데이터와 타입 정의
│   └── utils.ts           # 유틸리티 함수들
```

## 🎨 디자인 특징

- **ReactBits 스타일**: 부드러운 애니메이션과 현대적 UI
- **Glassmorphism**: 반투명 효과와 백드롭 블러
- **그라데이션**: 아름다운 색상 조합
- **마이크로 인터랙션**: 세밀한 사용자 피드백

## 🌐 YouTube 영상 추가하기

새로운 YouTube 영상을 추가하려면 `src/lib/japanese-data.ts`에서 `youtubeSongs` 배열에 다음 형식으로 추가하세요:

```typescript
{
  id: "unique-id",
  title: "노래 제목",
  artist: "아티스트명",
  youtubeId: "YouTube-Video-ID",
  duration: 240, // 초 단위
  lyrics: [
    { 
      startTime: 0, 
      endTime: 4,
      japanese: "日本語歌詞", 
      romaji: "romaji", 
      korean: "한국어 번역" 
    },
    // ... 더 많은 가사
  ]
}
```

## 📱 사용법

1. **메인 페이지**에서 학습 방식 선택
2. **YouTube 학습**: 실시간 영상-가사 동기화 학습
3. **문자 학습**: 히라가나/가타카나 체계적 암기
4. **단어 학습**: 카테고리별 기초 일본어
5. **가사 학습**: J-Pop으로 재미있는 표현 학습

## 🎯 학습 효과

- **시각적 학습**: 영상과 텍스트의 동시 제공
- **청각적 학습**: 원어민 발음과 리듬 체득
- **반복 학습**: 구간 반복과 속도 조절
- **문맥 학습**: 실제 상황에서의 일본어 사용법
- **재미있는 학습**: 게임화 요소로 지속적 동기부여

## 🤝 기여하기

이 프로젝트는 오픈 소스입니다. 기여를 환영합니다!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 🙏 감사의 말

- [ReactBits.dev](https://reactbits.dev/) - 디자인 영감
- [Next.js](https://nextjs.org/) - 프레임워크
- [shadcn/ui](https://ui.shadcn.com/) - UI 컴포넌트
- [Framer Motion](https://www.framer.com/motion/) - 애니메이션
- [react-youtube](https://www.npmjs.com/package/react-youtube) - YouTube 연동