const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// تعريف مخطط الرسالة
const ChatSchema = new Schema({
    senderId: { type: String, required: true },   // معرف المرسل
    receiverId: { type: String, required: true }, // معرف المستقبل
    message: { type: String, required: true },    // الرسالة
    timestamp: { type: Number, default: Date.now } // الطابع الزمني (التاريخ)
});

// إنشاء نموذج باستخدام المخطط
const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;  // تصدير النموذج للاستخدام في ملفات أخرى