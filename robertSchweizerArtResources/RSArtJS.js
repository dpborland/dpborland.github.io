//---// Function Declarations //---//

function getAJAXContent(dataPipe, containerElementByClass) {
    let ajaxFill = "robertSchweizerArtResources/" + dataPipe.elementClicked.textContent.split(" ").join("").toLowerCase() + ".html";
    let xhttp = new XMLHttpRequest();
    let container;

    xhttp.open("GET", ajaxFill, true);

    xhttp.onload = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            dataPipe.response = xhttp.responseText;
            Array.isArray(containerElementByClass) ?
                (container = document.querySelectorAll("." + containerElementByClass[0])[containerElementByClass[1]],
                    container.innerHTML = dataPipe.response)
                :
                (container = document.querySelector("." + containerElementByClass),
                    container.innerHTML = dataPipe.response);
        } else {
            console.log(xhttp.status);
        }
    }

    xhttp.send();
    return dataPipe;
}

function dataCollector(...events) {
    return new Promise( (resolve, reject) => {
        let dataPipe = {};

        if (events[0].target !== undefined && events[0].touches === undefined) {
            dataPipe.event = events[0];
            dataPipe.elementClicked = events[0].target;
            dataPipe.elementClickedId = events[0].target.id;
            dataPipe.elementClickedAlt = events[0].target.alt;
            resolve(dataPipe);
        } else if (events[0].target !== undefined && events[0].touches !== undefined) {
            dataPipe.startingPointX = events[0].touches[0].clientX;
            dataPipe.touches = events[0].touches;
            //dataPipe.endingPointX = events[1].changedTouches[0].clientX;
            dataPipe.changedTouches = events[0].changedTouches;
            dataPipe.elementClicked = events[0].target;
            dataPipe.elementClickedId = "";
            dataPipe.elementClickedAlt = "";
            resolve(dataPipe);
        } else {
            reject(e);
        }
    });
}

function findIndexOfClicked(dataPipe, ...elementsByClass) {
    let array = Array.from(document.querySelectorAll("." + elementsByClass));

    array.forEach( (element, index) => {
        if (element === dataPipe.elementClicked) {
            dataPipe.elementClickedIndex = index;
            return dataPipe;
        }
    });

    return dataPipe;
}

function findElementOfClass(dataPipe, elementsToSearch, classToSearch) {
    let elementArray = Array.from(document.querySelectorAll("." + elementsToSearch));

    elementArray.findIndex( (element, index) => {
        if (element.classList.contains(classToSearch)) {
            dataPipe.currentElementIndex = index;
        }
    });

    return dataPipe;
}

function findNextThumbnailIndex(dataPipe, elementsToSearch) {
    let elementArray = Array.from(document.querySelectorAll("." + elementsToSearch));

    if (dataPipe.elementClickedId === "increment") {
        dataPipe.currentElementIndex === elementArray.length - 1 ?
            dataPipe.nextIndex = 0
            :
            dataPipe.nextIndex = dataPipe.currentElementIndex + 1;

    } else if (dataPipe.elementClickedId === "decrement") {
        dataPipe.currentElementIndex === 0 ?
            dataPipe.nextIndex = elementArray.length - 1
            :
            dataPipe.nextIndex = dataPipe.currentElementIndex - 1;
    } else {
        elementArray.findIndex( (element, index) => {
            if (element.id === dataPipe.elementClickedId) {
                dataPipe.nextIndex = index;
            } else if (element === dataPipe.elementClicked) {
                dataPipe.nextIndex = index;
            }
        });
    }

    return dataPipe;
}

function classAdder(dataPipe, classToAdd, ...targetElementsByClass) {
    let specificElement, elementArray;

    targetElementsByClass.forEach( (target) => {
        if (Array.isArray(target)) {
            specificElement = document.querySelectorAll("." + target[0])[target[1]];
            specificElement.classList.add(classToAdd);
        } else if (!Array.isArray(target)) {
            elementArray = Array.from(document.querySelectorAll("." + target));
            elementArray.forEach( (element) => {
                element.classList.add(classToAdd);
            });
        } else {
            return dataPipe;
        }
    });
    return dataPipe;
}

function classRemover(dataPipe, classToRemove, ...targetElementsByClass) {
    let specificElement, elementArray;

    targetElementsByClass.forEach( (target) => {
        if (Array.isArray(target)) {
            specificElement = document.querySelectorAll("." + target[0])[target[1]];
            specificElement.classList.remove(classToRemove);
        } else if (!Array.isArray(target)) {
            elementArray = Array.from(document.querySelectorAll("." + target));
            elementArray.forEach( (element) => {
                element.classList.remove(classToRemove);
            });
        } else {
            return dataPipe;
        }
    });
    return dataPipe;
}

