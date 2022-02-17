export default function capitalize(str, everyword=false) {
  let prev_char = "";
  const newString = Array.from(str).map((char, idx) => {
    if (prev_char === "") {
      prev_char = char;
      if (!everyword && idx > 0 ){
          return char
      }
      return char.toUpperCase();
    } else if (char === "_") {
      prev_char = "";
      return " ";
    } else {
      prev_char = char;
      return char;
    }
  });
  return newString.join("");
}
