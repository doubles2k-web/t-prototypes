# TVING Prototypes

디자인 프로토타입 모음. GitHub Pages로 배포되어 모바일에서 바로 테스트 가능.

## 📁 구조

```
tving-prototypes/
├── index.html              ← 메인 허브 (프로토타입 목록)
├── member-info/
│   └── index.html          ← 회원 정보 관리
├── password-change/        ← (예시) 다음에 추가할 화면
│   └── index.html
└── README.md
```

## 🚀 새 프로토타입 추가하기

1. 새 폴더 만들기 (예: `password-change/`)
2. Claude에서 받은 `index.html` 파일을 폴더에 넣기
3. 루트 `index.html`에 카드 링크 추가
4. `git push` → 자동 배포

## 🔗 접속 URL

- **허브**: `https://doubles2k-web.github.io/tving-prototypes/`
- **회원정보**: `https://doubles2k-web.github.io/tving-prototypes/member-info/`

## 📱 앱처럼 쓰기

iPhone Safari → 공유(⬆) → 홈 화면에 추가

## 🔄 수정할 때

1. 수정할 `index.html`을 Claude 채팅에 업로드
2. 변경사항 요청
3. 받은 파일로 교체 → `git push`