function classToggler(dataPipe, classToToggle, ...targetElementsByClass) {
    let specificElement, elementArray;

    targetElementsByClass.forEach( (target) => {
        if (Array.isArray(target)) {
            specificElement = document.querySelectorAll("." + target[0])[target[1]];
            specificElement.classList.toggle(classToToggle);
        } else if (!Array.isArray(target)) {
            elementArray = Array.from(document.querySelectorAll("." + target));
            elementArray.forEach( (element) => {
                element.classList.toggle(classToToggle);
            });
        } else {
            return dataPipe;
        }
    });
    return dataPipe;
}

function changeAttribute(dataPipe, attr, newAttrValue, ...targetElementsByClass) {
    let specificElement, elementArray;

    targetElementsByClass.forEach( (target) => {
        Array.isArray(target) ?
            (specificElement = document.querySelectorAll("." + target[0])[target[1]],
                specificElement.setAttribute(attr, newAttrValue))
            :
            (elementArray = Array.from(document.querySelectorAll("." + target)),
                elementArray.forEach( (element) => {
                    element.setAttribute(attr, newAttrValue);
                }))
    });

    return dataPipe;
}

function textToggler(initialText, nextText, elementByClassName) {
    let element;

    if (Array.isArray(elementByClassName) === true) {
        element = document.querySelectorAll("." + elementByClassName[0])[elementByClassName[1]];
        element.firstChild.textContent === initialText ?
            element.firstChild.textContent = nextText
            :
            element.firstChild.textContent = initialText
    } else {
        element = document.querySelectorAll("." + elementByClassName);
        element.forEach( (individualElement) => {
            individualElement.firstChild.textContent === initialText ?
                individualElement.firstChild.textContent = nextText
                :
                individualElement.firstChild.textContent = initialText
        });
    }
}

function mobileSwipeInitiator(dataPipe, thresholdValue) {
    let distanceTravelledX, endingPointX;

    dataPipe.elementClicked.addEventListener("touchend", (e) => {
        distanceTravelledX = dataPipe.startingPointX - e.changedTouches[0].clientX;

        if (Math.abs(distanceTravelledX) >= thresholdValue) {
            distanceTravelledX > 0 ? dataPipe.elementClickedId = "increment" : dataPipe.elementClickedId = "decrement";
        }
        return dataPipe;

    }, false)
}

function fullScreenImg(elementByClass) {
    let img = document.querySelector("." + elementByClass);

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

function delayer (dataPipe, delayTime) {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve(dataPipe);
        }, delayTime);
    });
}

//---// Event Listeners and Promise Chain Composition //---//

