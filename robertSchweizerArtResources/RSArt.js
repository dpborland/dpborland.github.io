//~~~~~~// Toggles and fills the "work" and "about" categories //~~~~~~//

var navWork = document.querySelector(".navWork");
var navAbout = document.querySelector(".navAbout");
var dropDown = document.querySelectorAll(".dropDown")

function navToggle(e) {
    var navWorkText = navWork.childNodes[0];
    var navAboutText = navAbout.childNodes[0];

    //---// If the screen is smaller, displays only one nav menu //---//
    if (window.matchMedia("(max-width: 499px)").matches) {   
        e.target === navWork ?
        (navWorkText.nodeValue === "- Paintings" ? navWorkText.nodeValue = "+ Paintings" : navWorkText.nodeValue = "- Paintings",
        dropDown[0].innerHTML = "<li>Marine<li>Landscapes<li>Portraits<li>Figures & Still Lifes<li>All", 
        dropDown[0].classList.toggle("workDropExpanded"),
        window.setTimeout(function() {
            dropDown[1].classList.remove("aboutDropExpanded");
        }, 300),    
        navAboutText.nodeValue = "+ Information", 
        dropDown[0].style.zIndex = "2",
        dropDown[1].style.zIndex = "-1")
        :
        (navAboutText.nodeValue === "- Information" ? navAboutText.nodeValue = "+ Information" : navAboutText.nodeValue = "- Information",
        dropDown[1].innerHTML = "<li>Bio<li>Contact", 
        dropDown[1].classList.toggle("aboutDropExpanded"),
        window.setTimeout(function() {
            dropDown[0].classList.remove("workDropExpanded");
        }, 300),
        navWorkText.nodeValue = "+ Paintings", 
        dropDown[1].style.zIndex = "2",
        dropDown[0].style.zIndex = "-1");
    }
    //---// If the screen is larger, both nav menus can be displayed //---//
    else {
        e.target === navWork ?
        (navWorkText.nodeValue === "- Paintings" ? navWorkText.nodeValue = "+ Paintings" : navWorkText.nodeValue = "- Paintings",
        dropDown[0].innerHTML = "<li>Marine<li>Landscapes<li>Portraits<li>Figures & Still Lifes<li>All", 
        dropDown[0].classList.toggle("workDropExpanded"))
        :
        (navAboutText.nodeValue === "- Information" ? navAboutText.nodeValue = "+ Information" : navAboutText.nodeValue = "- Information",
        dropDown[1].innerHTML = "<li>Bio<li>Contact", 
        dropDown[1].classList.toggle("aboutDropExpanded"));
    }


}

//*****// Event listeners //******//
  // 1 & 2: When the "Paintings" menu group is clicked, the menu elements are presented and page is appropriately aligned
  // 3 & 4: When the "Information" menu group is clicked, the menu elements are presented and page is appropriately aligned

navWork.addEventListener("click", navToggle, false);
dropDown[0].addEventListener("click", heroBorderAlignment, false);
navAbout.addEventListener("click", navToggle, false);
dropDown[1].addEventListener("click", heroBorderAlignment, false);

//~~~~~~// Loads ajax content //~~~~~~//

