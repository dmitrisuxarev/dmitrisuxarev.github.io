//loader
// let loader =  document.querySelector(".loader");
// loader.addEventListener("animationend",(e)=>{
//     e.stopPropagation();
//     let target = e.target;
//     if(target.classList.contains("loader")){
//         loader.style.display = "none";
//     }
// })
//******************************************** */
//menu
//******************************************** */
let menuBtns = document.querySelectorAll(".menuBtn");
let sideMenuBg = document.querySelector(".side-menu-bg");
let sideMenu = document.querySelector(".side-menu");
let sideMenuWrapper = document.querySelector(".side-menu-wrapper");

for (let btn of menuBtns) {
  btn.addEventListener("mouseenter", openMenu);
}

function openMenu() {
  new Promise((res, rej) => {
    sideMenuWrapper.style.display = "flex";
    setTimeout(res, 10);
  }).then(() => {
    sideMenuBg.classList.add("active");
    sideMenu.classList.add("active");
    setTimeout(() => {
      sideMenuBg.addEventListener("mouseenter", closeMenu);
    }, 600);
  });
}
function closeMenu() {
  new Promise((res, rej) => {
    sideMenuBg.classList.remove("active");
    sideMenu.classList.remove("active");
    setTimeout(res, 500);
  }).then(() => {
    sideMenuWrapper.style.display = "none";
    sideMenuBg.removeEventListener("mouseenter", closeMenu);
  });
}

//******************************************** */
/**ABOUT */
//******************************************** */
let labelsContainer = document.querySelector(".labels"); //контейнер с лейблами
let labels = document.querySelectorAll(".label"); //все лейблы
let sliderItems = document.querySelectorAll(".slider_item"); // картинки к лейблам
let activeSliderItem = null; // текущий контейнер с картинками
let activeLabel = 0; // активный лейбл
let isMouseEnter = false;
let timeOut1,
  timeOut2 = null;
for (let label of labels) {
  label.addEventListener("mouseenter", (e) => {
    clearTimeout(timeOut1);
    clearTimeout(timeOut2);
    isMouseEnter = true;
    activateLabel(e.target);
  });
  label.addEventListener("mouseleave", (e) => {
    isMouseEnter = false;
    deactivateLabel(e.target);
  });
}

labelsContainer.addEventListener("mouseenter", () => {
  clearTimeout(timeOut1);
  clearTimeout(timeOut2);
  isMouseEnter = true;
  deactivateLabel(labels[activeLabel]);
});
labelsContainer.addEventListener("mouseleave", () => {
  isMouseEnter = false;
  activateLabel(labels[activeLabel]);
});
//активировать картинки к лейблу
function activetImageForLabel(_label) {
  let sliderId = _label.dataset.sliderid;
  for (let s of sliderItems) {
    if (s.dataset.id == sliderId) {
      s.classList.add("active");
      activeSliderItem = s;
      break;
    }
  }
}
//активировать лейбл
function activateLabel(label) {
  if (isMouseEnter) {
    activetImageForLabel(label);
    activeLabel = label.dataset.sliderid - 1;
    label.classList.add("active");
  } else {
    activetImageForLabel(label)
    label.classList.add("active");
    if (!isMouseEnter) {
      timeOut1 = setTimeout(() => {
        deactivateLabel(labels[activeLabel]);
        activeLabel = activeLabel >= 4 ? 0 : activeLabel + 1;
        timeOut2 = setTimeout(() => {
          activateLabel(labels[activeLabel]);
        }, 100);
      }, 1500);
    }
  }
}
// деактивировать лейбл
function deactivateLabel(label) {
  activeSliderItem.classList.remove("active");
  label.classList.remove("active");
}
// вызов события у первого лейбла и запуск уепочки событий
activateLabel(labels[activeLabel]);
//******************************************** */

//******************************************** */
/**добавление класса .active ссылкам на текущую секцию*/
//******************************************** */
function setActiveMenuLink(target) {
  for (let targetLink of menuLinks) {
    if (
      "#" + target.getAttribute("id") === targetLink.getAttribute("href") ||
      target.getAttribute("href") === targetLink.getAttribute("href")
    ) {
      targetLink.classList.add("active");
    } else {
      targetLink.classList.remove("active");
    }
  }
}
// активировать ссылку по нажатию на пункт меню
let menuLinks = document.querySelectorAll("a");

for (let link of menuLinks) {
  link.addEventListener("click", () => {
    setActiveMenuLink(link);
  });
}
// активировать ссылку по скроллу страницы
let section = document.querySelectorAll(".wrapper");

document.querySelector(".app").addEventListener("scroll", (e) => {
  let sectionIndex = (e.target.scrollTop / e.target.scrollHeight) * 4;
  Number.isInteger(sectionIndex) && setActiveMenuLink(section[sectionIndex]);
});
