export function calculateTimeLeft(startedAt, totalTime) {
  if (!startedAt) return totalTime * 60;
  const startedAtTime = new Date(startedAt);
  const currentTime = new Date();
  const elapsedTime = Math.floor((currentTime - startedAtTime) / 1000);
  const timeLeftInSeconds = totalTime * 60 - elapsedTime;

  return Math.max(timeLeftInSeconds, 0);
}
