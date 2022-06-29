import Web3 from "web3";
import abi from "./abi.js"
import constractAddr from "./contractAddr.js"
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' });

// let toAddress = '0x9684B57A74978dBE8bB0a4c5e7d8D09389dF2bfB'; //test account
// let numTokenToSend = 5;

// 토큰을 fromPrivateKey에서 toAddress로 numTokenToSend 개 보내는 함수. 
// fromPrivateKey 에 값을 않넣을 시 서버에서 보내줌.
// return 값 : true : 전송 성공, false : 전송 실패 의 promise를 보내줌.
async function sendToken(numTokenToSend, toAddress, fromPrivateKey = null) {

    return new Promise((res, rej) => {
        let privateKey;
        if(fromPrivateKey === null) privateKey = process.env.WALLET_SECRET_KEY; //contract owner address
        else privateKey = fromPrivateKey;
        
        const infura = process.env.INFURA_API; //infura api

        const web3js = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/" + infura));
        
        
        let contract = new web3js.eth.Contract(abi, constractAddr);
        // console.log("contract is : ",contract);
        const price = web3js.utils.toWei('1', 'ether');
        // console.log(typeof price);
        // console.log("token asdsadasdas", toAddress);
        let data = contract.methods.transfer(toAddress, (numTokenToSend * price).toString()).encodeABI();
        // console.log('after data')
        
        let rawTransaction = { "to": constractAddr, "gas": 100000, "data": data };
        web3js.eth.accounts.signTransaction(rawTransaction, privateKey)
            .then(signedTx => web3js.eth.sendSignedTransaction(signedTx.rawTransaction))
            .then(req => {
                // getTOKENBalanceOf(toAddress).then(balance => { console.log(toAddress + " Token Balance: " + balance); });
                //TODO: 계정 잔액 DB업데이트

                res(true);
            })
            .catch(e => {rej(e); console.log(e); return e;})
    })
}

// address에 토큰이 몇개있는지 보여주는 함수.
// return : balance (토큰 개수)
async function getTOKENBalanceOf(address) {
    const toRational = 1000000000000000000;
    const infura = process.env.INFURA_API;
    const web3js = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/" + infura));
    let contract = new web3js.eth.Contract(abi, constractAddr);
    return await contract.methods.balanceOf(address).call().then(r=>r/toRational);
}  

export { sendToken,  getTOKENBalanceOf }