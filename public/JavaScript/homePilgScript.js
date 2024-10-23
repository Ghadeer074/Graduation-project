const socket = io(); // إنشاء اتصال مع الخادم

// تسجيل الحاج عند الاتصال
const pilgrim = { name: "Pilgrim 1", socketId: socket.id };
socket.emit('registerPilgrim', pilgrim);


document.addEventListener('DOMContentLoaded', function() {
    const homeButton = document.querySelector('.menu-item:nth-child(1)'); // Home button
    const chatButton = document.querySelector('.menu-item:nth-child(3)'); // Chat with Organizer button
    const userInfoSection = document.getElementById('user-info-section');
    const flightInfoSection = document.getElementById('flight-info-section');
    const chatSection = document.getElementById('chatSection');
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput'); // تم التعديل
    const chatBox = document.getElementById('chat-box'); // تم التعديل

    // إظهار الأقسام الخاصة بـ "Home" وإخفاء قسم الدردشة
    homeButton.addEventListener('click', function() {
        userInfoSection.style.display = 'flex';  // Use 'flex' to maintain layout
        flightInfoSection.style.display = 'flex';  // Use 'flex' to maintain layout
        chatSection.style.display = 'none'; // إخفاء قسم الدردشة
    });

    // إظهار قسم الدردشة وإخفاء الأقسام الأخرى
    chatButton.addEventListener('click', function() {
        userInfoSection.style.display = 'none';
        flightInfoSection.style.display = 'none';
        chatSection.style.display = 'block'; // إظهار قسم الدردشة
    });

    // تسجيل الدخول عند تحميل الصفحة **************
    window.onload = function() {
        const userData = {
            userId: 'pilgrim_username',  // معرف يونيك للحاج
            username: 'Pilgrim' 
        };
        socket.emit('login', userData); // إرسال بيانات المستخدم عند الاتصال
    };    

    // دالة لإرسال الرسالة *************************
    sendButton.addEventListener('click', function() {
        const message = messageInput.value.trim();
        if (message !== "") {
            const newMessage = document.createElement('p');
            newMessage.textContent = `You: ${message}`;  // عرض الرسالة مع مصدرها
            chatBox.appendChild(newMessage);
            messageInput.value = '';
            chatBox.scrollTop = chatBox.scrollHeight;
    
            // إرسال الرسالة إلى المنظم عبر Socket.io
            socket.emit('sendMessage', {
                senderId: 'pilgrim_username',  // معرف الحاج
                receiverId: 'organization_number',  // رقم المنظمة
                message: message
            });
        }
    });
    

    // استقبال الرسالة من المنظم *************************
    socket.on('receiveMessage', function(data) {
        const newMessage = document.createElement('p');
        newMessage.textContent = `${data.senderId}: ${data.message}`;  // عرض الرسالة مع مصدرها
        chatBox.appendChild(newMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    });
    
}); 