document.addEventListener("DOMContentLoaded", () => {
//---// Toggles menu headings between open and closed states when clicked //---//
    document.querySelector(".navWorkHeading").addEventListener("click", (e) => {
        dataCollector(e)
        .then( dataPipe => classToggler(dataPipe, "workDropExpanded", "workDrop") )
        .then( textToggler("+ Paintings", "- Paintings", "navWorkHeading") )
        .catch( error => console.log(error) );
    }, false);

    document.querySelector(".navAboutHeading").addEventListener("click", (e) => {
        dataCollector(e)
        .then( dataPipe => classToggler(dataPipe, "aboutDropExpanded", "aboutDrop") )
        .then( textToggler("+ Information", "- Information", "navAboutHeading") )
        .catch( (error) => console.log(error) );
    }, false);

//---// Adjusts the site layout and fills AJAX content based on menu selection //---//
    Array.from(document.querySelectorAll(".dropDownItem")).forEach( (selection) => {
        selection.addEventListener("click", (e) => {
            dataCollector(e)
            .then( dataPipe => classRemover(dataPipe, "contentVisible", "galleryWrapper") )
            .then( dataPipe => delayer(dataPipe, 200))
            .then( dataPipe => classRemover(dataPipe, "dropDownItemHighlight", "dropDownItem") )
            .then( dataPipe => findIndexOfClicked(dataPipe, "dropDownItem") )
            .then( dataPipe => getAJAXContent(dataPipe, "heroBorder") )
            .then( dataPipe => classToggler(dataPipe, "dropDownItemHighlight", ["dropDownItem", dataPipe.elementClickedIndex]) )
            .catch( (dataPipe, error) => {
                if (dataPipe.currentIndex === undefined) {
                    return dataPipe;
                } else {
                    return error;
                }
            })
            .then( dataPipe => classAdder(dataPipe, "leftLandingCollapsed", "leftLanding") )
            .then( dataPipe => classAdder(dataPipe, "leftBorderCollapsed", "leftBorder") )
            .then( dataPipe => classAdder(dataPipe, "pageTitleCollapsed", "pageTitle") )
            .then( dataPipe => classAdder(dataPipe, "rightLandingExpanded", "rightLanding") )
            .then( dataPipe => classAdder(dataPipe, "heroBorderDivExpanded", "heroBorder") )
            .then( dataPipe => delayer(dataPipe, 800) )
            .catch( (error) => {
                console.log(error);
            })
            .then( dataPipe => classToggler(dataPipe, "contentVisible", "galleryWrapper") );
        }, false);
    });

//---// Controls image gallery's navigation buttons //---//
    document.querySelector(".heroBorder").addEventListener("click", (e) => {
        if (e.target && e.target.matches("div.galleryNavButtons")) {
            dataCollector(e)
            .then( dataPipe => findElementOfClass(dataPipe, "thumbnailImg", "contentVisible") )
            .then( dataPipe => findNextThumbnailIndex(dataPipe, "thumbnailImg") )
            .then( dataPipe => classRemover(dataPipe, "contentVisible", "fullSizedImg", "fullSizedImgSmall") )
            .then( dataPipe => classRemover(dataPipe, "contentVisible", ["thumbnailImg", dataPipe.currentElementIndex]) )
            .then( dataPipe => classAdder(dataPipe, "contentVisible", ["thumbnailImg", dataPipe.nextIndex]) )
            .then( dataPipe => delayer(dataPipe, 300) )
            .then( dataPipe => changeAttribute(dataPipe, "src",
                ("robertSchweizerArtResources/images/" + document.querySelectorAll(".thumbnailImg")[dataPipe.nextIndex].id + ".jpg"),
                "fullSizedImg") )
            .then( dataPipe => changeAttribute(dataPipe, "srcset",
                ("robertSchweizerArtResources/images/" + document.querySelectorAll(".thumbnailImg")[dataPipe.nextIndex].id + "SMALL.jpg"),
                "fullSizedImgSmall") )
            .catch( dataPipe => {
                console.log(dataPipe);
                return dataPipe;
            })
            .then( dataPipe => changeAttribute(dataPipe, "alt", document.querySelectorAll(".thumbnailImg")[dataPipe.nextIndex].alt, "fullSizedImg", "fullSizedImgSmall"))
            .then( dataPipe => delayer(dataPipe, 400) )
            .then( dataPipe => classAdder(dataPipe, "contentVisible", "fullSizedImg", "fullSizedImgSmall") )
            .catch( (error) => { console.log(error); } )
        }
    }, false);

//---// Allows for gallery image selection based on thumbnail clicked //---//
    document.querySelector(".heroBorder").addEventListener("click", (e) => {
        if (e.target && e.target.matches("img.thumbnailImg")) {
            dataCollector(e)
            .then( dataPipe => findElementOfClass(dataPipe, "thumbnailImg", "contentVisible") )
            .then( dataPipe => findNextThumbnailIndex(dataPipe, "thumbnailImg") )
            .then( dataPipe => classToggler(dataPipe, "contentVisible", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.currentElementIndex]) )
            .then( dataPipe => delayer(dataPipe, 300) )
            .then( dataPipe => changeAttribute(dataPipe, "src",
                ("robertSchweizerArtResources/images/" + dataPipe.elementClickedId + ".jpg"),
                "fullSizedImg") )
            .then( dataPipe => changeAttribute(dataPipe, "srcset",
                ("robertSchweizerArtResources/images/" + dataPipe.elementClickedId + "SMALL.jpg"),
                "fullSizedImgSmall") )
            .then( dataPipe => changeAttribute(dataPipe, "alt", dataPipe.elementClickedAlt, "fullSizedImg", "fullSizedImgSmall") )
            .then( dataPipe => delayer(dataPipe, 400) )
            .then( dataPipe => classToggler(dataPipe, "contentVisible", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.nextIndex]) )
            .catch( (error) => { console.log(error); } )
        }
    }, false);

