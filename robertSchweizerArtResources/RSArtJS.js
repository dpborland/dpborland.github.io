//---// Function Declarations //---//

function getAJAXContent(dataPipe) {
    return new Promise( (resolve, reject) => {
        let ajaxFill = "robertSchweizerArtResources/" + dataPipe.event.textContent + ".html";
        let xhttp = new XMLHttpRequest();

        xhttp.open("GET", ajaxFill, true);

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                dataPipe.response = xhttp.response;
                resolve(dataPipe);
            } else {
                reject(Error(xhttp.statusText));
            }
        };

        xhttp.send();
    });
}

function loadAJAXContent(dataPipe, containterElementByClass) {
    return new Promise( (resolve, reject) => {
        let container = document.querySelector("." + containterElementByClass);

        containter.addEventListener("DOMContentLoaded", () => {
            resolve(dataPipe);
        }, false);

        container.insertAdjacentHTML("afterbegin", dataPipe.response);
    });
}


function whatWasSelected(e) {
    return new Promise( (resolve, reject) => {
        let dataPipe = {};

        if (e.target.id !== undefined) {
            dataPipe.event = e;
            dataPipe.elementClicked = e.target;
            dataPipe.elementClickedId = e.target.id;
            dataPipe.elementClickedAlt = e.target.alt;
            dataPipe.startingPointX = e.touches[0].clientX;
            resolve(dataPipe);
        } else {
            reject(e);
        }
    });
}

function findCurrentElementOfClass(dataPipe, elementsToSearch, classToSearch) {
    let elementArray = Array.from(document.querySelectorAll("." + elementsToSearch));

    elementArray.findIndex( (element, index) => {
        if (element.classList.contains(classToSearch)) {
            dataPipe.currentIndex = index;
        }
    });

    return dataPipe;
}

