# 인쇄 골목 웹 프론트엔드 README

## 🚀 Git Commit 규칙

1. **깃모지 사용**: 각 커밋 앞에는 깃모지를 붙여서 작업의 내용을 직관적으로 알 수 있게 합니다.
   - 예) `📚 :: API 문서 작성`
2. **커밋 메시지**: 한글로 명확하게 작성합니다.

### 커밋 타입

- **🚀 feat**: 새로운 기능 추가
- **🎨 style**: UI 스타일 변경
- **📦 build**: 빌드 관련 파일 수정 또는 추가
- **🔧 chore**: 일반적인 코드 유지 관리 작업
- **📚 docs**: 문서 추가/수정
- **🚨 fix**: 버그 수정
- **🔍 perf**: 성능 개선
- **♻️ refactor**: 코드 리팩토링
- **🧪 test**: 테스팅과 관련된 작업

## 🌳 Git Branch 전략

- `main`: 배포 가능한 상태만을 관리합니다.
- `dev`: 개발 중인 주요 브랜치로, 기능별 브랜치가 완성되면 이곳에 머지합니다.
- `feature/#<이슈번호>`: 각 기능별로 브랜치를 분리하여 작업합니다. 작업 완료 후 `dev` 브랜치로 PR을 생성합니다.

## 🖥 React 프로젝트 실행하기

### 0. Node.js 설치 확인

먼저, Node.js가 설치되어 있는지 확인합니다. 터미널에서 아래 명령어를 실행하여 Node.js의 버전을 확인할 수 있습니다.

```bash
node -v
```

만약 Node.js가 설치되어 있지 않다면, [Node.js 공식 웹사이트](https://nodejs.org/en)에서 다운로드 및 설치를 진행하세요.

### 1. 환경 변수 설정

프로젝트의 루트 디렉토리에 .env 파일을 생성합니다. 필요한 환경 변수들을 이 파일에 추가하세요.

예시:

```arduino
REACT_APP_HOST_API=http://localhost:8080
REACT_APP_KAKAO_REST_API=1234567890abcdef1234567890
```

⚠️ .env 파일을 저장소에 커밋하지 않도록 주의하세요.

### 2. 의존성 설치하기

프로젝트의 루트 디렉토리에서 다음 명령어를 실행하여 필요한 패키지와 라이브러리를 설치합니다.

```bash
npm install
```

### 3. 개발 서버 구동하기

설치가 완료되면, 다음 명령어로 개발 서버를 시작할 수 있습니다.

```bash
npm start
```

이후 웹 브라우저에서 http://localhost:3000 주소로 접속하면 개발 중인 React 앱을 볼 수 있습니다.
