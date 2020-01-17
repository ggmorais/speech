export const scrollDown = el => {
  let doc = document.querySelector(el);
  doc.scrollTo(0, doc.scrollHeight);
}