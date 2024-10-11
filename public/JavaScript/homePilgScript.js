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

    // دالة إرسال الرسالة
    sendButton.addEventListener('click', function() {
        const message = messageInput.value.trim(); // تم التعديل
        if (message !== "") {
            const newMessage = document.createElement('p');
            newMessage.textContent = message;
            chatBox.appendChild(newMessage); // تم التعديل
            messageInput.value = ''; // تفريغ الحقل بعد الإرسال
            chatBox.scrollTop = chatBox.scrollHeight; // تمرير الشاشة للأسفل تلقائيًا عند إرسال الرسالة
        }
    });
    
    // إرسال الرسالة عند الضغط على Enter
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // منع الانتقال لسطر جديد
            sendButton.click(); // استدعاء زر الإرسال
        }
    });
});
