export const getMinutesFromNow = (timeStamp) => {
  if (!timeStamp) {
    return false;
  }

  const now = Date.parse(new Date().toUTCString());
  const t = Date.parse(timeStamp) - now;
  const minutes = Math.floor((t / 1000 / 60) % 60);
  return minutes;
}