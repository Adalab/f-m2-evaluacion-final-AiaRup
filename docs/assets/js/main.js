"use strict";const searchButton=document.querySelector(".form__button"),searchInput=document.querySelector(".form__input"),seriesList=document.querySelector(".series"),favoritiesList=document.querySelector(".series__favorities"),errorContainer=document.querySelector(".error"),deleteAllButton=document.querySelector(".button__delete-all"),counterElement=document.querySelector(".counter"),collapseIcon=document.querySelector(".collapse-icon"),leftPanelElement=document.querySelector(".main__left-panel");let favoriteSeries=[],counterFav=0;const findInArray=(e,t)=>e.findIndex(e=>e.id===parseInt(t)),changeSeriesArray=(e,t)=>{const a=findInArray(favoriteSeries,t);-1!==a?(favoriteSeries.splice(a,1),counterFav--,counterElement.innerHTML=counterFav):(favoriteSeries.push(e),counterFav++,counterElement.innerHTML=counterFav),favoriteSeries.length?deleteAllButton.classList.remove("hidden"):deleteAllButton.classList.add("hidden"),saveStorageData(favoriteSeries),paintFavorities(favoriteSeries)},createShowObject=(e,t,a)=>({name:e,image:t,id:a});function saveStorageData(e){localStorage.setItem("favoriteShows",JSON.stringify(e))}function getStorageData(e){return JSON.parse(localStorage.getItem(e))}function removeStorageData(e){localStorage.removeItem(e)}function onShowClick(e,t){const{currentTarget:a}=e;a.classList.toggle("favorite");const r=a.querySelector(".heart-icon");r.classList.toggle("fa-heart"),r.classList.toggle("fa-heart-broken");const o=a.dataset.id;changeSeriesArray(t,o)}function deleteFavorite(e){const t=findInArray(favoriteSeries,e);favoriteSeries.splice(t,1),paintFavorities(favoriteSeries),counterFav--,counterElement.innerHTML=counterFav,counterFav||deleteAllButton.classList.add("hidden");const a=document.querySelectorAll(".favorite");for(const t of a)if(parseInt(t.dataset.id)===e){const e=t.querySelector(".heart-icon");t.classList.remove("favorite"),e.classList.remove("fa-heart"),e.classList.add("fa-heart-broken")}removeStorageData("favoriteShows"),saveStorageData(favoriteSeries)}const deleteAllFav=e=>{e.length=0,removeStorageData("favoriteShows"),favoritiesList.innerHTML="";const t=document.querySelectorAll(".favorite");for(const e of t)if(e.classList.contains("favorite")){const t=e.querySelector(".heart-icon");e.classList.remove("favorite"),t.classList.remove("fa-heart"),t.classList.add("fa-heart-broken")}counterFav=0,counterElement.innerHTML=counterFav,deleteAllButton.classList.add("hidden")},onCollapseClick=()=>{leftPanelElement.classList.toggle("favorite__show")},fetchOnEnter=e=>{13===e.keyCode&&searchSeries(apiUrl)};window.addEventListener("keyup",fetchOnEnter),deleteAllButton.addEventListener("click",()=>{deleteAllFav(favoriteSeries)}),collapseIcon.addEventListener("click",onCollapseClick);const apiUrl="http://api.tvmaze.com/search/shows?q=",defaultImage="https://via.placeholder.com/210x295/ffffff/666666/?text=TV",takeUserInput=()=>{const e={text:searchInput.value,status:!0};return e.text?errorContainer.classList.add("hidden"):(e.status=!1,errorContainer.classList.remove("hidden")),e},checkImage=e=>e?e.medium:defaultImage,showSeries=({show:e})=>{let{image:t,name:a,id:r}=e;t=checkImage(t);const o=document.createElement("li");o.classList.add("show"),o.setAttribute("data-id",r);const s=document.createElement("i");s.classList.add("fas","fa-heart-broken","heart-icon"),-1!==findInArray(favoriteSeries,r)&&(o.classList.add("favorite"),s.classList.add("fa-heart"),s.classList.remove("fa-heart-broken"));const n=document.createElement("div"),i=document.createElement("img");n.classList.add("show__image"),i.setAttribute("alt",a),i.setAttribute("src",t),i.classList.add("show__image-fake"),n.setAttribute("style",`background-image:url('${t}')`);const c=document.createElement("h3");c.classList.add("show__title");const l=document.createTextNode(a);c.appendChild(l),o.appendChild(s),o.appendChild(n),o.appendChild(c);const d=createShowObject(a,t,r);o.addEventListener("click",e=>{onShowClick(e,d)}),seriesList.appendChild(o)};function searchSeries(e){const t=takeUserInput();t.status&&fetch(`${e}${t.text}`).then(e=>e.json()).then(e=>{seriesList.innerHTML="";for(const t of e)showSeries(t)}).catch(e=>console.log("error",e))}function paintFavorities(e){favoritiesList.innerHTML="";for(const t of e){const{id:e,image:a,name:r}=t,o=document.createElement("li");o.classList.add("show__favorite"),o.setAttribute("data-id",e);const s=document.createElement("div"),n=document.createElement("img");s.classList.add("favorite__image"),n.setAttribute("alt",r),n.setAttribute("src",a),n.classList.add("favorite__image-fake"),s.setAttribute("style",`background-image:url('${a}')`);const i=document.createElement("div");i.classList.add("favorite__title-container");const c=document.createElement("h4");c.classList.add("favorite__title");const l=document.createTextNode(r);c.appendChild(l);const d=document.createElement("i");d.classList.add("fas","fa-times-circle","delete-icon"),d.addEventListener("click",()=>{deleteFavorite(e)}),i.appendChild(c),i.appendChild(d),o.appendChild(s),o.appendChild(i),favoritiesList.appendChild(o)}}searchButton.addEventListener("click",()=>{searchSeries(apiUrl)});const loadFavorites=()=>{favoriteSeries=[];const e=getStorageData("favoriteShows");e?(favoriteSeries=e,paintFavorities(e),counterFav=favoriteSeries.length,counterElement.innerHTML=counterFav,counterFav&&deleteAllButton.classList.remove("hidden")):(counterFav=0,counterElement.innerHTML=counterFav,deleteAllButton.classList.add("hidden"))};loadFavorites();