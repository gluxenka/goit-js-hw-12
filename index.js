import{a as F,S as b,i as u}from"./assets/vendor-D2eHbU-E.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const L="47095841-45755c038ed861ac306bdd605",C="photo",v="horizontal",S=!0,m=15,w="https://pixabay.com/api/";async function B(t,e){var o;const a=E(t,e).toString(),s=`${w}?${a}`;return((o=(await F.get(s)).data)==null?void 0:o.hits)??[]}function E(t,e){return new URLSearchParams({q:t,key:L,page:e,image_type:C,orientation:v,per_page:m,safesearch:S})}const i=document.querySelector(".gallery"),P=[{label:"Likes",field:"likes"},{label:"Views",field:"views"},{label:"Comments",field:"comments"},{label:"Downloads",field:"downloads"}];function n(t,e){e?t.classList.remove("hidden"):t.classList.add("hidden")}function D(){i.innerHTML="",n(i,!1)}function O(t){const e=i.children.item(m*(t-1));e==null||e.scrollIntoView({inline:"start",behavior:"smooth"})}function R(t){const e=document.createElement("div");e.innerHTML=t.map($).join(""),Array.from(e.children).length>0&&(n(i,!0),i.append(...Array.from(e.children)))}function $(t){const e=t.previewURL,a=t.largeImageURL,s=t.tags;return`
    <a class="gallery-item" href="${a}">


    <img class="gallery-item-image" alt="${s}" src="${e}"/>
    <div class="gallery-item-details-container">
      ${P.map(r=>U(r.label,t[r.field])).join("")}
    </div>

    </a>`}function U(t,e){return`
    <div class="gallery-item-details-element">
      <span class="label">${t}</span>
      <span class="value">${e}</span>
    </div>`}const g=document.getElementById("search-form"),l=document.getElementById("load-more"),f=document.querySelector(".loader"),q=new b(".gallery-item",{captionsData:"alt",captionDelay:250,fadeSpeed:1e3}),p=1;let c=p,h="";async function y(t,e,a){n(f,!0),a&&D();try{const s=await B(t,e);n(f,!1),R(s),c=e,h=t,q.refresh(),s.length===0?(c===1?u.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",iconColor:"#FFF",titleColor:"#FFF",messageColor:"#FFF",backgroundColor:"#EF4040",progressBarColor:"#B51B1B"}):u.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",iconColor:"#FFF",titleColor:"#FFF",messageColor:"#FFF",backgroundColor:"#0099FF",progressBarColor:"#0071BD"}),n(l,!1)):(O(c),n(l,!0))}catch{n(f,!1),u.error({message:"Request failed, please try again later",position:"topRight",iconColor:"#FFF",titleColor:"#FFF",messageColor:"#FFF",backgroundColor:"#EF4040",progressBarColor:"#B51B1B"})}}function A(t){t.preventDefault();const e=new FormData(g),a=Object.fromEntries(e);n(l,!1),y(a.query,p,!0)}function T(){n(l,!1),y(h,c+1,!1)}function I(){g.addEventListener("submit",A),l.addEventListener("click",T)}I();
//# sourceMappingURL=index.js.map