function loadAJAX(e) {
	var menuSelection = e.target.innerHTML;
	var ajaxFill = "robertSchweizerArtResources/" + menuSelection + ".html";
	var heroBorderDiv = document.querySelector(".heroBorder");

    //---// Avoid 404'd AJAX calls //---//
    if (menuSelection === "Marine" || menuSelection === "Landscapes" || menuSelection === "Portraits" || menuSelection === "Figures &amp; Still Lifes" || menuSelection === "All" || menuSelection === "Bio" || menuSelection === "Contact") {

        var xhttp = new XMLHttpRequest();
    	xhttp.onreadystatechange = function() {
        	if (xhttp.readyState == 4 && xhttp.status == 200) {
        		heroBorderDiv.innerHTML = xhttp.responseText;
        	}
    	};
    	xhttp.open("GET", ajaxFill, true);
    	xhttp.send();
    }

    //~~~//Gallery scripts//~~~//

    if (menuSelection === "Marine" || menuSelection === "Landscapes" || menuSelection === "Portraits" || menuSelection === "Figures &amp; Still Lifes" || menuSelection === "All") {
        window.setTimeout(function() {
            var thumbnail = document.querySelector(".marinePaintings");
            var galleryNav = document.querySelector(".galleryNavBox");
            var navButtonLeft = document.querySelector(".galleryNavLeft");
            var navButtonRight = document.querySelector(".galleryNavRight");
            var galleryThumb = document.querySelector(".thumbnailImg");
            var fullScreen = document.querySelector(".fullScreenToggle");
            var fullSizedImg = document.querySelector(".fullSizedImg");
            var infoBox = document.querySelector(".galleryInfoButton");
            var image = document.querySelector(".imgFullSize");
            var image = document.querySelector(".imgFullSize");
            var swipedir;
            var startX;
            var endX;
            var distX;
            var threshold = 100; //required min distance traveled to be considered swipe

        //---// Dims the large image when thumbnails hovered over //---//

            function largeImgDarkening() {
                if (window.matchMedia("(min-width: 500px)").matches && window.matchMedia("(min-height: 400px)").matches) {
                    var largeImg = document.querySelector(".imgFullSize");
                    largeImg.classList.add("imgFullSizeDarkened");

                    function darkeningReverse() {
                        largeImg.classList.remove("imgFullSizeDarkened");
                    }
                    thumbnail.addEventListener("mouseout", darkeningReverse, false);
                }
            }

            function galleryDarkening() {
                if (window.matchMedia("(min-width: 500px)").matches && window.matchMedia("(min-height: 400px)").matches) {
                    var gallery = document.querySelector(".galleryWrapper");
                    gallery.classList.add("galleryNavBoxDarkened");

                    function galleryDarkeningReverse() {
                        gallery.classList.remove("galleryNavBoxDarkened");
                    }

                    thumbnail.addEventListener("mouseout", galleryDarkeningReverse, false);
                }
            }

        //***// Event Listeners //***//
            // 1 & 2: Clicking Nav Buttons changes large img and highlights appropriate thumbnail 
            // 3, 4 & 5: Hovering over thumbnails causes darkening of background, clicking thumbail triggers large img change
            // 6 & 7: Clicking either the full screen icon or large img itself enters fullscreen mode

            if (navButtonLeft.style.display !== "none") {
                navButtonLeft.addEventListener("click", imageDecrease, false);
                navButtonRight.addEventListener("click", imageIncrease, false);
            }
            thumbnail.addEventListener("mouseover", largeImgDarkening, false);
            /*thumbnail.addEventListener("mouseover", navBoxDarkening, false);*/
            thumbnail.addEventListener("mouseover", galleryDarkening, false);
            thumbnail.addEventListener("click", thumbnailEnlarge, false);
            fullScreen.addEventListener("click", fullScreenImg, false);
            fullSizedImg.addEventListener("click", fullScreenImg, false);
            infoBox.addEventListener("click", infoModalExpand, false);
            infoBox.addEventListener("mouseover", infoBoxHover, false);
            infoBox.addEventListener("mouseout", infoBoxHoverOff, false);
            image.addEventListener("touchstart", function(e){
                startX = e.touches[0].clientX;
                e.preventDefault();
            }, false);

            image.addEventListener("touchend", function(e){ 
                endX = e.changedTouches[0].clientX;
                distX = endX - startX;
                if (Math.abs(distX) >= threshold) {
                    distX > 0 ? imageDecrease() : imageIncrease();      
                }    
            }, false);
        }, 100);
    }
}

//~~~~~~// Change full-sized image and fade in matching thumbnail, in gallery //~~~~~~//

function imageDecrease() {
    var thumbImgList = document.querySelectorAll(".thumbnailImg");
    var imgArray = Array.from(thumbImgList);
    var fullSizedImg = document.querySelector(".fullSizedImg");
    var fullSizedImgAlt = document.querySelector(".fullSizedImg").alt;

    for (var i = 0; i < imgArray.length; i++) {
        if ((imgArray[i].alt === fullSizedImgAlt) && (i !== 0)) {
            fullSizedImg.classList.add("contentTransparent");
            window.setTimeout(function() {
                fullSizedImg.src = "robertSchweizerArtResources/images/marine/" + imgArray[i - 1].alt + ".jpg";
                fullSizedImg.alt = imgArray[i - 1].alt;
                fullSizedImg.classList.remove("contentTransparent");
            }, 500);
            [].forEach.call(thumbImgList, function(x) {
                x.classList.remove("contentVisible");
            }); 
            imgArray[i - 1].classList.add("contentVisible");
            return;
        }   
        else if ((imgArray[i].alt === fullSizedImgAlt) && (imgArray.indexOf(imgArray[i]) === 0)) {
            fullSizedImg.classList.add("contentTransparent");
            window.setTimeout(function() {
                fullSizedImg.src = "robertSchweizerArtResources/images/marine/" + imgArray[imgArray.length - 1].alt + ".jpg";
                fullSizedImg.alt = imgArray[imgArray.length - 1].alt;
                fullSizedImg.classList.remove("contentTransparent");
            }, 500);
            [].forEach.call(thumbImgList, function(x) {
                x.classList.remove("contentVisible");
            }); 
            imgArray[imgArray.length - 1].classList.add("contentVisible");
            return;
        }
    }
}

