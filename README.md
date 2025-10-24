# MotionBricks

<p align="center">
  <img width="40%" height="40%" alt="Image" src="https://github.com/user-attachments/assets/bee9cbc4-3e99-45f4-a462-993bb2a9b56d" />
</p>

<p align="center">
  MotionBricks는 비싼 레고를 직접 사지 않아도, 웹에서 손 제스처로 브릭을 집고 조립할 수 있는 3D 레고 시뮬레이터입니다. 화면 속 브릭을 손동작을 통해 마우스 없이도 움직일 수 있으며 직관적이고 몰입감 있는 경험을 제공합니다.
</p>
<br>

# 🔖 CONTENTS 

* [🧱 Preview](#-preview)

* [❤️‍🔥 Motivation](#motivation)

* [🛠️ Tech Stacks](#️-tech-stacks)

* [🤟🏻 Gesture](#gesture)
  * [✋🏻 보자기](#보자기)
  * [✊🏻 주먹 쥐기](#주먹-쥐기)
  * [✌🏻 브이](#브이)
  * [👍🏻 업](#업)
  * [👎🏻 다운](#다운)
  
* [🎯 Feature](#-feature)

* [🖥️ Development](#️-development)
  * [3D 세상에 레고를 어떻게 소환 해야 할까?](#1-3d-세상에-레고를-어떻게-소환-해야-할까)
  * [3D 세상에서 클릭을 어떻게 감지할까?](#2-3d-세상에서-클릭을-어떻게-감지할까)
  * [브릭 충돌 기능 과정](#3-브릭-충돌-기능-과정)
  * [브릭 조립(스냅 기능) 구현중 브릭 돌기와 구멍에 어떻게 접근했을까?](#brick-snap)
  * [손 제스쳐 구현을 할 때 어떤 모델을 사용하면 좋을까?](#5-손-제스쳐-구현을-할-때-어떤-모델을-사용하면-좋을까)
  * [커스텀 제스쳐에서 Gesture Recognizer의 학습된 제스쳐로 변경한 이유](#6-커스텀-제스쳐에서-gesture-recognizer의-학습된-제스쳐로-변경한-이유)

* [⚠️ 에러 및 트러블슈팅 (개선 필요)](#️-에러-및-트러블슈팅-개선-필요)
  * [색상 팔레트 선택 이후 툴바 클릭이 되지 않는 문제](#palette-error)
  * [브릭 스냅 기능 중 ‘부분 조립’ 인식 오류](#snap-error)

* [📆 Schedule](#-schedule)
  * [프로젝트 기간: 2025.09.15(월) ~ 2025.10.16(목)](#프로젝트-기간-20250915월--20251016목)
  
* [📝 Review](#-review)
  * [보완 및 추가 구현 계획](#보완-및-추가-구현-계획)
<br>

# 🧱 Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/4e916803-148f-4aa6-8d2a-2c10cef456da" width="70%" alt="브릭 조립 시연 GIF" width="50%"
/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/71f7a947-ecef-4610-adff-9127c16d8dd1" width="70%" alt="손 제스처 시연 GIF" width="50%"
/>
</p>

<br>

# <a id="motivation">❤️‍🔥 Motivation</a>

MotionBricks 프로젝트의 출발점은 물리적 제약 없이 레고를 조립하는 경험을 웹에서도 그대로 느껴보고 싶다는 생각에서 시작되었습니다.

레고는 창의력과 몰입감을 자극하지만, 높은 가격과 공간의 제약 때문에 누구나 쉽게 즐기기 어렵다는 한계가 있습니다.
그래서 현실의 브릭 조립 경험을 3D 가상공간에 구현하였습니다. 
구현된 가상공간에 손 제스처 인식 기술을 결합해 마우스 없이도 직관적으로 브릭을 조립할 수 있는 기능을 추가했습니다.

<br>


# 🛠️ Tech Stacks

#### Frontend
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000)
&nbsp;
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=fff)
&nbsp;
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=000)
&nbsp;
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=fff)
&nbsp;
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=fff)
&nbsp;
![Zustand](https://img.shields.io/badge/Zustand-7856FF?style=flat-square&logo=zustand&logoColor=fff)

#### Gesture / 3D
![MediaPipe](https://img.shields.io/badge/MediaPipe-FFB74D?style=flat-square&logo=google&logoColor=fff)
&nbsp;
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=three.js&logoColor=fff)
&nbsp;
![React Three Fiber](https://img.shields.io/badge/React%20Three%20Fiber-000000?style=flat-square&logo=react&logoColor=61DAFB)

<br>


# <a id="gesture">🤟🏻 Gesture</a>

### <a id="보자기">✋🏻 보자기</a>
  * 카메라 정면에서 오른손을 쭉 피고 움직이면 메인 페이지에 커스텀 커서가 움직입니다.

### <a id="주먹-쥐기">✊🏻 주먹 쥐기</a>
  * 카메라 정면에서 오른손 주먹을 쥐었다 피면 클릭으로 인식 됩니다.
  * 브릭 선택, 툴바 선택, 사이드 UI 기능을 선택 클릭 할 수 있습니다.

### <a id="브이">✌🏻 브이</a>
  * 카메라 정면에서 오른손 브이 제스쳐를 유지한 채 천천히 움직이면 드래그가 됩니다.
  * 브릭을 이동시킬 수 있습니다.

### <a id="업">👍🏻 업</a>
  * 카메라 정면에서 오른손 엄지를 치켜세우면 3D 작업 공간이 확대됩니다.  
  * 화면을 더 가깝게 당겨 브릭 조립이나 세부 구조를 확인할 수 있습니다.

### <a id="다운">👎🏻 다운</a>
  * 카메라 정면에서 엄지를 아래로 향하게 하면 3D 작업 공간이 축소됩니다.  
  * 화면을 멀리서 볼 수 있어 전체 조립 구조나 배치를 확인하기에 좋습니다.

<br>


# 🎯 Feature

* 메인 페이지
  * 카메라 권한 요청 및 초기 설정
    * 사용자가 페이지에 접속하면 브라우저에서 카메라 권한을 요청합니다.
    * 권한을 허용하면 웹캠이 활성화되어 손 제스처 인식 준비 상태가 됩니다.
      
  * 실시간 손 제스처 인식 미리보기
    * 오른손을 화면에 비추면, 손 모양에 따라 커스텀 커서가 움직이며 반응합니다.
    * 구글에서 개발한 손 제스쳐 인식 프레임워크인 MediaPipe 기반의 실시간 인식 모델을 통해 손의 움직임이 즉각적으로 반영됩니다.
    * 커스텀 커서 위치는 3D 공간 위에 어느 지점인지 커스텀 기능과 이벤트를 통해 실시간 커서 좌표 위치를 확인 할 수 있습니다.
  
* 레고 소환
  * 브릭 선택 및 소환 기능
    * 하단의 브릭 리스트 UI에서 원하는 브릭을 클릭하면 3D 공간에 해당 브릭이 소환됩니다.
    * 실제 레고 공식 홈페이지에서 제공하는 파츠 데이터인 LDraw 파일을 3D 공간에 3D 모델을 렌더링하는 three.js를 이용하여 해당 브릭을 소환합니다.

  * 브릭 소환시 가상 브릭(고스트 브릭 UI)
    * 브릭 소환시 브릭을 어느 위치에 소환할지 미리 확인하기 위해 가상 브릭(고스트 브릭 UI)를 통해 알 수 있다.
    * 손 또는 마우스 이동에 따라 브릭의 위치가 스냅 후보에 맞춰 자연스럽게 따라옵니다.
  
  * 고유 식별 및 상태 저장
    * 각 브릭은 고유 UUID로 관리되어 선택, 삭제, 색상 변경 등의 상태 변화가 즉시 반영됩니다.
    * 주먹 제스처 또는 클릭으로 실제 브릭이 소환됩니다.

* 레고 스냅 & 조립 기능
  * 충돌 감지 및 시각 피드백
    * 브릭 충돌 감지를 위하여 충돌 박스를 브릭에 감싸는 AABB 기능을 적용시킵니다. 
    * 충돌한 브릭은 Box3Helper로 시각적으로 표시되어 편의성을 제공합니다.
    * 충돌한 브릭은 충돌을 감지하게 되면 움직였던 브릭이 기존의 브릭 위에 올라갑니다.
  

* 사이드 UI
  * 제스쳐 인식 카메라
    * 사이드 패널 상단에는 사용자의 손 제스처를 실시간으로 인식하는 카메라 미리보기가 표시됩니다.
    * 구글에서 개발한 손 제스쳐 인식 프레임워크인 MediaPipe 기반의 실시간 인식 모델을 통해 손의 움직임, 주먹 쥠, 브이 제스처 등을 정확히 감지합니다.
    * 인식된 손 모양은 영상 위에 시각적으로 랜드마크(손가락 관절선)로 표시되어, 제스처가 올바르게 인식되고 있는지 사용자가 즉시 확인할 수 있습니다.
   
  * 레이어 관리 패널
    * 사이드 패널 하단에는 현재 3D 공간에 배치된 모든 브릭 목록이 나열됩니다.
    * 브릭 삭제 시 자동으로 리스트에서 제거되고, 추가될 경우 실시간으로 목록에 반영되어 전체 브릭 상태를 직관적으로 관리할 수 있습니다.  
  
* 브릭 툴바 UI
  * 해당 브릭 툴바 UI 호버 
    * 브릭을 주먹 제스쳐로 선택하면 해당 브릭 오른쪽 상단에 작은 툴바 UI 가 뜹니다.
    * 툴바 UI에서 브릭 회전, 브릭 색상 변경, 삭제가 가능합니다.


<br>


# 🖥️ Development

<br>


### 1. 3D 세상에 레고를 어떻게 소환 해야 할까?
---
레고 브릭을 2D가 아닌 3D로 소환해야 하기 때문에 레고 공식 문서에 있는 LDraw 라는 브릭 3D 모델 데이터를 가지고 웹 브라우저에서 3D를 렌더링할 수 있는 자바스크립트 라이브러리인 Three.js를 사용했습니다.  
  
Three.js에서도 레고 브릭 부품(LDraw)을 불러와 실제 3D 모델로 변환해주는 로더인 LDrawLoader를 이용하여 브릭의 색상, 돌기, 구멍 등 내부 구조까지 3D로 변환해 3D 세계에 렌더링하게 됩니다.  
    
<p align="center">
 <img width="40%" height="40%" alt="Image" src="https://github.com/user-attachments/assets/a61c1faf-2ab7-43c0-84b0-91fc6006b185" />
</p>
그래서 LDrawLoader는 레고 브릭 부품 데이터(LDraw)에서 육면체, 돌기, 구멍, 돌기 원기둥면, 바닥면 등  
하나하나의 데이터를 찾아 파싱하여 렌더링 후 완성된 브릭을 3D 세계를 통해 사용자에게 보여줍니다.  


<br>


### 2. 3D 세상에서 클릭을 어떻게 감지할까?
---
3D 공간에서는 일반적인 HTML 버튼처럼 클릭 좌표로 바로 대상을 선택할 수 없었습니다.  
그 이유가 3D 세상은 깊이(Z축)가 존재하기 때문에 단순히 (x, y) 좌표만으로는 사용자가 화면에서 어떤 브릭을 클릭했는지 알 수 없기 때문입니다. 이를 해결하기 위해 Three.js에서 제공하는 Raycasting(광선 투사) 라는 기능을 사용했습니다.
  
Raycasting(광선 투사)은 말 그대로 카메라에서 마우스가 클릭된 방향으로 ‘보이지 않는 광선’을 쏘아서,  
그 광선이 3D 공간 속 어떤 물체에 부딪히는지를 계산해주는 기능입니다.  
처음 구현할 때는 이 광선이 브릭 전체가 아닌 브릭의 아주 작은 일부분(Mesh의 한 면) 에만 닿도록 되어 있어서, 클릭이 잘 되다 안되다 하는 문제가 발생했습니다. 
    
이 문제를 해결하기 위해 브릭의 내부 구조 전체(하위 Mesh들)까지 광선이 닿을 수 있도록 설정을 바꾸고,  
클릭된 부분의 부모 그룹(하나의 완성된 브릭)을 찾아내는 로직을 추가했습니다.
```ts
export const getBrickRoot = (object: THREE.Object3D): THREE.Object3D => {
  const hasPartId = (current: THREE.Object3D): current is BrickObject => {
    return typeof (current as BrickObject).userData?.partId === "string";
  };

  const findBrickRoot = (current: THREE.Object3D | null): THREE.Object3D => {
    if (current === null) return object;
    if (hasPartId(current)) return current;

    return findBrickRoot(current.parent);
  };

  return findBrickRoot(object);
};
```
이렇게 수정한 후에는 사용자가 클릭한 위치에 따라 브릭의 어느 부분을 눌러도 정확히 인식되고, 손 제스처나 마우스 클릭으로도 동일하게 브릭을 선택할 수 있게 되었습니다.

<br>


### 3. 브릭 충돌 기능 과정
---
브릭을 3D 공간에 단순히 배치하는 것만으로는 조립하는 경험을 줄 수 없었습니다.  
현실의 레고처럼 브릭이 맞닿을 때 ‘딱’ 하고 붙거나, 서로 겹치지 않도록 하는 기능이 필요했습니다.  
이를 구현하기 위해 브릭 간의 충돌과 조립(스냅(Snap)) 기능을 개발했습니다. 두 기능들이 필요하겠다 생각한 이유는 두 브릭이 충돌이 일어나면 이를 감지하여 조립이 되도록 만들게 하기 위해서 였습니다.

충돌 기능을 구현하는 데 있어서 두 가지 충돌 방식 중 어떤 걸 사용할지 고민했습니다.
하나는 AABB(Axis-Aligned Bounding Box) 방식으로, 브릭 중심 축을 기준으로 한 직육면체 경계 박스를 만들어 충돌을 감지하는 방법이고,
또 하나는 OBB(Oriented Bounding Box) 방식으로, 브릭의 회전 각도에 따라 경계 박스 자체도 회전시켜 더 정밀하게 충돌을 계산하는 방식이었습니다.
AABB 방식으로 하게 되면 브릭이 회전을 할때 브릭 중심 축을 기준으로 해서 경계 박스가 생성됨으로 경계 박스가 아래 예시 그림처럼 더 커지게 됨으로 OBB 방식으로 구현할까 고민하였습니다.

<p align="center">
  <img width="40%" height="40%" alt="Image" src="https://github.com/user-attachments/assets/2b96caed-a9fd-4cda-b366-57890154bca5" />
</p>

하지만 MotionBricks 프로젝트에서 브릭이 15도, 30도, 70도 등 브릭이 자유롭게 회전하는 게 아니라 90° 단위로만 회전하도록 레고 브릭의 특성에 맞게 기획했습니다. 따라서 브릭이 회전하더라도 항상 X, Y, Z 축과 정확히 평행한 상태를 유지하기 때문에, AABB를 사용해도 경계 박스가 과도하게 커지거나 틀어지지 않습니다. 

그래서 결과적으로는 AABB 방식으로도 충분히 정확한 충돌 감지가 가능하다 생각을 하였고 더 연산이 쉬운 AABB 방식으로 구현하여 충돌 기능을 구현하게 되었습니다. 


<br>


### <a id="brick-snap">4. 브릭 조립 스냅 기능 구현 중 브릭 돌기와 구멍에 어떻게 접근했을까?</a>
---

브릭을 단순히 겹쳐 놓는다고 조립된 느낌이 나지 않았고, 그냥 x, y, z축으로 브릭을 움직여서 스냅 기능 없이 브릭을 위에 올린다 하더라도 레고 브릭의 윗부분 돌기가 겹쳐서 올라가는 레고의 조립 특성과 맞지 않아 조립(스냅) 기능을 구현하였습니다. 
레고처럼 브릭의 돌기(Stud)와 구멍(Tube)이 정확히 맞물려야만 사용자가 ‘아, 조립됐다!’ 하는 감각을 느낄 수 있기 때문입니다.  

그래서 브릭 구조 및 크기를 먼저 파악하기 위해 일반적 mm의 길이 접근이 아닌 공식문서에서 제공하는 LDU라는 단위를 이용해서 레고 브릭 돌기와 구멍의 간격과 위치를 파악했습니다.
이 레고 브릭 돌기와 구멍 위치의 데이터를 기반으로 브릭 간의 거리를 계산해 돌기와 구멍이 가까워질 때  
조립이 되도록 로직을 구현했습니다. 

<p align="center">
  <img width="40%" height="40%" alt="Image" src="https://github.com/user-attachments/assets/85371227-adcb-4cb4-b8a7-5312b792822f" />
</p>

레고 브릭 돌기와 구멍 위치의 데이터는 JSON형태로 작성하였습니다. 각각의 브릭 JSON 형태의 데이터를 이용하여 긱각의 브릭의 돌기와 구멍이 어디 있는지 조회하고 충돌이 났을때 남아있는 조립 되는 브릭에서 남아있는 돌기의 여부를 파악해 조립이 될 수 있는지 없는지 먼저 판별후 조립기능이 작동되도록 구현하였습니다. 

2x4 브릭 데이터 ↓

```json
{
  "partId": "3001.dat",
  "version": "0.1.0",
  "unit": "LDU",
  "coordinateFrame": "part-local",
  "snapPoints": [
    { "id": "stud_0_0", "type": "stud-top", "position": [-10, 24, -30], "normal": [0, 1, 0] },
    { "id": "stud_0_1", "type": "stud-top", "position": [-10, 24, -10], "normal": [0, 1, 0] },
    { "id": "stud_0_2", "type": "stud-top", "position": [-10, 24, 10], "normal": [0, 1, 0] },
    { "id": "stud_0_3", "type": "stud-top", "position": [-10, 24, 30], "normal": [0, 1, 0] },

    { "id": "stud_1_0", "type": "stud-top", "position": [10, 24, -30], "normal": [0, 1, 0] },
    { "id": "stud_1_1", "type": "stud-top", "position": [10, 24, -10], "normal": [0, 1, 0] },
    { "id": "stud_1_2", "type": "stud-top", "position": [10, 24, 10], "normal": [0, 1, 0] },
    { "id": "stud_1_3", "type": "stud-top", "position": [10, 24, 30], "normal": [0, 1, 0] },

    { "id": "bottom_0_0", "type": "stud-bottom", "position": [-10, 0, -30], "normal": [0, -1, 0] },
    { "id": "bottom_0_1", "type": "stud-bottom", "position": [-10, 0, -10], "normal": [0, -1, 0] },
    { "id": "bottom_0_2", "type": "stud-bottom", "position": [-10, 0, 10], "normal": [0, -1, 0] },
    { "id": "bottom_0_3", "type": "stud-bottom", "position": [-10, 0, 30], "normal": [0, -1, 0] },

    { "id": "bottom_1_0", "type": "stud-bottom", "position": [10, 0, -30], "normal": [0, -1, 0] },
    { "id": "bottom_1_1", "type": "stud-bottom", "position": [10, 0, -10], "normal": [0, -1, 0] },
    { "id": "bottom_1_2", "type": "stud-bottom", "position": [10, 0, 10], "normal": [0, -1, 0] },
    { "id": "bottom_1_3", "type": "stud-bottom", "position": [10, 0, 30], "normal": [0, -1, 0] }
  ]
}

```



<br>




### 5. 손 제스쳐 구현을 할 때 어떤 모델을 사용하면 좋을까?
---
손의 움직임을 인식하기 위해 처음에는 단순한 손 모양 감지 모델을 고려했지만, 보다 세밀하게 손가락의 위치와 동작을 파악할 수 있는 모델이 필요했습니다. 그래서 선택한 것이 Google MediaPipe의 Hand Landmarker + Gesture Recognizer 입니다. 

Gesture Recognizer 모델은 카메라로 촬영된 손의 각 관절(총 21개)을 추적해 손 모양을 실시간으로 분석합니다. 이를 통해 단순한 손이 있다 수준이 아닌, 손가락을 폈는가, 쥐었는가, 브이를 했는가를 인식할 수 있습니다. 

<p align="center">
  <img width="60%" height="60%" alt="Image" src="https://github.com/user-attachments/assets/9b510d87-d7dd-4f5a-9525-b017b4501131" />
</p>

그 덕분에 사용자는 마우스 없이도 브릭을 클릭하거나, 드래그하고, 회전시키는 행동을 손 제스처로 수행할 수 있습니다.  
결과적으로 사용자는 손을 마우스처럼 사용할 수 있게 되었고, 기존의 ‘화면 조작’이 아닌 ‘직접 손으로 만지는 듯한’ 조립 경험이 가능해졌습니다. 

<p align="center">
  <img width="40%" height="40%" alt="Image" src="https://github.com/user-attachments/assets/cef18eaf-8148-4ed9-9cb1-c50d6061aa6c" />
</p>

<br>


### 6. 커스텀 제스쳐에서 Gesture Recognizer의 학습된 제스쳐로 변경한 이유
---

```
처음 기획한 손 제스쳐 기능

- 🤏 손가락 모아 집기(검지+엄지 닿기)** → 브릭 선택 (탭 대신)
- 🤏 집은 상태로 손을 움직이기** → 브릭 이동 (작업 평면 위)
- 🤏 손가락 벌리기(검지+엄지 떨어뜨리기)** → 브릭 놓기
```

처음 기획한 손 제스쳐는 실제 브릭을 집는 커스텀 손 제스쳐 모양으로 하려고 하였으나 Gesture Recognizer에 학습 되어있던 제스쳐를 가져와 사용했습니다. 기존 커스텀 손 제스쳐는 직접 손 각 관절의 포인트에 접근하여 포인트마다의 각도를 계산하여 로직을 작성해야 한다는 점은 어렵지 않았습니다. 

하지만 커스텀 제스쳐를 학습시켜야 한다는 점에서 시간이 오래 걸리고 학습을 하더라도 기존의 학습된 제스쳐보다 인식 기능이 떨어질 것 같아. 프로젝트 완성 후 나중에 구현해 학습하기로 하는 방향성을 잡았습니다.  


<br>


# ⚠️ 에러 및 트러블슈팅 (개선 필요)

### <a id="palette-error">1. 색상 팔레트 선택 이후 툴바 클릭이 되지 않는 문제</a>
---
색상 팔레트가 열릴 때, 3D 캔버스 클릭 이벤트가 중복 발생하지 않도록 포인터 제어를 UI 쪽으로 전환하도록 설계했습니다.

그러나 팔레트를 닫은 뒤에도 포인터 제어 상태가 정상적으로 복귀되지 않아, 툴바 클릭이 다시 작동하지 않는 문제가 남아 있습니다.
이 문제의 원인은 UI 오버레이가 캔버스 이벤트를 차단한 후 복원 로직이 누락된 것으로 보이며, 현재 이벤트 전환 시점을 조정하고 팔레트 닫힘 이벤트를 명확히 감지하도록 개선 중입니다.


<br>


### <a id="snap-error">2. 브릭 스냅 기능 중 ‘부분 조립’ 인식 오류</a>
---
스냅(Snap) 기능을 구현할 때, 브릭의 돌기(Stud)와 구멍(Tube) 위치 데이터를 비교해 정확히 맞닿으면 자동으로 결합되도록 만들었습니다. 
전체 조립은 정상적으로 작동했지만, 일부 브릭의 돌기만 겹치는 부분 조립 상황에서는 감지가 되지 않는 문제가 있었습니다. 다시 한번 조립 로직의 허용 오차를 더 세분화 시키거나 브릭 돌기의 위치나 구멍의 위치를 잘 맞추는 로직을 추가하여 조립이라는 경험에 맞게 기능을 개선 중에 있습니다. 


<br>


# 📆 Schedule

### 프로젝트 기간: 2025.09.15(월) ~ 2025.10.16(목)

* 1주차: 프로젝트 기획 및 설계  
* 2주차: 코어 UI, 3D 베이스 세팅, 소수 브릭 로딩  
* 3주차: 마우스로 먼저 조립 가능하게 구현. 레고 조립 기능(스냅 기능) 구현  
* 4주차: 손 제스처 연결 + 사용자 경험 피드백(기능, UI 등) 반영


<br>


# 📝 Review

이 프로젝트를 통해 얻은 인사이트

이번 프로젝트를 통해 브라우저 환경에서 3D 모델을 직접 다루는 경험을 쌓을 수 있었습니다. 단순히 Three.js를 사용하는 수준이 아니라, LDraw 데이터 구조를 직접 파싱하고 조립 로직과 충돌 감지를 직접 설계하면서 3D 그래픽스의 수학적 원리를 깊이 이해할 수 있었습니다. 또한, 손 제스처 기능을 실제 인터랙션으로 연결하면서 카메라 입력 → 모델 인식 → 커서 제어 → UI 이벤트까지 이어지는 하나의 완전한 실시간 인터랙션 파이프라인을 설계하는 경험을 할 수 있었습니다. 

하지만 손 제스쳐 인식 과정에서 다양한 조명과 배경에 따른 인식과 사람이 두명이 카메라에 나오면 손 제스쳐 인식 기능 작동이 잘 안되는 점에서 아쉬움을 느끼고 있습니다. 그리고 제스쳐 커서가 가끔 인식이 안되거나 하면 커서가 뚝뚝 끊기는 현상이 발생하여 추후 끊김 현상을 해결해야 겠다고 생각했습니다. 
 
<a id="보완-및-추가-구현-계획">보완 및 추가 구현 계획</a>:
  * OAuth (Google 로그인) 기능을 추가하여 개인 사용자별 세션 관리 및 저장 기능을 구현합니다.
  * 서버 구축을 통해 사용자의 조립 데이터를 자동 저장 및 불러오기(JSON 기반) 기능으로 확장합니다.
  * 사용자가 조립을 완료한 후, 완성된 브릭 구조 내에서 특정 조립 부분만 선택해 브릭 종류를 변경할 수 있도록 기능을 개선합니다.
  * 브릭이 마우스 또는 제스처 커서에 따라 이동할 때, 현재는 부드럽게 움직이지만 → ‘틱틱틱’ 하게, 그리드 단위로 스냅되는 움직임으로 변경해 레고 특유의 조립감을 더욱 살릴 예정입니다.

  
<br>

