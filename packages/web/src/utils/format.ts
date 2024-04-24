export const formatTime = (isoString: string) => {
  const time = new Date(isoString);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hours < 12 ? "오전" : "오후";

  const displayHours = (hours % 12 ? hours % 12 : 12)
    .toString()
    .padStart(2, "0");
  const displayMinutes = minutes.toString().padStart(2, "0");

  return `${ampm} ${displayHours}:${displayMinutes}`;
};

export const formatDate = (isoString: string) => {
  const time = new Date(isoString);

  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const day = ["일", "월", "화", "수", "목", "금", "토"][time.getDay()];

  return `${year}년 ${month}월 ${date}일 (${day})`;
};

export const formatDateSimple = (isoString: string) => {
  const time = new Date(isoString);

  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();

  return `${year}-${month}-${date}`;
};
