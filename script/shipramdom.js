module.exports.config = {
    name: "shiprandom",
    version: "2.2",
    hasPermssion: 0,
    credits: "zach",
    description: "( ship𝚒 )",
    commandCategory: "𝚗𝚘 𝚙𝚛𝚎𝚏𝚒𝚡",
    usages: "(ih )",
    cooldowns: 10,
};

module.exports.run = async function({ api, event, Threads, Users }) {
    const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs-extra"];

    var { participantIDs } = (await Threads.getData(event.threadID)).threadInfo;
    var tle = Math.floor(Math.random() * 101);
    var namee = (await Users.getData(event.senderID)).name;
    const botID = api.getCurrentUserID();
    const listUserID = participantIDs.filter(ID => ID != botID && ID != event.senderID);
    var id = listUserID[Math.floor(Math.random() * listUserID.length)];
    var name = (await Users.getData(id)).name;
    var arraytag = [];
    arraytag.push({id: event.senderID, tag: namee});
    arraytag.push({id: id, tag: name});

    let Avatar = (await axios.get(`https://graph.facebook.com/${event.senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data; 
    fs.writeFileSync(__dirname + "/cache/avt.png", Buffer.from(Avatar, "utf-8"));

    let gifLove = (await axios.get(`https://media2.giphy.com/media/gwisEpuibLPvu3seFQ/giphy.gif?cid=6c09b952bd5f321f878e30c3c73ca4feb670811d13f83aab&ep=v1_internal_gifs_gifId&rid=giphy.gif&ct=g`, { responseType: "arraybuffer" })).data; 
    fs.writeFileSync(__dirname + "/cache/giflove.png", Buffer.from(gifLove, "utf-8"));

    let Avatar2 = (await axios.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(__dirname + "/cache/avt2.png", Buffer.from(Avatar2, "utf-8"));

    var imglove = [];
    imglove.push(fs.createReadStream(__dirname + "/cache/avt.png"));
    imglove.push(fs.createReadStream(__dirname + "/cache/giflove.png"));
    imglove.push(fs.createReadStream(__dirname + "/cache/avt2.png"));

    var msg = {
        body: `Cooldown: 20s\n🥰Successful pairing!\n💌Wish you two a hundred years of happiness\n💕Double ratio: ${tle}%\n${namee} 💓 ${name}`,
        mentions: arraytag,
        attachment: imglove
    };
    return api.sendMessage(msg, event.threadID, event.messageID);
};
