# AirBricks

**📌 프로젝트 설명**

레고는 창의력과 공간 지각 능력을 키우는 훌륭한 교구지만, 실제 제품은 가격이 비싸서 접근하기 어려운 아이들도 많습니다.

**AirBricks**는 웹 기반 3D 조립 툴에 **손 제스처 인식 기능**을 결합해, 아이들이 **실물 블록 없이도 자유롭게 가상으로 레고를 조립**할 수 있는 플랫폼입니다.

- 웹 브라우저와 웹캠만 있으면 실행 가능.
- 마우스 대신 **손동작(핀치·회전·스냅 제스처)**으로 블록을 잡고, 회전시키고, 맞춰서 조립.
- 완성된 작품은 **저장/공유**할 수 있어, 아이들끼리 **가상 레고 전시회**를 여는 것도 가능.

---

### **👥 타겟**

- **레고를 사고 싶지만 가격 부담 때문에 즐기기 어려운 아이들**
- **학교/지역 아동센터**: 저렴한 디지털 대안으로 창의 교육 제공
- **부모/교사**: 아이들이 집에서도 쉽고 재미있게 블록 놀이를 체험하도록 지원

---

### **❌ 해결하는 문제**

- ❌ 레고 실물 세트는 고가 → 모든 아이들이 접근하기 어려움
- ❌ 집에 블록이 없으면 창의력·공간 감각을 발휘할 기회 부족
- ❌ PC/모바일 블록 앱은 대부분 마우스·터치 기반 → 직관성·몰입감 부족

✅ 웹·카메라만 있으면 누구나 무료로 **“가상 레고”**를 경험 가능

✅ 손 제스처를 통한 직관적인 인터랙션 → **실제 블록 놀이 같은 몰입감 제공**

✅ 작품 공유/저장 기능 → 아이들의 성취감, 놀이의 연속성 보장

---

### **⭐ 핵심 기능**

1. **웹 기반 3D 조립 UI**
   - Mecabricks 스타일 부품 브라우저, 색상 선택, 작업 공간 제공
2. **손 제스처 조립**
   - 핀치 → 블록 잡기
   - 손 이동 → 블록 이동
   - 손목 회전 → 블록 회전
   - 엄지 👍 → 스냅 고정
3. **스냅 규칙 엔진**
   - 블록 스터드/튜브 맞춤 → 자동 정렬 및 간섭 방지
4. **저장 & 공유**
   - JSON/.ldr 포맷 저장, 온라인 전시 보드 업로드
5. **가상 전시 모드**
   - 아이들이 만든 작품을 갤러리처럼 둘러보고, 친구와 공유

---

### **🔧 구현 가능성**

- **손 제스처 추적**: MediaPipe Hands / TensorFlow.js로 브라우저 내 실시간 추적 가능
- **3D 엔진**: Three.js + LDraw 라이브러리로 브릭 로딩·조립 구현 가능
- **UI**: Next.js(React) + Tailwind/shadcn으로 직관적 부품 패널 제작 가능
- **MVP**: 3–4주면 “기본 블록 집기/이동/스냅” + 저장 기능 구현 가능

# 기술스택

### **앱 프레임워크 & UI**

- **Next.js (App Router) + React**
  - 이유: 파일 기반 라우팅/서버 컴포넌트로 초기 성능과 코드 분리가 쉬움. 이미지/정적 파일(브릭 데이터) 서빙 편리. 배포(Vercel)도 간단.
- **Tailwind CSS + shadcn/ui**
  - 이유: 빠른 프로토타이핑(유틸리티 클래스), 접근성/일관성 갖춘 컴포넌트. 도구 패널·툴바·모달 구현이 빨라요.

### **3D 렌더링 & 파츠 로딩**

- **three.js + React Three Fiber(@react-three/fiber) + @react-three/drei**
  - 이유: 웹 3D 표준 de-facto. R3F로 React 생태계에 자연스럽게 통합(상태/컴포넌트화). drei로 카메라·컨트롤 등 보일러플레이트 축소.
- **LDrawLoader + LDraw 라이브러리**
  - 이유: 오픈 파츠 에코시스템(LDraw) 사용 → 합법적/재사용성↑. LDrawLoader가 파츠를 바로 three.js Mesh로 변환. 브릭 수를 최소로 골라 빠르게 MVP 구현 가능.

### **제스처/손 추적**

