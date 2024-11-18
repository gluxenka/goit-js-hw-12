import{a as v,S as w,i as y}from"./assets/vendor-D2eHbU-E.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const S="47095841-45755c038ed861ac306bdd605",T="photo",B="horizontal",I=!0,c=15,f=500,O="https://pixabay.com/api/";async function D(o,e){const s=f<e*c;let n=c;if(s){const l=Math.floor(f/c),F=f-l*c;F>0&&e===l+1&&(n=F,e=f/n)}const t=R(o,e,n).toString(),r=`${O}?${t}`;return(await v.get(r)).data}function R(o,e,s){return new URLSearchParams({q:o,key:S,page:e,image_type:T,orientation:B,per_page:s,safesearch:I})}const u=document.querySelector(".gallery"),U=[{label:"Likes",field:"likes"},{label:"Views",field:"views"},{label:"Comments",field:"comments"},{label:"Downloads",field:"downloads"}];function a(o,e){e?o.classList.remove("hidden"):o.classList.add("hidden")}function A(){u.innerHTML="",a(u,!1)}function q(o){const e=u.children.item(c*(o-1));e==null||e.scrollIntoView({inline:"start",behavior:"smooth"})}function M(o){const e=document.createElement("div");e.innerHTML=o.map(_).join(""),Array.from(e.children).length>0&&(a(u,!0),u.append(...Array.from(e.children)))}function _(o){const e=o.previewURL,s=o.largeImageURL,n=o.tags;return`
    <a class="gallery-item" href="${s}">


    <img class="gallery-item-image" alt="${n}" src="${e}"/>
    <div class="gallery-item-details-container">
      ${U.map(t=>$(t.label,o[t.field])).join("")}
    </div>

    </a>`}function $(o,e){return`
    <div class="gallery-item-details-element">
      <span class="label">${o}</span>
      <span class="value">${e}</span>
    </div>`}const L=document.getElementById("search-form"),V=document.getElementById("search-input"),d=document.getElementById("load-more"),g=document.querySelector(".loader"),j=new w(".gallery-item",{captionsData:"alt",captionDelay:250,fadeSpeed:1e3}),C=30,E=0;let h=E,m=C,p="";async function b(o,e,s){a(g,!0),s&&A();try{const n=await D(o,e),{hits:t,totalHits:r}=n;a(g,!1),M(t),m=e,p=o,m===1&&(h=E),h+=t.length,j.refresh();const i=h>=r,l=t.length===0;!l&&i&&(G(),a(d,!1)),l&&x(),!l&&!i&&a(d,!0),l||q(m)}catch{a(g,!1),H()}}function x(){y.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",iconColor:"#FFF",titleColor:"#FFF",messageColor:"#FFF",backgroundColor:"#EF4040",progressBarColor:"#B51B1B"})}function G(){y.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",iconColor:"#FFF",titleColor:"#FFF",messageColor:"#FFF",backgroundColor:"#0099FF",progressBarColor:"#0071BD"})}function H(){y.error({message:"Request failed, please try again later",position:"topRight",iconColor:"#FFF",titleColor:"#FFF",messageColor:"#FFF",backgroundColor:"#EF4040",progressBarColor:"#B51B1B"})}function P(o){V.value=o}function k(o){var t,r;o.preventDefault();const e=new FormData(L);let n=((r=(t=Object.fromEntries(e).query)==null?void 0:t.trim)==null?void 0:r.call(t))??"";P(n),n&&(a(d,!1),b(n,C,!0))}function z(){P(p),a(d,!1),b(p,m+1,!1)}function K(){L.addEventListener("submit",k),d.addEventListener("click",z)}K();
//# sourceMappingURL=index.js.map
