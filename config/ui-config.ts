export const GRID_HOVER_Y_OFFSET = 0.001;

export const GRID_HOVER_BAND_THICKNESS_STUDS = 17;

export const GRID_HOVER_OPACITY = 0.25;

export const GRID_HOVER_COLOR_X = "#4ade80";

export const GRID_HOVER_COLOR_Z = "#60a5fa";

export const TOOLBAR_OFFSET_PX = { x: 67, y: -67 };

export const TOOLBAR_POSITION = "fixed";

export const TOOLBAR_STYLE_LEFT = 0;

export const TOOLBAR_STYLE_RIGHT = 0;

export const TOOLBAR_Z_INDEX = 999998;

export const TOOLBAR_POINTER_EVENTS = "auto";

export const PALETTE_BASIC_COLOR = "#FFFFFF";

export const PALETTE_SIZE_WIDTH = 260;

export const PALETTE_SIZE_HEIGHT = 320;

export const PALETTE_OFFSET_FROM_TOOLBAR = { x: 72, y: -8 };

export const LANDING_PAGE_IMAGE_SIZE = 550;

export const LOGIN_PAGE_IMAGE_SIZE = 120;

export const HAND_PREVIEW_LABEL = "손 제스처 미리보기";

export const HAND_START_BUTTON_LABEL = "비디오 시작";

export const HAND_STOP_BUTTON_LABEL = "비디오 종류";

export const SIDEBAR_LAYERS_LABEL = "브릭 레이어";

export const SIDEBAR_LAYERS_INSIDE_LABEL = "브릭 없음";

export const BOTTOM_BRICK_DOCK = {
  SELECT_ITEM_ALL: "전체",
  SELECT_ITEM_BRICK: "브릭",
  SELECT_ITEM_PLATE: "납작브릭",
  INPUT_INSIDE_LABAL: "검색",
};

export const GESTURE_GUIDE_TEXTS = {
  PAW: {
    TITLE: "✋🏻 보자기",
    DESCRIPTION: `카메라 정면에서 오른손을 쭉 피고 움직이면\n메인 페이지의 커스텀 커서가 움직입니다.`,
  },
  FIST: {
    TITLE: "✊🏻 주먹 쥐기",
    DESCRIPTION: `카메라 정면에서 오른손 주먹을 쥐었다 피면 클릭으로 인식됩니다.\n브릭 선택, 툴바 선택, 사이드 UI 기능을 클릭할 수 있습니다.`,
  },
  V_SIGN: {
    TITLE: "✌🏻 브이",
    DESCRIPTION: `카메라 정면에서 오른손 브이 제스처를 유지한 채 천천히 움직이면\n드래그로 인식되어 브릭을 이동시킬 수 있습니다.`,
  },
  THUMB_UP: {
    TITLE: "👍🏻 업",
    DESCRIPTION: `카메라 정면에서 오른손 엄지를 치켜세우면 3D 작업 공간이 확대됩니다.\n화면을 더 가깝게 당겨 브릭 조립이나 세부 구조를 확인할 수 있습니다.`,
  },
  THUMB_DOWN: {
    TITLE: "👎🏻 다운",
    DESCRIPTION: `카메라 정면에서 엄지를 아래로 향하게 하면 3D 작업 공간이 축소됩니다.\n화면을 멀리서 볼 수 있어 전체 조립 구조나 배치를 확인하기에 좋습니다.`,
  },
};

export const BRICK_GUIDE_TEXTS = {
  BRICK_BAR: {
    TITLE: "🧱 브릭 바",
    DESCRIPTION: `화면 하단에 있는 브릭 바에서 사용할 브릭들을 선택할 수 있습니다.\n다양한 모양의 브릭 박스를 확인할 수 있습니다.`,
  },
  SEARCH: {
    TITLE: "🔍 선택,검색",
    DESCRIPTION: `브릭 바 상단의 선택 박스에서 종류별로 브릭, 납작브릭을 선택할 수 있습니다.\n검색창에 브릭 이름을 입력하면 브릭을 찾을 수 있습니다.`,
  },
  SUMMON: {
    TITLE: "📦 소환하기",
    DESCRIPTION: `브릭 바에서 원하는 브릭 박스를 마우스로 클릭하거나,\n손 제스처로 주먹을 쥐었다 피면 3D 작업 공간 위에 새 브릭이 소환됩니다.`,
  },
  MOVE: {
    TITLE: "🚚 브릭 옮기기",
    DESCRIPTION: `소환된 브릭에 ✊🏻 주먹(클릭) 동작으로 중앙에 표시된 빨간 네모가 나타납니다.\n빨간 네모 위에 ✌🏻 브이(드래그) 동작으로 브릭을 이동시킬 수 있습니다.`,
  },
  ASSEMBLE: {
    TITLE: "🧩 브릭 조립하기",
    DESCRIPTION: `소환된 브릭 두 개가 겹치면 자동으로 이동한 브릭이\n기존의 브릭 위로 올라가 조립이 됩니다.`,
  },
  SAVE: {
    TITLE: "💾 저장하기",
    DESCRIPTION: `브릭을 조립해 만든 결과물은 사이드바 상단의 저장 버튼을 통해\n저장할 수 있습니다.`,
  },
};

export const TOOLBAR_GUIDE_TEXTS = [
  {
    TITLE: "회전",
    DESCRIPTION: `회전 버튼을 누르면 선택된 브릭이 90° 단위로 회전합니다.\n회전 상태는 실시간으로 반영됩니다.`,
  },
  {
    TITLE: "색상 변경",
    DESCRIPTION: `팔레트 버튼을 누르면 색상 선택 창이 열립니다.\n팔레트에서 원하는 색을 선택하면 브릭의 표면 색상이 변경됩니다.`,
  },
  {
    TITLE: "삭제",
    DESCRIPTION: `삭제 버튼을 누르면 현재 선택된 브릭이 작업 공간에서 제거됩니다.\n브릭 레이어에서도 레이어를 선택하고 삭제가 가능합니다.`,
  },
  {
    TITLE: "⚙️ 조작 팁",
    DESCRIPTION: `툴바는 브릭 선택 시에만 표시됩니다. 툴바는 선택한 브릭만 오른쪽에 뜹니다.\n여러 브릭을 연속으로 선택해도 각 툴바 동작은 독립적으로 적용됩니다.`,
  },
];

export const USAGE_GUIDE_TEXTS = {
  TAB_GESTURE: "🤟🏻 제스처",
  TAB_BRICK: "🧱 브릭 소환·조립",
  TAB_TOOLBAR: "🛠️ 브릭 툴바",
};

export const GUIDE_BUTTON_TEXTS = {
  TOOLTIP: "사용 설명서",
  TITLE: "📖 사용 설명서",
  DESCRIPTION: "손 제스처, 브릭 소환 및 조립, 툴바 사용법을 안내합니다.",
};

export const SCENE_LOAD_TEXTS = {
  TITLE: "저장된 씬 불러오기",
  DESCRIPTION: "불러올 씬의 업데이트 시간을 검색해서 선택할 수 있습니다.",
  INPUT: "업데이트 시간으로 검색 (예: 2025. 12. 7)",
  NOT_FOUND: "저장된 씬이 없거나, 검색 조건에 맞는 항목이 없습니다.",
  BRICK_NUM: "브릭 개수: ",
  BRICK_COUNT: "개",
};
