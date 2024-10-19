const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Pilgrims', 'Groups'],
        datasets: [{
            label: 'Count',
            data: [150, 10], // Change these numbers to reflect pilgrims and groups
            backgroundColor: [
                'rgba(224, 166, 96, 0.5)', // Color for Pilgrims
                'rgba(96, 224, 166, 0.5)', // Color for Groups
            ],
            borderColor: [
                'rgba(224, 166, 96, 1)', // Border color for Pilgrims
                'rgba(96, 224, 166, 1)', // Border color for Groups
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true,
        maintainAspectRatio: false
    }
});

function showChat() {
    document.getElementById("infoSection").style.display = "none";
    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("chatSection").style.display = "block";
}

function showDashboard() {
    // إظهار الكارد والداشبورد
    document.getElementById("infoSection").style.display = "block";
    document.getElementById("dashboardSection").style.display = "block";
    
    // إخفاء قسم الشات
    document.getElementById("chatSection").style.display = "none";
    
    // إضافة التعديل المطلوب لإعادة تنسيق العرض للكارد والداشبورد
    document.querySelector('.user-info-section').style.display = 'flex';
    document.querySelector('.dashboard').style.display = 'flex';
}


const socket = io(); // إنشاء اتصال مع الخادم

// تسجيل الدخول عند تحميل الصفحة
window.onload = function() {
    const userData = {
        userId: 'organizer_id', // استبدل بـ ID المنظم الحقيقي
        username: 'Organizer' // استبدل باسم المستخدم الحقيقي
    };
    socket.emit('login', userData);
};

// دالة لإرسال الرسالة
function sendMessage() {
    var messageInput = document.getElementById("messageInput");
    var messageText = messageInput.value;

    if (messageText.trim() !== "") {
        var chatBox = document.getElementById("chatBox");
        var messageDiv = document.createElement("div");
        messageDiv.classList.add("chat-message");
        messageDiv.textContent = messageText;
        chatBox.appendChild(messageDiv);
        messageInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;

        // إرسال الرسالة إلى الحاج
        socket.emit('sendMessage', {
            senderId: 'organizer_id', // استبدل بـ ID المنظم الحقيقي
            receiverId: 'pilgrim_id', // استبدل بـ ID الحاج الحقيقي
            message: messageText
        });
    }
}

// استقبال الرسالة من الحاج
socket.on('receiveMessage', function(data) {
    var chatBox = document.getElementById("chatBox");
    var messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message");
    messageDiv.textContent = data.message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // تمرير الشاشة للأسفل
});