- **MediaPipe Tasks Vision (Hand Landmarker)**
  - 이유: 브라우저에서 가벼운 추론, 정확도/속도 균형. 샘플/가이드 풍부. 핀치·손바닥·손목 롤 등 제스처 파생이 쉬움.
    > 참고
    > https://www.youtube.com/watch?v=OrzYIv87hmk
    > https://www.npmjs.com/package/@mediapipe/tasks-vision

### **상태관리 & 데이터**

- **Zustand**
  - 이유: 전역 상태(선택된 파트, 히스토리, UI 옵션)를 가볍게 관리
- **TypeScript**
  - 이유: 스냅 포인트 메타(JSON), 매트릭스/쿼터니언 연산 인터페이스 등 타입 안정성 필요. 리팩토링 내구성↑.

### **성능 최적화**

- **Simple AABB 충돌**
  - 이유: 정확한 물리 대신 “겹침 방지” 수준으로 가볍게. 스냅 후보 탐색을 O(1)에 가깝게.

### **저장/불러오기**

- **OAuth(Google) + JSON 저장**
  - NextAuth.js + Google Provider로 인증 → Prisma DB에 JSON 저장/불러오기.
  - 이유: 로그인/회원가입을 OAuth로 단일화 → 사용자별 JSON 데이터(부품ID/트랜스폼/색상) 클라우드 저장 가능.

### 서버 & 배포

- **Prisma & PostgreSQL**
  - 이유: PostgreSQL은 구조적 데이터 관리와 JSONB 타입 지원으로 브릭 씬 스냅샷 저장에 적합.
  - Prisma는 타입 안전한 ORM으로 Next.js/TypeScript와 잘 맞아 빠른 개발과 유지보수 용이.
  - OAuth 로그인 시 사용자(User) 정보 관리, 씬(Scene)을 안정적으로 처리 가능.
- **Vercel**
  - 이유: Next.js와 궁합 최상, 미리보기/브랜치 데모 배포가 쉬움.

### **개발 품질**

- **ESLint + Prettier**
  - 이유: 코드 품질 일관성. 3D/제스처 같이 복잡한 코드에 기본 세팅 필수.
    > 참고
    > https://velog.io/@2wndrhs/%EC%95%8C%EC%95%84%EB%91%90%EB%A9%B4-%EC%93%B8%EB%8D%B0%EC%9E%88%EB%8A%94-ESLint-Prettier-%EC%84%A4%EC%A0%95-%EB%B0%A9%EB%B2%95

# API 명세서

### 공통 가이드라인

- OAuth 제외 데이터 형식: 모든 요청/응답 Body는 json을 기본
- 에러 응답:

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND", // 에러 종류 코드
    "message": "사용자님의 작품을 찾을 수 없습니다." // 개발자용 메시지
  }
}
```

### 로그인 시작

### **API 명세:**`GET /auth/google`

### **설명**

구글 OAuth 2.0 인증 플로우를 시작합니다.

클라이언트가 이 엔드포인트를 호출하면 서버는 **구글 로그인 동의 화면 URL** 로 리다이렉트합니다.

---

### **✅ 성공 응답 (리다이렉트 성공)**

- **Status Code:** `302 Found`
- **설명:** 구글 OAuth 동의 화면으로 리다이렉트됩니다.
- **Response Example (헤더):**

```json
Location: https://accounts.google.com/o/oauth2/v2/auth?client_id=...&redirect_uri=...&response_type=code&scope=openid%20email%20profile&state=xyz
```

### **❌ 실패 응답**

1. **구글 OAuth 설정 오류 (client_id 누락 등)**

- **Status Code:** `500 Internal Server Error`

```jsx
{
  "error": {
    "code": "ERROR_OAUTH_INIT",
    "message": "Google OAuth 인증을 시작하지 못했습니다."
  }
}
```

### 로그인 인증 콜백 (Authorization Code 교환)

### **API 명세:** `GET /auth/google/callback`

### **설명**

구글에서 전달된 code(및 state)를 받아 **토큰 교환**을 수행하고, id_token으로 사용자를 확인합니다.

- 최초 로그인 시: User를 생성(회원가입)
- 재로그인 시: 기존 User 조회
  이후 서버 세션/JWT를 발급하고 클라이언트를 앱으로 리다이렉트합니다.

---

### **✅ 성공 응답 ( 기본(브라우저 리다이렉트) )**

- **Status Code:** `302 Found`
- **설명:** 세션/JWT 발급 후 앱으로 리다이렉트
- **Response Header 예시:**

```json
Location: / (또는 /dashboard 등)
```

- **Status Code:** `200 OK`
- **Response Body:**

```jsx
{
  "userId": "usr_abc123cuid",
  "provider": "google",
  "providerSub": "google-oauth2|1234567890",
  "authenticated": true,
  "created": true
}
```

### **❌ 실패 응답**

1.  **잘못된 요청(코드/스테이트 누락 또는 불일치)**

- **Status Code:** `400 Bad Request`

```jsx
{
  "error": {
    "code": "ERROR_INVALID_REQUEST",
    "message": "잘못된 인증 요청입니다. code/state 값을 확인해주세요."
  }
}
```

1. **토큰 교환 실패(구글 응답 오류 등)**

- **Status Code:** `502 Bad Gateway`

```jsx
{
  "error": {
    "code": "ERROR_TOKEN_EXCHANGE",
    "message": "Google과의 토큰 교환에 실패했습니다."
  }
}