//~~~~~~// Change full-sized image in gallery on click //~~~~~~//


function imageIncrease() {
    var fullSizedImg = document.querySelector(".fullSizedImg");
    var thumbImgList = document.querySelectorAll(".thumbnailImg");
    var imgArray = Array.from(thumbImgList);
    var fullSizedImgAlt = document.querySelector(".fullSizedImg").alt;

    for (var j = 0; j < imgArray.length; j++) {
        if (imgArray[j].alt === fullSizedImgAlt && j !== (imgArray.length - 1)) {
            fullSizedImg.classList.add("contentTransparent");
            window.setTimeout(function() {
                fullSizedImg.src = "robertSchweizerArtResources/images/marine/" + imgArray[j + 1].alt + ".jpg";
                fullSizedImg.alt = imgArray[j + 1].alt;
                fullSizedImg.classList.remove("contentTransparent");
            }, 500);
            [].forEach.call(thumbImgList, function(x) {
                x.classList.remove("contentVisible");
            }); 
            imgArray[j + 1].classList.add("contentVisible");
            return;
        }
        else if (imgArray[j].alt === fullSizedImgAlt && j === (imgArray.length - 1)) {
            fullSizedImg.classList.add("contentTransparent");
            window.setTimeout(function() {
                fullSizedImg.src = "robertSchweizerArtResources/images/marine/" + imgArray[0].alt + ".jpg";
                fullSizedImg.alt = imgArray[0].alt;
                fullSizedImg.classList.remove("contentTransparent");
            }, 500);
            [].forEach.call(thumbImgList, function(x) {
                x.classList.remove("contentVisible");
            }); 
            imgArray[0].classList.add("contentVisible");
            return;
        }
    }
}

//~~~~~~// Opens appropriate image on thumbnail click //~~~~~~//

function thumbnailEnlarge(e) {
    var thumbAlt = e.target.alt;
    var fullSizedImg = document.querySelector(".fullSizedImg");
    var thumbImgList = document.querySelectorAll(".thumbnailImg");
    if (thumbAlt !== undefined) {
        fullSizedImg.classList.add("contentTransparent");
        window.setTimeout(function() {
            fullSizedImg.src = "robertSchweizerArtResources/images/marine/" + thumbAlt + ".jpg";
            fullSizedImg.alt = thumbAlt;
                fullSizedImg.classList.remove("contentTransparent");
        }, 300);
        [].forEach.call(thumbImgList, function(x) {
            x.classList.remove("contentVisible");
        });        
        e.target.classList.add("contentVisible");
    }
}

//~~~~~~// Resizes landing page and loads appropriate AJAX content //-----//

