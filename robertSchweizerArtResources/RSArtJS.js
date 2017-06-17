//---// Function Declarations //---//

/*function getAJAXContent(dataPipe) {
    return new Promise( (resolve, reject) => {
        let ajaxFill = "robertSchweizerArtResources/" + dataPipe.elementClicked.textContent.split(" ").join("").toLowerCase() + ".html";
        let xhttp = new XMLHttpRequest();

        xhttp.open("GET", ajaxFill, true);


        if (xhttp.readyState == 4 && xhttp.status == 200) {
            dataPipe.response = xhttp.responseText;
            resolve(dataPipe);
        } else {
            reject(Error(xhttp.statusText));
        }

        xhttp.send();
    });
}*/

/*function loadAJAXContent(dataPipe, containterElementByClass) {
    return new Promise( (resolve, reject) => {
        let container = document.querySelector("." + containterElementByClass);

        container.addEventListener("DOMContentLoaded", () => {
            container.insertAdjacentHTML("afterbegin", dataPipe.response);
            resolve(dataPipe);
        }, false);

    });
}*/

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

/*function loadAJAXContent(dataPipe, containerElementByClass) {
    let container;

    Array.isArray(containerElementByClass) ?
        container = document.querySelectorAll("." + containerElementByClass[0])[containerElementByClass[1]]
        :
        container = document.querySelector("." + containerElementByClass);

    //container.insertAdjacentHTML("afterbegin", dataPipe.response);
    container.innerHTML = dataPipe.response;

    return dataPipe;
}*/


