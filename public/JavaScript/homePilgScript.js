const socket = io(); // إنشاء اتصال مع الخادم

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

    // تسجيل الدخول عند تحميل الصفحة
    window.onload = function() {
        const userData = {
            userId: 'pilgrim_id', // استبدل بـ ID الحاج الحقيقي
            username: 'Pilgrim' // استبدل باسم المستخدم الحقيقي
        };
        socket.emit('login', userData);
    };

    // دالة لإرسال الرسالة
    sendButton.addEventListener('click', function() {
        const message = messageInput.value.trim();
        if (message !== "") {
            const newMessage = document.createElement('p');
            newMessage.textContent = message;
            chatBox.appendChild(newMessage);
            messageInput.value = '';
            chatBox.scrollTop = chatBox.scrollHeight;

            // إرسال الرسالة إلى المنظم
            socket.emit('sendMessage', {
                senderId: 'pilgrim_id', // استبدل بـ ID الحاج الحقيقي
                receiverId: 'organizer_id', // استبدل بـ ID المنظم الحقيقي
                message: message
            });
        }
    });

    // استقبال الرسالة من المنظم
    socket.on('receiveMessage', function(data) {
        const newMessage = document.createElement('p');
        newMessage.textContent = data.message;
        chatBox.appendChild(newMessage);
        chatBox.scrollTop = chatBox.scrollHeight; // تمرير الشاشة للأسفل
    });
}); 
