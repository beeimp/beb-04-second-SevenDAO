import eth from "eth-lightwallet";


//password = username
export default (password) => {
    const keystore = eth.keystore;
    const mnemonic = keystore.generateRandomSeed();

    return new Promise((res, rej) => {

        try {
            keystore.createVault(
                {
                    password: password,
                    seedPhrase: mnemonic,
                    hdPathString: "m/0'/0'/0'"
                }
                , function (err, ks) {
                    ks.keyFromPassword(password, function (err, pwDerivedKey) {
                        ks.generateNewAddress(pwDerivedKey, 1);
                        let address = (ks.getAddresses())[0].toString();
                        let key = ks.exportPrivateKey(address, pwDerivedKey) //개인키 추출

                        const wallet = {
                            username: password,
                            address: address,
                            privatekey: key
                        }
                        res(wallet);
                        // console.log("wallet func : ",wallet);
                    });
                }
            );
        } catch (exception) {
            // console.log("NewWallet ==>>>> " + exception);
            // console.log("exception");
            const wallet = null;
            rej(wallet);
        }

    })
    // return wallet;

}
