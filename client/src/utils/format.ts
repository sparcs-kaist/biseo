export const formatTime = (time: Date) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hours < 12 ? "오전" : "오후";

  const displayHours = (hours % 12 ? hours % 12 : 12)
    .toString()
    .padStart(2, "0");
  const displayMinutes = minutes.toString().padStart(2, "0");

  return `${ampm} ${displayHours}:${displayMinutes}`;
};