function whatWasSelected(e) {
    return new Promise( (resolve, reject) => {
        let dataPipe = {};

        if (e.target !== undefined && e.touches === undefined) {
            dataPipe.event = e;
            dataPipe.elementClicked = e.target;
            dataPipe.elementClickedId = e.target.id;
            dataPipe.elementClickedAlt = e.target.alt;
            resolve(dataPipe);
        } else if (e.target !== undefined && e.touches !== undefined) {
            dataPipe.startingPointX = e.touches[0].clientX;
            dataPipe.event = e;
            dataPipe.elementClicked = e.target;
            dataPipe.elementClickedId = e.target.id;
            dataPipe.elementClickedAlt = e.target.alt;
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
            console.log(dataPipe, index);
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
            console.log(index);
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
            specificElement.classList.add(classToToggle);
        } else if (!Array.isArray(target)) {
            elementArray = Array.from(document.querySelectorAll("." + target));
            elementArray.forEach( (element) => {
                element.classList.add(classToToggle);
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
            specificElement.classList.remove(classToToggle);
        } else if (!Array.isArray(target)) {
            elementArray = Array.from(document.querySelectorAll("." + target));
            elementArray.forEach( (element) => {
                element.classList.remove(classToToggle);
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

function mobileSwipeControl(dataPipe, elementClicked) {
    let threshold = 100;
    let endingPointX, distanceTravelledX;

    elementClicked.addEventListener("touchend", () => {
        endingPointX = dataPipe.event.changedTouches[0].clientX;
        dataPipe.distanceTravelledX = endingPointX - dataPipe.startingPointX;
        if (Math.abs(distanceTravelledX) >= threshold) {
            distanceTravelledX > 0 ? dataPipe.elementClickedID = "decrement" : dataPipe.elementClickedID = "increment";
        }
    }, false);

    return dataPipe;
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
            console.log(dataPipe);
            resolve(dataPipe);
        }, delayTime);
    });
}

//---// Event Listeners and Promise Chain Composition //---//

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".navWorkHeading").addEventListener("click", (e) => {
        whatWasSelected(e)
        .then( dataPipe => classToggler(dataPipe, 0, "workDropExpanded", "workDrop") )
        .then( textToggler("+ Paintings", "- Paintings", "navWorkHeading") )
        .catch( error => console.log(error) );
    }, false);

    document.querySelector(".navAboutHeading").addEventListener("click", (e) => {
        whatWasSelected(e)
        .then( dataPipe => classToggler(dataPipe, 0, "aboutDropExpanded", "aboutDrop") )
        .then( textToggler("+ Information", "- Information", "navAboutHeading") )
        .catch( (error) => console.log(error) );
    }, false);

    Array.from(document.querySelectorAll(".dropDownItem")).forEach( (selection) => {
        selection.addEventListener("click", (e) => {
            whatWasSelected(e)
            .then( dataPipe => classRemover(dataPipe, 0, "contentVisible", "galleryWrapper") )
            .then( dataPipe => delayer(dataPipe, 200))
            .then( dataPipe => classRemover(dataPipe, 0, "dropDownItemHighlight", "dropDownItem") )
            .then( dataPipe => findIndexOfClicked(dataPipe, "dropDownItem") )
            .then( dataPipe => getAJAXContent(dataPipe, "heroBorder") )
            .then( dataPipe => classToggler(dataPipe, 0, "dropDownItemHighlight", ["dropDownItem", dataPipe.elementClickedIndex]) )
            .catch( (dataPipe, error) => {
                if (dataPipe.currentIndex === undefined) {
                    return dataPipe;
                } else {
                    return error;
                }
            })
            .then( dataPipe => classAdder(dataPipe, 0, "leftLandingCollapsed", "leftLanding") )
            .then( dataPipe => classAdder(dataPipe, 0, "leftBorderCollapsed", "leftBorder") )
            .then( dataPipe => classAdder(dataPipe, 0, "pageTitleCollapsed", "pageTitle") )
            .then( dataPipe => classAdder(dataPipe, 0, "rightLandingExpanded", "rightLanding") )
            .then( dataPipe => classAdder(dataPipe, 0, "heroBorderDivExpanded", "heroBorder") )
            .then( dataPipe => delayer(dataPipe, 800) )
            .catch( (error) => {
                console.log(error);
            })
            .then( dataPipe => classToggler(dataPipe, 0, "contentVisible", "galleryWrapper") );
        }, false);
    });
}, false);

if (document.querySelectorAll(".galleryNavButtons") !== undefined && document.querySelectorAll(".galleryNavButtons") !== null) {
    Array.from(document.querySelectorAll(".galleryNavButtons")).forEach( (button) => {
        button.addEventListener("click", (e) => {
            whatWasSelected(e)
            .then( dataPipe => findElementOfClass(dataPipe, "thumbnailImg", "contentVisible") )
            .then( dataPipe => findNextThumbnailIndex(dataPipe, "thumbnailImg") )
            .then( dataPipe => classRemover(dataPipe, 0, "contentVisible", "fullSizedImg", "fullSizedImgSmall") )
            .then( dataPipe => classRemover(dataPipe, 0, "contentVisible", ["thumbnailImg", dataPipe.currentElementIndex]) )
            .then( dataPipe => classAdder(dataPipe, 0, "contentVisible", ["thumbnailImg", dataPipe.nextIndex]) )
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
            .then( dataPipe => classAdder(dataPipe, 0, "contentVisible", "fullSizedImg", "fullSizedImgSmall") )
            .catch( (error) => { console.log(error); } )
        }, false);
    });
}

if (document.querySelectorAll(".thumbnailImg") !== undefined && document.querySelectorAll(".thumbnailImg") !== null) {
    Array.from(document.querySelectorAll(".thumbnailImg")).forEach( (thumbnail) => {
        thumbnail.addEventListener("click", (e) => {
            whatWasSelected(e)
            .then( dataPipe => findCurrentElementOfClass(dataPipe, "thumbnailImg", "contentVisible") )
            .then( dataPipe => findNextThumbnailIndex(dataPipe, "thumbnailImg") )
            .then( dataPipe => classToggler(dataPipe, 800, "contentVisible", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.currentIndex]) )
            .then( dataPipe => changeAttribute(dataPipe, "src",
                ("robertSchweizerArtResources/images/" + dataPipe.elementClickedId + ".jpg"),
                "fullSizedImg") )
            .then( dataPipe => changeAttribute(dataPipe, "srcset",
                ("robertSchweizerArtResources/images/" + dataPipe.elementClickedId + "SMALL.jpg"),
                "fullSizedImgSmall") )
            .then( dataPipe => changeAttribute(dataPipe, "alt", dataPipe.elementClickedAlt, "fullSizedImg", "fullSizedImgSmall") )
            .then( dataPipe => classToggler(dataPipe, 800, "contentVisible", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.nextIndex]) )
            .catch( (error) => { console.log(error); } )
        }, false);
    });
}