function findNextThumbnailIndex(dataPipe, elementsToSearch) {
    let elementArray = Array.from(document.querySelectorAll("." + elementsToSearch));

    if (dataPipe.elementClickedId === "increment") {
        dataPipe.currentIndex === elementArray.length - 1 ?
            dataPipe.nextIndex = 0
            :
            dataPipe.nextIndex = currentIndex + 1;

    } else if (dataPipe.elementClickedId === "decrement") {
        dataPipe.currentIndex === 0 ?
            dataPipe.nextIndex = elementArray.length - 1
            :
            dataPipe.nextIndex = currentIndex - 1;
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

function classAdder(dataPipe, delayTime, classToAdd, ...targetElementByClass) {
    let specificElement, elementArray;

    targetElementByClass.forEach( (target) => {
        Array.isArray(target) ?
            specificElement = document.querySelectorAll("." + target[0])[target[1]]
        :
            elementArray = Array.from(document.querySelectorAll("." + target))
    })

    if (specificElement !== undefined && !specificElement.classList.contains(classToAdd)) {
        specificElement.classList.add(classToAdd);
    } else if (elementArray !== undefined) {
        elementArray.forEach( (element) => {
            if (!element.classList.contains(classToAdd)) {
                element.classList.add(classToAdd);
            }
        });
    }

    window.setTimeout( () => {
        return dataPipe;
    }, delayTime);
}

function classToggler(dataPipe, delayTime = 0, classToToggle, ...targetElementsByClass) {

    let specificElement, elementArray;

    targetElementsByClass.forEach( (target) => {
        Array.isArray(target) ?
            (specificElement = document.querySelectorAll("." + target[0])[target[1]],
                specificElement.classList.toggle(classToToggle))
            :
            (elementArray = Array.from(document.querySelectorAll("." + target)),
                elementArray.forEach( (element) => {
                    element.classList.toggle(classToToggle);
                }))
    });

    window.setTimeout( () => {
        return dataPipe;
    }, delayTime);
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

//---// Event Listeners and Promise Chain Composition //---//

if (document.readyState === "complete") {
    document.querySelector(".navWork").addEventListener("click", () => {
        whatWasSelected(e)
        .then( classToggler(dataPipe, 0, "workDropExpanded", "workDrop") )
        .then( textToggler("+ Paintings", "- Paintings", "navWork") )
        .catch( (error) => {
            console.log(error);
        });
    });

    document.querySelector(".navAbout").addEventListener("click", () => {
        whatWasSelected(e)
        .then( classToggler(dataPipe, 0, "aboutDropExpanded", "aboutDrop") )
        .then( textToggler("+ Information", "- Information", "navAbout") )
        .catch( (error) => {
            console.log(error);
        });
    });

    Array.from(document.querySelectorAll(".dropDownItem")).forEach( (selection) => {
        selection.addEventListener("click", () => {
            whatWasSelected(e)
            .then( getAJAXContent(dataPipe) )
            .then( findCurrentElementOfClass(dataPipe, "dropDownItem", "dropDownItemHighlighted") )
            .then( findNextThumbnailIndex(dataPipe, "dropDownItem") )
            .then( classToggler(dataPipe, 0, "dropDownItemHighlight", ["dropDownItem", dataPipe.currentIndex]) )
            .catch( (dataPipe, error) => {
                if (dataPipe.currentIndex === undefined) {
                    return dataPipe;
                } else {
                    return error;
                }
            })
            .then( classAdder(dataPipe, 0, "dropDownItemHighlight", ["dropDownItem", dataPipe.nextIndex]) )
            .then( classAdder(dataPipe, 0, "leftLandingCollapsed", "leftLanding") )
            .then( classAdder(dataPipe, 0, "leftBorderCollapsed", "leftBorder") )
            .then( classAdder(dataPipe, 0, "pageTitleCollapsed", "pageTitle") )
            .then( classAdder(dataPipe, 0, "rightLandingExpanded", "rightLanding") )
            .then( classAdder(dataPipe, 0, "heroBorderDivExpanded", "heroBorderDiv") )
            .catch( (error) => {
                console.log(error);
            })
            .then( loadAJAXContent(dataPipe, response, "heroBorderDiv") )
            .then( classToggler(dataPipe, 800, "contentVisible", "galleryWrapper") );
        });
    });
}

if (document.querySelectorAll(".galleryNavButtons") !== undefined && document.querySelectorAll(".galleryNavButtons") !== null) {
    Array.from(document.querySelectorAll(".galleryNavButtons")).forEach( (button) => {
        button.addEventListener("click", () => {
            whatWasSelected(e)
            .then( findCurrentElementOfClass(dataPipe, "thumbnailImg", "contentVisible") )
            .then( findNextThumbnailIndex(dataPipe, "thumbnailImg") )
            .then( classToggler(dataPipe, 800, "contentVisible", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.currentIndex]) )
            .then( changeAttribute(dataPipe, "src",
                ("robertSchweizerArtResources/images/" + document.querySelectorAll(".thumbnailImg")[dataPipe.nextIndex].id + ".jpg"),
                "fullSizedImg") )
            .then( changeAttribute(dataPipe, "srcset",
                ("robertSchweizerArtResources/images/" + document.querySelectorAll(".thumbnailImg")[dataPipe.nextIndex].id + "SMALL.jpg"),
                "fullSizedImgSmall") )
            .then( changeAttribute(dataPipe, "alt", document.querySelectorAll(".thumbnailImg")[dataPipe.nextIndex].alt, "fullSizedImg", "fullSizedImgSmall"))
            .then( classToggler(dataPipe, 800, "contentVisible", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.nextIndex]) )
            .catch( (error) => { console.log(error); } )
        });
    });
}

if (document.querySelectorAll(".thumbnailImg") !== undefined && document.querySelectorAll(".thumbnailImg") !== null) {
    Array.from(document.querySelectorAll(".thumbnailImg")).forEach( (thumbnail) => {
        thumbnail.addEventListener("click", () => {
            whatWasSelected(e)
            .then( findCurrentElementOfClass(dataPipe, "thumbnailImg", "contentVisible") )
            .then( findNextThumbnailIndex(dataPipe, "thumbnailImg") )
            .then( classToggler(dataPipe, 800, "contentVisible", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.currentIndex]) )
            .then( changeAttribute(dataPipe, "src",
                ("robertSchweizerArtResources/images/" + dataPipe.elementClickedId + ".jpg"),
                "fullSizedImg") )
            .then( changeAttribute(dataPipe, "srcset",
                ("robertSchweizerArtResources/images/" + dataPipe.elementClickedId + "SMALL.jpg"),
                "fullSizedImgSmall") )
            .then( changeAttribute(dataPipe, "alt", dataPipe.elementClickedAlt, "fullSizedImg", "fullSizedImgSmall") )
            .then( classToggler(dataPipe, 800, "contentVisible", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.nextIndex]) )
            .catch( (error) => { console.log(error); } )
        });
    });
}

