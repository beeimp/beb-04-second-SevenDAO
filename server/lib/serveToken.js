import Web3 from "web3";
import abi from "./abi.js"
import constractAddr from "./contractAddr.js"
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' });

const privateKey = process.env.WALLET_SECRET_KEY; //contract owner address
const infura = process.env.INFURA_API; //infura api

const toAddress = '0x9684B57A74978dBE8bB0a4c5e7d8D09389dF2bfB'; //test account

const web3js = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/"+infura));


let contract = new web3js.eth.Contract(abi, constractAddr);
const price = web3js.utils.toWei('1', 'ether');

let data = contract.methods.transfer(toAddress, price).encodeABI();

let rawTransaction = { "to": constractAddr, "gas": 100000, "data": data };

web3js.eth.accounts.signTransaction(rawTransaction, privateKey)
    .then(signedTx => web3js.eth.sendSignedTransaction(signedTx.rawTransaction))
    .then(req => {
        getTOKENBalanceOf(toAddress).then(balance => { console.log(toAddress + " Token Balance: " + balance); });
        //TODO: 계정 잔액 DB업데이트

        return true;
    })

async function getTOKENBalanceOf(address) {
    return await contract.methods.balanceOf(address).call();
}   