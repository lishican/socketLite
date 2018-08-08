import CryptoJS from "crypto-js";
export default {
    encrypt: (word, key_) => {
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(
            srcs,
            CryptoJS.enc.Utf8.parse(key_),
            { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
        );
        return encrypted.toString();
    },
    decrypt: (word, key_) => {
        let decrypt = CryptoJS.AES.decrypt(
            word,
            CryptoJS.enc.Utf8.parse(key_),
            { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
        );
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    },
    webDecrypt: str => {
        let main = "";
        main = str.slice(str.indexOf("|{") + 1, str.indexOf("}|") + 1);
        return JSON.parse(main);
    },
    //前端加密
    webEncrypt: data => {
        let dataStr = JSON.stringify(data);
        let head = "0x0a|";
        let tail = "|0x0b";
        let sendStr = head + dataStr.length + "|" + dataStr + tail;

        return sendStr;
    }
};
