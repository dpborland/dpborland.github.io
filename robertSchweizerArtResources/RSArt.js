//~~~~~~// Toggles and fills the "Paintings" and "Information" categories //~~~~~~//

function navToggle(e) {
    var navWorkText = navWork.childNodes[0];
    var navAboutText = navAbout.childNodes[0];

    //---// If the screen is smaller (mobile), displays only one nav menu //---//
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

//~~~~~~// Changes full-sized image and fades in matching thumbnail //~~~~~~//

function imageDecrease() {
    var thumbImgList = document.querySelectorAll(".thumbnailImg");
    var imgArray = Array.from(thumbImgList);
    var fullSizedImg = document.querySelector(".fullSizedImg");
    var fullSizedImgAlt = document.querySelector(".fullSizedImg").alt;
    var fullSizedImgSmall = document.querySelector(".fullSizedImgSmall");
    var fullSizedImgSmallAlt = document.querySelector(".fullSizedImgSmall").alt;

    //---// Loops through all loaded thumbnails //---//
    for (var i = 0; i < imgArray.length; i++) {

        //---// Runs if the selected thumbnail isn't at index 0 //---//
        if ((imgArray[i].alt === fullSizedImgAlt) && (i !== 0)) {
            fullSizedImg.classList.add("contentTransparent");
            fullSizedImgSmall.classList.add("contentTransparent");
            window.setTimeout(function() {
                fullSizedImg.src = "robertSchweizerArtResources/images/marine/" + imgArray[i - 1].alt + ".jpg";
                fullSizedImg.alt = imgArray[i - 1].alt;
                fullSizedImgSmall.srcset = "robertSchweizerArtResources/images/marine/" + imgArray[i - 1].alt + "SMALL.jpg";
                fullSizedImgSmallAlt = imgArray[i - 1].alt;
                window.setTimeout(function() {
                    fullSizedImg.classList.remove("contentTransparent");
                    fullSizedImgSmall.classList.remove("contentTransparent");
                }, 250);
            }, 500);
            
            [].forEach.call(thumbImgList, function(x) {
                x.classList.remove("contentVisible");
            }); 
            
            imgArray[i - 1].classList.add("contentVisible");
            
            return;
        }  

        //----// Runs if the selected thumbnail is at index 0 //---// 
        else if ((imgArray[i].alt === fullSizedImgAlt) && (imgArray.indexOf(imgArray[i]) === 0)) {
            fullSizedImg.classList.add("contentTransparent");
            fullSizedImgSmall.classList.add("contentTransparent");
            window.setTimeout(function() {
                fullSizedImg.src = "robertSchweizerArtResources/images/marine/" + imgArray[imgArray.length - 1].alt + ".jpg";
                fullSizedImg.alt = imgArray[imgArray.length - 1].alt;
                fullSizedImgSmall.srcset = "robertSchweizerArtResources/images/marine/" + imgArray[imgArray.length - 1].alt + "SMALL.jpg";
                fullSizedImgSmallAlt = imgArray[imgArray.length - 1].alt;
                window.setTimeout(function() {
                    fullSizedImg.classList.remove("contentTransparent");
                    fullSizedImgSmall.classList.remove("contentTransparent");
                }, 250);
            }, 500);
            
            [].forEach.call(thumbImgList, function(x) {
                x.classList.remove("contentVisible");
            }); 
            
            imgArray[imgArray.length - 1].classList.add("contentVisible");
            
            return;
        }
    }
}

function imageIncrease() {
    var fullSizedImg = document.querySelector(".fullSizedImg");
    var thumbImgList = document.querySelectorAll(".thumbnailImg");
    var fullSizedImgSmall = document.querySelector(".fullSizedImgSmall");
    var imgArray = Array.from(thumbImgList);
    var fullSizedImgAlt = document.querySelector(".fullSizedImg").alt;

    //---// Loops through all loaded thumbnails //---//
    for (var j = 0; j < imgArray.length; j++) {

        //---// Runs if selected thumbnail isn't the last in the array //---//
        if (imgArray[j].alt === fullSizedImgAlt && j !== (imgArray.length - 1)) {
            fullSizedImg.classList.add("contentTransparent");
            fullSizedImgSmall.classList.add("contentTransparent");
            window.setTimeout(function() {
                fullSizedImg.src = "robertSchweizerArtResources/images/marine/" + imgArray[j + 1].alt + ".jpg";
                fullSizedImg.alt = imgArray[j + 1].alt;
                fullSizedImgSmall.srcset = "robertSchweizerArtResources/images/marine/" + imgArray[j + 1].alt + "SMALL.jpg";
                fullSizedImgSmallAlt = imgArray[j + 1].alt;
                window.setTimeout(function() {
                    fullSizedImg.classList.remove("contentTransparent");
                    fullSizedImgSmall.classList.remove("contentTransparent");
                }, 250);
            }, 500);
            
            [].forEach.call(thumbImgList, function(x) {
                x.classList.remove("contentVisible");
            }); 
            
            imgArray[j + 1].classList.add("contentVisible");
            
            return;
        }

        //---// Runs if the selected thumbnail is the last in the array //---//
        else if (imgArray[j].alt === fullSizedImgAlt && j === (imgArray.length - 1)) {
            fullSizedImg.classList.add("contentTransparent");  
            fullSizedImgSmall.classList.add("contentTransparent");
            window.setTimeout(function() {
                fullSizedImg.src = "robertSchweizerArtResources/images/marine/" + imgArray[0].alt + ".jpg";
                fullSizedImg.alt = imgArray[0].alt;
                fullSizedImgSmall.srcset = "robertSchweizerArtResources/images/marine/" + imgArray[0].alt + "SMALL.jpg";
                fullSizedImgSmallAlt = imgArray[0].alt;
                window.setTimeout(function() {
                    fullSizedImg.classList.remove("contentTransparent");
                    fullSizedImgSmall.classList.remove("contentTransparent");
                }, 250);
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
    var fullSizedImgSmall = document.querySelector(".fullSizedImgSmall");
    var thumbImgList = document.querySelectorAll(".thumbnailImg");
    
    if (thumbAlt !== undefined) {
        fullSizedImg.classList.add("contentTransparent");
        fullSizedImgSmall.classList.add("contentTransparent");
        window.setTimeout(function() {
            fullSizedImg.src = "robertSchweizerArtResources/images/marine/" + thumbAlt + ".jpg";
            fullSizedImg.alt = thumbAlt;
            fullSizedImgSmall.srcset = "robertSchweizerArtResources/images/marine/" + thumbAlt + "SMALL.jpg";
            fullSizedImgSmallAlt = thumbAlt;
            window.setTimeout(function() {
                fullSizedImg.classList.remove("contentTransparent");
                fullSizedImgSmall.classList.remove("contentTransparent");
            }, 250);
        }, 500);
        
        [].forEach.call(thumbImgList, function(x) {
            x.classList.remove("contentVisible");
        });        
        
        e.target.classList.add("contentVisible");
    }
}

//~~~~~~// Fades main content in/out //~~~~~~//

function contentFade() {
    var heroBorderDiv = document.querySelector(".heroBorder");
    var contentChildren = [].slice.call(heroBorderDiv.children);
        contentChildren.map(function(x) {
            x.classList.toggle("contentVisible");
        });
    heroBorderDiv.removeEventListener("transitionend", contentFade, false);
}

function newContentFadeIn() {
    var heroBorderDiv = document.querySelector(".heroBorder");
    var contentChildren = [].slice.call(heroBorderDiv.children);
    window.setTimeout(function(){
        var contentChildren2 = [].slice.call(heroBorderDiv.children);
        contentChildren2.map(function(y) {
            y.classList.add("contentVisible");
        });
    }, 200);
    contentChildren[0].removeEventListener("transitionend", newContentFadeIn, false);
}

//~~~~~~// Full screen image toggle //~~~~~~//

function fullScreenImg() {
    var img = document.querySelector(".fullSizedImgContainer");
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

//~~~~~~// Expands the info box containing painting title, size, and price //~~~~~~//

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

//~~~~~~// Controls hover state for infoModal //~~~~~~//

function infoBoxHover() {
    var infoBox = document.querySelector(".galleryInfoButton");
        infoBox.classList.add("galleryInfoButtonHover");
}

function infoBoxHoverOff() {
    var infoBox = document.querySelector(".galleryInfoButton");
        infoBox.classList.remove("galleryInfoButtonHover");
}

//~~~~~~// Dims the large image when thumbnails hovered over //~~~~~~//

function largeImgDarkening() {
    if (window.matchMedia("(min-width: 500px)").matches && window.matchMedia("(min-height: 400px)").matches) {
        var largeImg = document.querySelector(".fullSizedImgContainer");
        var thumbnail = document.querySelector(".galleryThumbnails");
        largeImg.classList.add("fullSizedImgContainerDarkened");

        function darkeningReverse() {
            largeImg.classList.remove("fullSizedImgContainerDarkened");
        }
        thumbnail.addEventListener("mouseout", darkeningReverse, false);
    }
}

//~~~~~~// Dims the thumbnail gallery when thumbnails hovered over //~~~~~~//

function galleryDarkening() {
    if (window.matchMedia("(min-width: 500px)").matches && window.matchMedia("(min-height: 400px)").matches) {
        var gallery = document.querySelector(".galleryWrapper");
        var thumbnail = document.querySelector(".galleryThumbnails");
        gallery.classList.add("galleryNavBoxDarkened");

        function galleryDarkeningReverse() {
            gallery.classList.remove("galleryNavBoxDarkened");
        }

        thumbnail.addEventListener("mouseout", galleryDarkeningReverse, false);
    }
}

//~~~~~~// Attaches all necessary event listeners after AJAX request is made //~~~~~~//

function galleryEventListeners(menuSelection) {
    if (menuSelection === "Marine" || menuSelection === "Landscapes" || menuSelection === "Portraits" || menuSelection === "Figures &amp; Still Lifes" || menuSelection === "All") {
        
        window.setTimeout(function() {

            var thumbnail = document.querySelector(".galleryThumbnails");
                thumbnail.addEventListener("mouseover", largeImgDarkening, false);
                thumbnail.addEventListener("mouseover", galleryDarkening, false);
                thumbnail.addEventListener("click", thumbnailEnlarge, false);

            var navButtonLeft = document.querySelector(".galleryNavLeft");
            var navButtonRight = document.querySelector(".galleryNavRight");
                if (navButtonLeft.style.display !== "none") {
                    navButtonLeft.addEventListener("click", imageDecrease, false);
                    navButtonRight.addEventListener("click", imageIncrease, false);
                }

            var fullScreen = document.querySelector(".fullScreenToggle");
                fullScreen.addEventListener("click", fullScreenImg, false);

            var fullSizedImg = document.querySelector(".fullSizedImg");
                fullSizedImg.addEventListener("click", fullScreenImg, false);

            var infoBox = document.querySelector(".galleryInfoButton");
                infoBox.addEventListener("click", infoModalExpand, false);
                infoBox.addEventListener("mouseover", infoBoxHover, false);
                infoBox.addEventListener("mouseout", infoBoxHoverOff, false);

            //---// Anonymous functions for mobile swipe control, so event can be passed //---//
            var image = document.querySelector(".fullSizedImgContainer");
                var startX;          // First point along X-axis touched
                var endX;            // Last point along X-axis touched
                var distX;           // Distance traveled along X-axis
                var threshold = 100; // Required min distance traveled along X-axis to be considered swipe
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

        }, 200);
    }
}

//~~~~~~// Loads ajax content //~~~~~~//

function loadAJAX(e) {
    var menuSelection = e.target.innerHTML;
    var ajaxFill = "robertSchweizerArtResources/" + menuSelection + ".html";
    var heroBorderDiv = document.querySelector(".heroBorder");

    //---// Load the appropriate AJAX content (while avoiding 404'd AJAX requests), then attaches event listeners //---//
    if (menuSelection === "Marine" || menuSelection === "Landscapes" || menuSelection === "Portraits" || menuSelection === "Figures &amp; Still Lifes" || menuSelection === "All" || menuSelection === "Bio" || menuSelection === "Contact") {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                heroBorderDiv.innerHTML = xhttp.responseText;
            }
        };
        xhttp.open("GET", ajaxFill, true);
        xhttp.send();

        galleryEventListeners(menuSelection);
    }
}

//~~~~~~// Resizes landing page and loads appropriate AJAX content //~~~~~~//

function titleShrink(e) {
    var heroBorderDiv = document.querySelector(".heroBorder");

    //---// If heroBorderDiv hasn't been expanded, triggers expansion, shrinks left landing and title, loads AJAX //---//
    if (heroBorderDiv.classList.contains("heroBorderDivExpanded") === false) {

        var leftLanding = document.querySelector(".leftLanding");
            leftLanding.classList.add("leftLandingCollapsed");
        var rightLanding = document.querySelector(".rightLanding");
            rightLanding.classList.add("rightLandingExpanded");
        var title = document.querySelector(".pageTitle");
            title.classList.add("pageTitleCollapsed");
        var robert = document.querySelector(".robertTitle");
            robert.classList.add("robertTitleCollapsed");
        var titleBorderDiv = document.querySelector(".leftBorder");
            titleBorderDiv.classList.add("leftBorderCollapsed");

        heroBorderDiv.classList.add("heroBorderDivExpanded");

        loadAJAX(e);

        //---// Fades menu out on selection for mobile //---//    
        if (window.matchMedia("(max-width: 499px)").matches) {
            navWork.childNodes[0].nodeValue = "+ Paintings";
            navAbout.childNodes[0].nodeValue = "+ Information";

            dropDown[0].classList.remove("workDropExpanded");
            dropDown[1].classList.remove("aboutDropExpanded");
        } 

        heroBorderDiv.addEventListener("transitionend", contentFade, false);

        e.stopPropagation();
    }

    //---// If heroBorderDiv has been expanded from intial width of 50%, scans content and removes contentVisible class to trigger fade out //---//
    else if (heroBorderDiv.classList.contains("heroBorderDivExpanded") === true) {

        contentFade();

        //---// Allows current content to fade out, then loads and fades in new content //---//    
        window.setTimeout(function() {
            loadAJAX(e);
        }, 350);
        window.setTimeout(function() {
            newContentFadeIn();
        }, 500);

        //---// Fades menu out on selection for mobile //---//    
        if (window.matchMedia("(max-width: 499px)").matches) {
            navWork.childNodes[0].nodeValue = "+ Paintings";
            navAbout.childNodes[0].nodeValue = "+ Information";

            dropDown[0].classList.remove("workDropExpanded");
            dropDown[1].classList.remove("aboutDropExpanded");
        } 

        e.stopPropagation();
    }
}

//******// Event Listeners //******//

// navWork: When the "Paintings" menu group is clicked, the menu elements are presented and page is appropriately aligned
var navWork = document.querySelector(".navWork");
    navWork.addEventListener("click", navToggle, false);

// navAbout: When the "Information" menu group is clicked, the menu elements are presented and page is appropriately aligned
var navAbout = document.querySelector(".navAbout");
    navAbout.addEventListener("click", navToggle, false);

// dropDown: When either the "Paintings" or "Information" drop menu choices are clicked, the landing page is resized (if necessary), the AJAX content is loaded and faded in/out
var dropDown = document.querySelectorAll(".dropDown")
    dropDown[0].addEventListener("click", heroBorderAlignment, false);
    dropDown[1].addEventListener("click", heroBorderAlignment, false);
    dropDown[0].addEventListener("click", titleShrink, false);
    dropDown[1].addEventListener("click", titleShrink, false);


