export default function calculatePace(km, time) {
  //time is in minutes

  const pace = time / km;

  const paceMinutes = Math.floor(pace);
  let paceSeconds = Math.round((pace - paceMinutes) * 60);

  if (paceSeconds < 10) {
    paceSeconds = "0" + paceSeconds;
  }

  return {
    minutes: paceMinutes,
    seconds: paceSeconds,
  };
}