if (document.querySelector(".fullSizedImg") !== undefined && document.querySelector(".fullSizedImg") !== null) {
    document.querySelector(".fullSizedImg").addEventListener("click", (e) => {
        fullScreenImg("fullSizedImg");
    }, false);

    document.querySelector(".fullSizedImg").addEventListener("touchstart", (e) => {
        whatWasSelected(e)
        .then( dataPipe => mobileSwipeControl(dataPipe, "fullSizedImg") )
        .then( dataPipe => findCurrentElementOfClass(dataPipe, "thumbnailImg", "contentVisible") )
        .then( dataPipe => findNextThumbnailIndex(dataPipe, "thumbnailImg") )
        .then( dataPipe => classToggler(dataPipe, 800, "contentVisible", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.currentIndex]) )
        .then( dataPipe => changeAttribute(dataPipe, "src",
            ("robertSchweizerArtResources/images/" + dataPipe.elementClickedId + ".jpg"),
            "fullSizedImg") )
        .then( dataPipe => changeAttribute(dataPipe, "srcset",
            ("robertSchweizerArtResources/images/" + dataPipe.elementClickedId + "SMALL.jpg"),
            "fullSizedImgSmall") )
        .then( dataPipe => changeAttribute(dataPipe, "alt", dataPipe.elementClickedAlt, "fullSizedImg", "fullSizedImgSmall") )
        .then( dataPipe => classToggler(dataPipe, 800, "contentVisible", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.nextIndex]) )
        .catch( (error) => { console.log(error); } )
    }, false);
} else if (document.querySelector(".fullSizedImgSmall") !== undefined && document.querySelector(".fullSizedImgSmall") !== null) {
    document.querySelector(".fullSizedImgSmall").addEventListener("click", (e) => {
        fullScreenImg("fullSizedImgSmall");
    }, false);

    document.querySelector(".fullSizedImgSmall").addEventListener("touchstart", (e) => {
        whatWasSelected(e)
        .then( dataPipe => mobileSwipeControl(dataPipe, "fullSizedImgSmall") )
        .then( dataPipe => findCurrentElementOfClass(dataPipe, "thumbnailImg", "contentVisible") )
        .then( dataPipe => findNextThumbnailIndex(dataPipe, "thumbnailImg") )
        .then( dataPipe => classToggler(dataPipe, 800, "contentVisible", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.currentIndex]) )
        .then( dataPipe => changeAttribute(dataPipe, "src",
            ("robertSchweizerArtResources/images/" + dataPipe.elementClickedId + ".jpg"),
            "fullSizedImg") )
        .then( dataPipe => changeAttribute(dataPipe, "srcset",
            ("robertSchweizerArtResources/images/" + dataPipe.elementClickedId + "SMALL.jpg"),
            "fullSizedImgSmall") )
        .then( dataPipe => changeAttribute(dataPipe, "alt", dataPipe.elementClickedAlt, "fullSizedImg", "fullSizedImgSmall") )
        .then( dataPipe => classToggler(dataPipe, 800, "contentVisible", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.nextIndex]) )
        .catch( (error) => { console.log(error); } )
    }, false);
}

if (document.querySelector(".fullScreenToggle") !== undefined && document.querySelector(".fullScreenToggle") !== null) {
    document.querySelector(".fullScreenToggle").addEventListener("click", () => {
        fullScreenImg("fullSizedImg");
    }, false);
}

if (document.querySelector(".galleryInfoButton") !== undefined && document.querySelector(".galleryInfoButton") !== null) {
    document.querySelector(".galleryInfoButton").addEventListener("click", () => {
        classToggler("none", 0, "galleryInfoButtonExpanded", "galleryInfoButton");
        textToggler("i", "x", "galleryInfoButton");
        classToggler("none", 50, "infoSpacerExpanded", "infoSpacer");
    }, false);
}

