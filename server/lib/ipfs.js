import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

async function ipfs(username, title, contents, tag, image) {
  try {

    // const img = await client.add(image);
    // let imgUrl = `https://ipfs.infura.io/ipfs/${img.path}`; // 전송한 이미지가 저장된 url
    // console.log({ imgUrl });

    // json 파일 작성
    const json = JSON.stringify({
      username: `${username}`,
      title: `${title}`,
      contents: `${contents}`,
      //image: `${imgUrl}`,
      tag: `${tag}`,
    });

    //console.log({ json });

    const jsonIPFS = await client.add(json);
    // json 파일이 저장되어있는 url을 변수에 담아주고, return한다.
    const URI = `https://ipfs.infura.io/ipfs/${jsonIPFS.path}`;
    console.log("URI###################\n", URI);
    return URI;
  } catch (e) {
    console.log(e);
  }
}

export default ipfs;