const menuToggle=document.getElementById('menuToggle');
const closeMenu=document.getElementById('closeMenu');
const mobileMenu=document.getElementById('mobileMenu');
menuToggle.addEventListener('click',()=>mobileMenu.classList.add('open'));
closeMenu.addEventListener('click',()=>mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));

const quoteForm=document.getElementById('quoteForm');
const formStatus=document.getElementById('formStatus');
const submitButton=quoteForm.querySelector('button[type="submit"]');

quoteForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  submitButton.disabled=true;
  submitButton.textContent='Sending...';
  formStatus.textContent='Sending your request...';

  try {
    const response=await fetch(quoteForm.action,{
      method:'POST',
      body:new FormData(quoteForm),
      headers:{'Accept':'application/json'}
    });

    if(response.ok){
      quoteForm.reset();
      formStatus.textContent='Thank you! Your event request has been received. VELO Booth Co. will review your details and get back to you shortly.';
    } else {
      formStatus.textContent='We couldn’t send your request. Please try again or contact VELO Booth Co. directly.';
    }
  } catch(error){
    formStatus.textContent='We couldn’t send your request. Please check your connection and try again.';
  } finally {
    submitButton.disabled=false;
    submitButton.textContent='Request My Quote';
  }
});
\n\n// Gallery lightbox\nconst galleryPhotos=document.querySelectorAll('.gallery-photo[data-full]');\nif(galleryPhotos.length){\n  const lightbox=document.createElement('div');\n  lightbox.className='lightbox';\n  lightbox.setAttribute('role','dialog');\n  lightbox.setAttribute('aria-modal','true');\n  lightbox.setAttribute('aria-label','Event photo preview');\n  lightbox.innerHTML='<button class="lightbox-close" type="button" aria-label="Close photo preview">×</button><img alt="">';\n  document.body.appendChild(lightbox);\n  const lightboxImg=lightbox.querySelector('img');\n  const closeLightbox=()=>{lightbox.classList.remove('open');lightboxImg.removeAttribute('src');};\n  galleryPhotos.forEach(photo=>photo.addEventListener('click',()=>{\n    const img=photo.querySelector('img');\n    lightboxImg.src=photo.dataset.full;\n    lightboxImg.alt=img ? img.alt : 'VELO Booth Co. event photo';\n    lightbox.classList.add('open');\n  }));\n  lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);\n  lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});\n  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();});\n}\n