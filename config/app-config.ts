export const CAMERA_START_ERROR = "카메라 시작 실패";

export const LANDING_PAGE_TITLE = "MotionBricks";

export const LANDING_PAGE_SUBTITLE = "손 제스처로 조립하는 3D 레고 시뮬레이터";

export const LANDING_PAGE_LOGIN_LABEL = "로그인";

export const LANDING_PAGE_FREE_TRIAL_LABEL = "무료 체험하기";

export const LANDING_PAGE_SIGN_UP_LABAL = "회원가입";

export const LOGIN_DESCRIPTION = "로그인 시 브릭이 자동 저장됩니다.";

export const ERROR_CODES = {
  RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",
  NETWORK_ERROR: "NETWORK_ERROR",
  SAVE_ERROR: "SAVE_ERROR",
  LOAD_ERROR: "LOAD_ERROR",
};

export const SUCCESS_CODES = {
  NETWORK_SUCCESS: "NETWORK_SUCCESS",
  SAVE_SUCCESS: "SAVE_SUCCESS",
  LOAD_SUCCESS: "LOAD_SUCCESS",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
};

export const LOAD_USER_ERROR_MESSAGES = "유저 정보 불러오는 중 네트워크 오류 발생:";

export const TOOLTIP_BUTTONS = {
  SAVE_LABAL: "저장",
  LAOD_LABAL: "불러오기",
};

export const BRICK_SAVE_TOAST = {
  FAIL_TITLE: "브릭 저장 실패",
  FAIL_DESCRIPTION: "서버와 통신 중 문제가 발생했습니다.",
  SUCCESS_TITLE: "브릭 저장 완료",
  SUCCESS_DESCRIPTION: "현재 작업 중인 브릭이 저장되었습니다.",
  NETWORK_ERROR_TITLE: "에러 발생",
  NETWORK_ERROR_DESCRIPTION: "네트워크 연결을 확인해주세요.",
};

export const BRICK_SAVE_LOG = {
  FAIL_MESSAGE: "브릭 저장 실패",
  SUCCESS_MESSAGE: "브릭 저장 완료",
  EXCEPTION_MESSAGE: "브릭 저장 중 오류 발생:",
};

export const BRICK_LOAD_TOAST = {
  FAIL_TITLE: "브릭 불러오기 실패",
  FAIL_DESCRIPTION: "서버에서 데이터를 가져오지 못했습니다.",
  SUCCESS_TITLE: "브릭 불러오기 완료",
  SUCCESS_DESCRIPTION: "저장된 브릭이 성공적으로 불러와졌습니다.",
  NETWORK_ERROR_TITLE: "에러 발생",
  NETWORK_ERROR_DESCRIPTION: "네트워크 연결을 확인해주세요.",
};

export const BRICK_LOAD_LOG = {
  FAIL_MESSAGE: "브릭 불러오기 실패",
  SUCCESS_MESSAGE: "브릭 불러오기 완료",
  EXCEPTION_MESSAGE: "브릭 불러오기 중 예외 발생:",
};

export const USER_LOGOUT_TOAST = {
  SUCCESS_TITLE: "로그아웃 완료",
  SUCCESS_DESCRIPTION: "다시 로그인하면 작업을 이어서 할 수 있습니다.",
  FAIL_TITLE: "로그아웃 실패",
  FAIL_DESCRIPTION: "네트워크 연결을 확인해주세요.",
};

export const USER_LOGOUT_LOG = {
  SUCCESS_MESSAGE: "로그아웃 성공",
  EXCEPTION_MESSAGE: "로그아웃 중 오류 발생",
};

export const LOGOUT_ALERT_TEXT = {
  TOOLTIP_LABEL: "로그아웃",
  TITLE: "정말 로그아웃 하시겠어요?",
  DESCRIPTION: `로그아웃하기 전에 브릭이 저장되었는지 확인해주세요.\n저장하지 않은 변경사항은 사라질 수 있습니다.`,
  CANCEL_BUTTON: "취소",
  CONFIRM_BUTTON: "로그아웃",
};
