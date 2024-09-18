/*-- زر إظهار أو إخفاء التفاصيل --
 <button class="toggle-details" onclick="toggleDetails(4)"> Details</button> */

 function toggleDetails(day) {
    /*<!-- تفاصيل اليوم الرابع -->
    <div class="day-details hidden" id="details-4">
    <ul>
    <li>The pilgrim throws stones at the three pillars: the small, medium, and large Jamrat.</li>
    <li>The pilgrim may stay overnight in Mina.</li>
    </ul>
     </div>*/
       var details = document.getElementById('details-' + day);
      /*classList:التعامل مع الكلاس 
     toggle:اضافه او حذف 
     hidden:css في ملف   
     */
     details.classList.toggle('hidden');
    }
    