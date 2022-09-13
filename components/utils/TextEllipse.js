export default function TextEllipse({ text, len }) {
  return text || "";
  return text.length < len ? text : text.slice(0, len) + "...";
}