```

3. **서버 오류(DB/세션 발급 실패 등)**

- **Status Code:** 5`00 Internal Server Error`

```jsx
{
  "error": {
    "code": "ERROR_CREATION",
    "message": "사용자님의 브릭을 생성하지 못하였습니다."
  }
}

```

### 로그아웃

### **API 명세:** `POST  /auth/logout`

### **설명**

현재 로그인된 사용자의 세션을 종료합니다.

- 세션 쿠키를 제거하거나, 서버 세션/JWT 토큰을 무효화합니다.
- 클라이언트는 이후 보호된 API 접근 시 다시 로그인해야 합니다.

---

### **✅ 성공 응답 (로그아웃 성공 시)**

- **Status Code:** `200 OK`
- **설명:** 세션이 정상적으로 종료됨
- **Response Body:**

```json
{
  "loggedOut": true
}
```

**❌ 실패 응답**

1. **로그인 상태가 아닌 경우**

- **Status Code:** `401 Unauthorized`

```jsx
{
  "error": {
    "code": "ERROR_UNAUTHORIZED",
    "message": "로그인된 사용자가 없습니다."
  }
}
```

2. **서버 오류(세션 파기 실패)**

- **Status Code:** `500 Internal Server Error`

```jsx
{
  "error": {
    "code": "ERROR_LOGOUT",
    "message": "로그아웃 처리 중 오류가 발생했습니다."
  }
}
```

### 회원가입 후 브릭씬을 새로 생성

### **API 명세: `POST /**api/scenes`

### **설명**

로그인된 사용자의 새 브릭 씬을 생성합니다. 서버가 고유 ID를 발급하며, 생성된 리소스의 메타데이터와 함께 반환됩니다.

---

### **Request Body**

- **Content-Type:** `application/json`

| 필드명 (Field) | 타입 (Type) | 필수 (Required) | 설명 (Description)                                                 |
| -------------- | ----------- | --------------- | ------------------------------------------------------------------ |
| id             | `String`    | **Yes**         |                                                                    |
| data           | JSON        | **Yes**         | 씬 상태 스냅샷(부품ID/트랜스폼/색상 등) — Scene.data(JSONB)로 저장 |

**요청 예시:**

```json
{
  "data": {
    "bricks": [
      {
        "id": "b1",
        "partId": "3001",
        "color": "red",
        "transform": {
          "position": [0, 0, 0],
          "rotation": [0, 0, 0, 1]
        }
      }
    ]
  }
}
```

---

### **✅ 성공 응답 (새로운 씬을 생성한 경우)**

- **Status Code:** `201 Created`
- **설명:** 씬이 성공적으로 생성되었으며, 서버가 발급한 씬 ID를 반환합니다.
- **Response Body**

```json
{
  "sceneId": "ckx123abc456def789",
  "created": true
}
```

### **❌ 실패 응답 (서버 오류)**

- **Status Code:** `500 Internal Server Error`
- **설명:** 데이터베이스 연결 실패 등 예측하지 못한 서버 내부 오류가 발생한 경우에 반환됩니다.
- **Response Body:**
  ```json
  {
    "error": {
      "code": "ERROR_CREATION",
      "message": "사용자님의 브릭을 생성하지 못하였습니다."
    }
  }
  ```

### 로그인 후 내 브릭씬을 가져오기

### **API 명세: `GET** /api/scenes/{id}`

### **설명**

로그인된 사용자가 소유한 특정 브릭 씬(Scene)을 조회합니다.
요청 경로의 {id} 는 씬의 고유 식별자([Scene.id](http://scene.id/))입니다.

---

### **Request Body**

- **Content-Type:** `application/json`

---

### **✅ 성공 응답 (기존 세션을 찾은 경우)**

- **Status Code:** `200 OK`
- **설명:** 지정한 ID의 씬을 성공적으로 불러온 경우
- **Response Body**
  ```json
  {
    "sceneId": "ckx123abc456def789",
    "userId": "usr987zyx654wvu321",
    "data": {
      "bricks": [
        {
          "id": "b1",
          "partId": "3001",
          "color": "red",
          "transform": {
            "position": [0, 0, 0],
            "rotation": [0, 0, 0, 1]
          }
        }
      ]
    },
    "createdAt": "2025-09-20T12:00:00.000Z",
    "updatedAt": "2025-09-20T12:30:00.000Z"
  }
  ```
- id: 씬 고유 ID (Scene.id)
- userId: 씬 소유자 ID (User.id)
- data: 씬 스냅샷(JSON)
- createdAt: 생성 시각
- updatedAt: 최종 수정 시각

### **❌ 실패 응답**

1. **권한 없음 (자신의 씬이 아닌 경우)**

- **Status Code:** `403 Forbidden`

```jsx
{
  "error": {
    "code": "ERROR_FORBIDDEN",
    "message": "이 씬에 접근할 권한이 없습니다."
  }
}
```

2. **씬을 찾을 수 없음**

- **Status Code:** 404 Not Found

```jsx
{
  "error": {
    "code": "ERROR_NOT_FOUND",
    "message": "해당 브릭 씬을 찾을 수 없습니다."
  }
}
```

3. **서버 오류 (DB 문제 등)**

- **Status Code:** 500 Internal Server Error

```jsx
{
  "error": {
    "code": "ERROR_FETCH",
    "message": "사용자님의 브릭 씬을 불러오지 못하였습니다."
  }
}
```

### 작업중인 브린씬 저장, 업데이트 하기

### **API 명세: `PUT /api/scenes/{id}`**

### **설명**

로그인된 사용자가 소유한 특정 브릭 씬(Scene)의 **스냅샷(JSONB)** 을 저장/업데이트합니다.

경로의 {id} 는 업데이트 대상 **Scene.id** 입니다.

---

### **Request Body**

- **Content-Type:** `application/json`

| 필드명 (Field) | 타입 (Type) | 필수 (Required) | 설명 (Description)                                                           |
| -------------- | ----------- | --------------- | ---------------------------------------------------------------------------- |
| data           | JSON        | **Yes**         | 씬 상태 전체 스냅샷(부품ID/트랜스폼/색상 등). Scene.data 로 저장/치환됩니다. |

**요청 예시:**

```json
{
  "data": {
    "bricks": [
      {
        "id": "b1",
        "partId": "3001",
        "color": "red",
        "transform": {
          "position": [0, 0, 0],
          "rotation": [0, 0, 0, 1]
        }
      }
    ]
  }
}
```

---

### **✅ 성공 응답 (업데이트 성공 시)**

- **Status Code:** `200 OK`
- **설명:** 지정한 씬의 데이터가 성공적으로 업데이트되었습니다.
- **Response Body**

```json
{
  "sceneId": "ckx123abc456def789",
  "updated": true
}
```

### **❌ 실패 응답**

1. **권한 없음 (자신의 씬이 아닌 경우)**

- **Status Code:** `403 Forbidden`

```jsx
{
  "error": {
    "code": "ERROR_FORBIDDEN",
    "message": "이 씬에 접근할 권한이 없습니다."
  }
}
```

1. **대상 씬을 찾을 수 없음**

- **Status Code:** `404 Not Found`

```jsx
{
  "error": {
    "code": "ERROR_NOT_FOUND",
    "message": "해당 브릭 씬을 찾을 수 없습니다."
  }
}
```

1. **서버 오류 (DB 업데이트 실패 등)**

- **Status Code:** `500 Internal Server Error`

```jsx
{
  "error": {
    "code": "ERROR_UPDATE",
    "message": "사용자님의 브릭 씬을 업데이트하지 못하였습니다."
  }
}
```

# DB 스키마

## Prisma & PostgreSQL

### **User**

> 로그인 한 유저의 정보를 저장합니다.

| 컬럼명 (Column Name) | 타입 (Type)   | 제약 조건                | 설명 (Description)            |
| -------------------- | ------------- | ------------------------ | ----------------------------- |
| `id`                 | `VARCHAR(36)` | **`PK**, DEFAULT cuid()` | 유저 고유 ID                  |
| `provider`           | `VARCHAR(32)` |                          | OAuth 제공자 식별(google)     |
| `providerSub`        | `VARCHAR(64)` |                          | OAuth 제공자의 고유 사용자 ID |
| `createdAt`          | `TIMESTAMPTZ` | `DEFAULT now()`          | 유저 정보 생성 시각           |

### **Scene**

> 로그인 한 유저의 저장된 브릭 정보를 저장합니다.

| 컬럼명 (Column Name) | 타입 (Type)   | 제약 조건                | 설명 (Description)                                |
| -------------------- | ------------- | ------------------------ | ------------------------------------------------- |
| `id`                 | `VARCHAR(36)` | **`PK**, DEFAULT cuid()` | 씬 고유 식별자                                    |
| `userId`             | `VARCHAR(36)` | **`FK`**                 | 씬 소유자(user) 참조                              |
| `data`               | `JSONB`       |                          | 씬 상태 JSON(부품ID/트랜스폼/색상 등 전체 스냅샷) |
| `createdAt`          | `TIMESTAMPTZ` | `DEFAULT now()`          | 씬 생성 시각                                      |
| `updatedAt`          | `TIMESTAMPTZ` | `@updatedAt`             | 씬 최종 수정 시각                                 |

# 프로젝트 시나리오

- **핵심 조작 (브릭 직접 다루기)** → 제스처
  - 선택, 이동, 회전, 쌓기, 스냅, 카메라
- **속성/관리 (브릭 상태 변경)** → UI 버튼
  - 삭제, 복제, 색상 변경, 그룹화, 저장/불러오기

## 조작 기능

### **🖐️ 손 제스처 기능 (카메라 추적용)**

**브릭 선택 & 이동**

- **🤏 손가락 모아 집기(검지+엄지 닿기)** → 브릭 선택 (탭 대신)
- **🤏 집은 상태로 손을 움직이기** → 브릭 이동 (작업 평면 위)
- **🤏 손가락 벌리기(검지+엄지 떨어뜨리기)** → 브릭 놓기

---

**회전**

- **✌️ 두 손가락으로 돌리기(검지+중지 벌리고 회전)** → 브릭을 Y축 기준으로 회전
- (옵션) 90° 단위로 딱딱 스냅 회전

---

**수직 이동 (쌓기)**

- **🤏 집은 상태에서 손 위/아래로 움직이기** → 브릭을 위아래로 올리거나 내림
- 위에 다른 브릭이 있으면 **착!** 하고 stud에 맞춰 쌓임

---

**카메라 조작**

- **🖐️ 손바닥 펼치고 움직이기** → 카메라 패닝 (좌우/상하 이동)
- **👐 양손을 벌리거나 모으기** → 줌 인/아웃
- **✊ 주먹 쥔 손을 돌리기** → 카메라 회전 (오빗)

---

**스냅 기능**

- 이동 중 브릭이 stud 근처에 가면 → 자동으로 **착!** 하고 stud 단위에 맞춰짐
- 화면에는 stud 위치에 작은 표시(🔵 점, 🟢 링)가 나타나서 “여기에 맞춰진다”는 걸 보여줌

---

📌 정리하면,

- “탭” = 👉 검지+엄지 집기
- “드래그” = 🤏 집은 채로 손 이동
- “드롭” = 손 벌리기(👉 손가락 펴기)

## UI 기능

### 각 섹션들의 ui 구성 / 기능

**브릭:** 클릭시 → 브릭 종류 리스트 들이 쭉 나오게

**삭제 :** 생성된 블럭 선택 후 삭제 버튼 클릭

**색상변경:** 생성된 블럭 선택 후 색상 버튼 클릭

**레이어:** 생성된 블럭마다 하나의 레이어 창

**저장**

**불러오기**

뒤로 가기 (후순위)

복제 (후순위)

---

### 랜딩페이지 UI (후순위)

체험 UI 가 보이고 버튼 1개 (체험하기)
