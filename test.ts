console.log(
  new Date().toLocaleTimeString("en-GB", {
    timeStyle: "medium",
  })
);

const date = new Date();

const getTime = (date: Date) => {
  const s = date.toLocaleTimeString("en-GB", { timeStyle: "medium" });
  const hour = +s.slice(0, 2);
  const minute = s.slice(3, 5);
  const amOrPm = hour >= 12 ? "pm" : "am";
  return `${hour % 12 || 12}:${minute} ${amOrPm}`;
};
