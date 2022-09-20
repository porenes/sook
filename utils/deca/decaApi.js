export async function getDecaGalleries(usernameOrAddress) {
  const queryURI = `https://api.deca.art/trpc/gallery.previews?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22usernameOrAddress%22%3A%22${usernameOrAddress}%22%7D%7D%7D`;
  const result = await fetch(queryURI);
  console.log(result);
}