//---// Opens current image in full screen when either the image itself, of the full screen toggle, are clicked //---//
    document.querySelector(".heroBorder").addEventListener("click", (e) => {
        if (e.target && e.target.matches("img.fullSizedImg")) {
            fullScreenImg("fullSizedImg");
        }
    }, false);

    document.querySelector(".heroBorder").addEventListener("click", (e) => {
        if (e.target && e.target.matches("picture.fullScreenToggle")) {
            fullScreenImg("fullSizedImg");
        }
    }, false);

//---// Opens the image's information tab //---//
    document.querySelector(".heroBorder").addEventListener("click", (e) => {
        if (e.target && e.target.matches("div.galleryInfoButton")) {
            classToggler("none", "galleryInfoButtonExpanded", "galleryInfoButton");
            textToggler("i", "X", "galleryInfoButton");
            classToggler("none", "infoSpacerExpanded", "infoSpacer");
        }
    }, false);

}, false);



if (document.querySelector(".fullSizedImg") !== undefined && document.querySelector(".fullSizedImg") !== null) {
    document.querySelector(".fullSizedImg").addEventListener("click", (e) => {
        fullScreenImg("fullSizedImg");
    }, false);

    document.querySelector(".fullSizedImg").addEventListener("touchstart", (touchStart) => {
        document.querySelector(".fullSizedImg").addEventListener("touchend", (touchEnd) => {
            dataCollector(touchStart, touchEnd)
            .then( dataPipe => mobileSwipeInitiator(dataPipe, 100) )
            .then( dataPipe => findElementOfClass(dataPipe, "thumbnailImg", "contentVisible") )
            .then( dataPipe => findNextThumbnailIndex(dataPipe, "thumbnailImg") )
            .then( dataPipe => classRemover(dataPipe, "contentVisible", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.currentElementIndex]) )
            .then( dataPipe => classAdder(dataPipe, "contentVisible", ["thumbnailImg", dataPipe.nextIndex]) )
            .then( dataPipe => delayer(dataPipe, 300) )
            .then( dataPipe => changeAttribute(dataPipe, "src",
                ("robertSchweizerArtResources/images/" + document.querySelectorAll(".thumbnailImg")[dataPipe.nextIndex].id + ".jpg"),
                "fullSizedImg") )
            .then( dataPipe => changeAttribute(dataPipe, "srcset",
                ("robertSchweizerArtResources/images/" + document.querySelectorAll(".thumbnailImg")[dataPipe.nextIndex].id + "SMALL.jpg"),
                "fullSizedImgSmall") )
            .catch( dataPipe => {
                console.log(dataPipe);
                return dataPipe;
            })
            .then( dataPipe => changeAttribute(dataPipe, "alt", document.querySelectorAll(".thumbnailImg")[dataPipe.nextIndex].alt, "fullSizedImg", "fullSizedImgSmall"))
            .then( dataPipe => delayer(dataPipe, 400) )
            .then( dataPipe => classAdder(dataPipe, "contentVisible", "fullSizedImg", "fullSizedImgSmall") )
            .catch( (error) => { console.log(error); } )
        }, false);
    }, false);


} else if (document.querySelector(".fullSizedImgSmall") !== undefined && document.querySelector(".fullSizedImgSmall") !== null) {

    document.querySelector(".fullSizedImgSmall").addEventListener("touchstart", (e) => {
        dataCollector(e)
        .then( dataPipe => mobileSwipeInitiator(dataPipe, 100) )
        .then( dataPipe => findElementOfClass(dataPipe, "thumbnailImg", "contentVisible") )
        .then( dataPipe => findNextThumbnailIndex(dataPipe, "thumbnailImg") )
        .then( dataPipe => classToggler(dataPipe, "contentVisible", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.currentIndex]) )
        .then( dataPipe => delayer(dataPipe, 300) )
        .then( dataPipe => changeAttribute(dataPipe, "src",
            ("robertSchweizerArtResources/images/" + dataPipe.elementClickedId + ".jpg"),
            "fullSizedImg") )
        .then( dataPipe => changeAttribute(dataPipe, "srcset",
            ("robertSchweizerArtResources/images/" + dataPipe.elementClickedId + "SMALL.jpg"),
            "fullSizedImgSmall") )
        .then( dataPipe => changeAttribute(dataPipe, "alt", dataPipe.elementClickedAlt, "fullSizedImg", "fullSizedImgSmall") )
        .then( dataPipe => delayer(dataPipe, 400) )
        .then( dataPipe => classToggler(dataPipe, "contentVisible", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.nextIndex]) )
        .catch( (error) => { console.log(error); } )
    }, false);
}


