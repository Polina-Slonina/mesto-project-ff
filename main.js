(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{T:()=>a});var t=function(e){e.target.closest(".places__item").remove()},n=function(e){e.target.classList.toggle("card__like-button_is-active")},r=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)},o=function(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))},c=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)},a=document.querySelector("#card-template").content,d=document.querySelector(".places__list"),s=document.querySelector(".profile__add-button"),i=document.querySelector(".profile__edit-button"),l=document.querySelector(".popup_type_edit"),p=document.querySelector(".popup_type_new-card"),u=document.querySelector(".popup_type_image"),m=document.querySelector(".popup__image"),_=document.querySelector(".popup__caption"),y=document.querySelector(".profile__title"),v=document.querySelector(".profile__description"),f=document.forms["edit-profile"],k=f.elements.name,q=f.elements.description,S=document.forms["new-place"],g=S.elements["place-name"],L=S.elements.link,b=function(e){var t=e.name,n=e.link;m.src=n,m.alt=t,_.textContent=t,r(u)};document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){(t.target.classList.contains("popup__close")||t.target.classList.contains("popup"))&&c(e)}))})),i.addEventListener("click",(function(){r(l),k.value=y.textContent,q.value=v.textContent})),s.addEventListener("click",(function(){r(p),S.reset()})),f.addEventListener("submit",(function(e){e.preventDefault(),y.textContent=k.value,v.textContent=q.value,c(l)})),S.addEventListener("submit",(function(e){e.preventDefault();var t={name:g.value,link:L.value};h(t),S.reset(),c(p)}));var h=function(e){var r=function(e,t,n,r){var o=e.name,c=e.link,d=a.querySelector(".card").cloneNode(!0);return d.querySelector(".card__image").src=c,d.querySelector(".card__image").alt=o,d.querySelector(".card__title").textContent=o,d.querySelector(".card__delete-button").addEventListener("click",t),d.querySelector(".card__image").addEventListener("click",(function(){return n({name:o,link:c})})),d.querySelector(".card__like-button").addEventListener("click",r),d}(e,t,b,n);d.prepend(r)};[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach(h)})();