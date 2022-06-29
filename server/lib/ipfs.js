import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

async function ipfs(image, title, contents, tag) {
  try {
    if (image) {
      const img = await client.add(image);
      const imgUrl = `https://ipfs.infura.io/ipfs/${img.path}`; // 전송한 이미지가 저장된 url
      console.log({ imgUrl });
    } else {
      image = '';
    }
    // json 파일 작성
    const json = JSON.stringify({
      title: `${title}`,
      contents: `${contents}`,
      image: `${imgUrl}`,
      tag: `${tag}`,
    });

    //console.log({ json });

    const jsonIPFS = await client.add(json);
    // json 파일이 저장되어있는 url을 변수에 담아주고, return한다.
    const URI = `https://ipfs.infura.io/ipfs/${jsonIPFS.path}`;
    console.log({ URI });
    return URI;
  } catch (e) {
    console.log(e);
  }
}

export default ipfs;