if (document.querySelector(".fullSizedImg") !== undefined && document.querySelector(".fullSizedImg") !== null) {
    document.querySelector(".fullSizedImg").addEventListener("click", () => {
        fullScreenImg("fullSizedImg");
    }, false);

    document.querySelector(".fullSizedImg").addEventListener("touchstart", () => {
        whatWasSelected(e)
        .then( mobileSwipeControl(dataPipe, "fullSizedImg") )
        .then( findCurrentElementOfClass(dataPipe, "thumbnailImg", "contentVisible") )
        .then( findNextThumbnailIndex(dataPipe, "thumbnailImg") )
        .then( classToggler(dataPipe, 800, "contentVisible", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.currentIndex]) )
        .then( changeAttribute(dataPipe, "src",
            ("robertSchweizerArtResources/images/" + dataPipe.elementClickedId + ".jpg"),
            "fullSizedImg") )
        .then( changeAttribute(dataPipe, "srcset",
            ("robertSchweizerArtResources/images/" + dataPipe.elementClickedId + "SMALL.jpg"),
            "fullSizedImgSmall") )
        .then( changeAttribute(dataPipe, "alt", dataPipe.elementClickedAlt, "fullSizedImg", "fullSizedImgSmall") )
        .then( classToggler(dataPipe, 800, "contentVisible", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.nextIndex]) )
        .catch( (error) => { console.log(error); } )
    });
} else if (document.querySelector(".fullSizedImgSmall") !== undefined || document.querySelector(".fullSizedImgSmall") !== null) {
    document.querySelector(".fullSizedImgSmall").addEventListener("click", () => {
        fullScreenImg("fullSizedImgSmall");
    }, false);

    document.querySelector(".fullSizedImgSmall").addEventListener("touchstart", () => {
        whatWasSelected(e)
        .then( mobileSwipeControl(dataPipe, "fullSizedImgSmall") )
        .then( findCurrentElementOfClass(dataPipe, "thumbnailImg", "contentVisible") )
        .then( findNextThumbnailIndex(dataPipe, "thumbnailImg") )
        .then( classToggler(dataPipe, 800, "contentVisible", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.currentIndex]) )
        .then( changeAttribute(dataPipe, "src",
            ("robertSchweizerArtResources/images/" + dataPipe.elementClickedId + ".jpg"),
            "fullSizedImg") )
        .then( changeAttribute(dataPipe, "srcset",
            ("robertSchweizerArtResources/images/" + dataPipe.elementClickedId + "SMALL.jpg"),
            "fullSizedImgSmall") )
        .then( changeAttribute(dataPipe, "alt", dataPipe.elementClickedAlt, "fullSizedImg", "fullSizedImgSmall") )
        .then( classToggler(dataPipe, 800, "contentVisible", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.nextIndex]) )
        .catch( (error) => { console.log(error); } )
    });
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

