export default date => {
  let t = new Date(date);
  t = t.getHours() + ':' + t.getMinutes();
  return t;
}