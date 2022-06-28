import Web3 from "web3";
import abi from "./erc721/abi.js";
import constractAddr from "./erc721/ContractAddr.js";
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' });
const infura = process.env.INFURA_API; //infura api

const Mint = async (jsonUrl) => {

    const web3js = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/" + infura));
    try {
      const privateKey = process.env.WALLET_SECRET_KEY; //server private key      

      // 컨트랙트 객체를 만들어 method에 연결할 수 있게 해준다.
      const contract = new web3js.eth.Contract(abi, constractAddr);
      jsonUrl = "ipfs://bafyreidxt5h6foidhlr34xys3zjx3z3xitvdenrtnxz3xus3rvvwraskf4/metadata.json";

      const gasPrice = await web3js.eth.getGasPrice();
      console.log(gasPrice)

      // Contract의 mintNFT 함수에 계정 정보와 ipfs json url를 인자값으로 제공하여 함수 실행
      let data = contract.methods.mintNFT(jsonUrl).encodeABI();
      let rawTransaction = { "to": constractAddr, "gas": 2000000, "gasPrice": gasPrice,"data": data };

      web3js.eth.accounts.signTransaction(rawTransaction, privateKey)
      .then(signedTx => web3js.eth.sendSignedTransaction(signedTx.rawTransaction))

      //document.location.href = "http://localhost:8080/posts/post?postId=62b52b22ea74e4428f5bc931"; //작성한 글 페이지로 이동
    } catch (error) {
      console.log(error);
    }
  };

Mint()

export default Mint;
