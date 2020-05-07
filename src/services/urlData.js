export const getUserId = () =>
  window.location.pathname.match(/user\/(.*?)\//g)[0].slice(5, -1) || "";

export const getRoomId = () =>
  window.location.pathname.match(/room\/(.*?)\//g)[0].slice(5, -1) || "";
