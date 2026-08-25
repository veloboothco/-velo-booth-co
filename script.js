const menuToggle=document.getElementById('menuToggle');
const closeMenu=document.getElementById('closeMenu');
const mobileMenu=document.getElementById('mobileMenu');
menuToggle.addEventListener('click',()=>mobileMenu.classList.add('open'));
closeMenu.addEventListener('click',()=>mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));

document.getElementById('quoteForm').addEventListener('submit',(e)=>{
  e.preventDefault();
  const v=id=>document.getElementById(id).value;
  const subject=encodeURIComponent(`VELO Booth Co. Quote Request - ${v('type')}`);
  const body=encodeURIComponent(`Name: ${v('name')}
Email: ${v('email')}
Phone: ${v('phone')}
Event Date: ${v('date')}
Venue / Location: ${v('location')}
Event Type: ${v('type')}
Hours Needed: ${v('hours')}
Estimated Guest Count: ${v('guests')}
Backdrop Preference: ${v('backdrop')}

Add-Ons / Notes:
${v('message')}

Please send me a personalized quote.`);
  window.location.href=`mailto:veloboothco@gmail.com?subject=${subject}&body=${body}`;
});