function titleShrink(e) {
	var heroBorderDiv = document.querySelector(".heroBorder");

    //---// If heroBorderDiv has not been expanded from 50% starting width //---//

	if (heroBorderDiv.classList.contains("heroBorderDivExpanded") === false) {
	    var leftLanding = document.querySelector(".leftLanding");
	    var rightLanding = document.querySelector(".rightLanding");
	    var title = document.querySelector(".pageTitle");
        var robert = document.querySelector(".robertTitle");
	    var titleBorderDiv = document.querySelector(".leftBorder");

	    leftLanding.classList.add("leftLandingCollapsed");
        rightLanding.classList.add("rightLandingExpanded");
        title.classList.add("pageTitleCollapsed");
        robert.classList.add("robertTitleCollapsed");
        heroBorderDiv.classList.add("heroBorderDivExpanded");
        titleBorderDiv.classList.add("leftBorderCollapsed");

        loadAJAX(e);

    //---// Fades menu out on selection for mobile //---//    
        if (window.matchMedia("(max-width: 499px)").matches) {
            navWork.childNodes[0].nodeValue = "+ Paintings";
            navAbout.childNodes[0].nodeValue = "+ Information";

            dropDown[0].classList.remove("workDropExpanded");
            dropDown[1].classList.remove("aboutDropExpanded");
        } 

    //---// Fades AJAX content in //---//
    
        function contentFade() {
            var contentChildren = [].slice.call(heroBorderDiv.children);
            contentChildren.map(function(x) {
      	        x.classList.toggle("contentVisible");
            });
            heroBorderDiv.removeEventListener("transitionend", contentFade, false);
        }

        heroBorderDiv.addEventListener("transitionend", contentFade, false);

        e.stopPropagation();
    }

    else if (heroBorderDiv.classList.contains("heroBorderDivExpanded") === true) {

    //---// If heroBorderDiv has been expanded from intial width of 50%, scans content and removes contentVisible class to trigger fade out //---//

        var contentChildren = [].slice.call(heroBorderDiv.children);
        contentChildren.map(function(x){
        	x.classList.toggle("contentVisible");
        });

    //---// Fades menu out on selection for mobile //---//    
        if (window.matchMedia("(max-width: 499px)").matches) {
            navWork.childNodes[0].nodeValue = "+ Paintings";
            navAbout.childNodes[0].nodeValue = "+ Information";

            dropDown[0].classList.remove("workDropExpanded");
            dropDown[1].classList.remove("aboutDropExpanded");
        } 

    //---// Loads the new AJAX content, waits a beat, and adds the contentVisible class to trigger fade in //---//

        function newContentFadeIn() {
            loadAJAX(e);
            window.setTimeout(function(){
                var contentChildren2 = [].slice.call(heroBorderDiv.children);
                contentChildren2.map(function(y) {
            	    y.classList.add("contentVisible");
                });
            }, 200);
            contentChildren[0].removeEventListener("transitionend", newContentFadeIn, false);
        }

        contentChildren[0].addEventListener("transitionend", newContentFadeIn, false);

		e.stopPropagation();
	}
}

//******// Event Listeners //******//
    // 1 & 2: Runs page alignment, content and transitions when menu items selected

dropDown[0].addEventListener("click", titleShrink, false);
dropDown[1].addEventListener("click", titleShrink, false);

//~~~~~~// Full screen image toggle //~~~~~~//

function fullScreenImg() {
    var img = document.querySelector(".imgFullSize");
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (img.requestFullscreen) {
            img.requestFullscreen();
        } 
        else if (img.msRequestFullscreen) {
            img.msRequestFullscreen();
        } 
        else if (img.mozRequestFullScreen) {
            img.mozRequestFullScreen();
        } 
        else if (img.webkitRequestFullscreen) {
            img.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } 
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } 
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } 
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } 
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

//~~~~~~// Corrects element alignment based on menu selection //~~~~~~//

function heroBorderAlignment(e) {
    var heroBorderDiv = document.querySelector(".heroBorder");
    e.target.parentElement === dropDown[1] ? 
    window.setTimeout(function() {
        heroBorderDiv.classList.add("heroBorderCenterAlign");
    }, 450)
    :
    window.setTimeout(function() {
        heroBorderDiv.classList.remove("heroBorderCenterAlign");
    }, 450);
}

function infoModalExpand() {
    var infoBox = document.querySelector(".galleryInfoButton");
    var fullScreenBox = document.querySelector(".fullScreenToggle");
    var infoSpacer = document.querySelector(".infoSpacer");
    var infoContent = document.querySelector(".infoContent");

        infoSpacer.classList.contains("infoSpacerExpanded") ? 
            (window.setTimeout(function() {
                infoBox.classList.remove("galleryInfoButtonExpanded");
            }, 50),
            infoSpacer.classList.remove("infoSpacerExpanded"),
            infoBox.innerHTML = "i")
            :
            (window.setTimeout(function() {
                infoBox.innerHTML = "X";
            }, 13),
            infoSpacer.classList.add("infoSpacerExpanded"),
            infoBox.classList.add("galleryInfoButtonExpanded"));
}

function infoBoxHover() {
    var infoBox = document.querySelector(".galleryInfoButton");
    infoBox.classList.add("galleryInfoButtonHover");
}

function infoBoxHoverOff() {
    var infoBox = document.querySelector(".galleryInfoButton");
    infoBox.classList.remove("galleryInfoButtonHover");
}

