const BASE = {
  HOME: '/',
  LOGIN: '/login/',
  BOARD: '/board/',
  _404: '/404/',
};

const BOARD = {
  OWNER: `${BASE.BOARD}owner/`,
  KITCHEN: `${BASE.BOARD}kitchen/`,
  ROOM: `${BASE.BOARD}room/`,
  CUSTOMER: `${BASE.BOARD}customer/`,
};

export default { ...BASE, ...BOARD };
