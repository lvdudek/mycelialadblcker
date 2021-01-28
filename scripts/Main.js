"use strict";

var imagePath = "/images/"
var imageName = "Mycelium_var-"

var imageExtension = ".png"

var variantCount = 3

var opacitySpeed = 50;
var sizeSpeed = 50;

var imageIndex = 0;
var sizeIndex = 0;

var sizeMult = 200;
var opacityMult = 200;

var maxSize = 5

function getImageSrc(variant, size) {
	const path = imagePath + imageName + variant + "_size-" + size + imageExtension
	return chrome.runtime.getURL(path)
}

function myceliumEVERYTHING() {
	var images = document.getElementsByTagName("img"); // GIVE ME ALL THE IMAGES ON THE PAGE
	for (var i = images.length - 1; i >= 0; i--) { // CYCLE THROUGH ALL IMAGES ON THE PAGE ONE BY ONE
		myceliumThisImage(images[i]);
	}
}

function myceliumThisImage(image) {
	var myceliumImage = image.cloneNode(true); //PICKS IMAGE AND CLONES IT
	// PICK GIF AT RANDOM AMONG 1-5 different images
	var variantIndex =  Math.floor(Math.random()* variantCount) + 1 //img index from 1 - 3
	myceliumImage.src = getImageSrc(variantIndex, 1)
	myceliumImage.style.opacity = 0
	
	image.parentNode.appendChild(myceliumImage)
	
	var margins = fitMycelium(image, myceliumImage, 0, 0)
	setTimeout(fitMycelium(image, myceliumImage, margins[0], margins[1]), 1000)

	image.classList.add("mycelium")
	myceliumImage.classList.add("mycelium")
	myceliumImage.classList.add("growMycelium")
	myceliumImage.classList.add("revealMycelium")
}

function fitMycelium(fel,sel,marginY,marginX) {
	marginY += fel.y - sel.y
	sel.style.marginTop = marginY + "px";
	marginX += fel.x - sel.x
	sel.style.marginLeft = marginX + "px";
	return [marginY, marginX]
}

function insistWithMycelium() {
	var images = document.getElementsByTagName("img"); // GIVE ME ALL THE IMAGES ON THE PAGE
	for( var i = images.length - 1; i >= 0; i--) {
		if (!images[i].classList.value.includes("mycelium")) {
			myceliumThisImage(images[i])
		}
	}
}

function getOpacityTimeout() {
	return opacitySpeed * opacityMult
}

function getSizeTimeout() {
	return sizeSpeed * sizeMult
}

function revealMycelium() {
	var mycelium = document.getElementsByClassName("revealMycelium")
	for (var i=mycelium.length - 1; i >= 0; i--) {
		mycelium[i].style.opacity = parseFloat(mycelium[i].style.opacity) + 0.1
		if (mycelium[i].style.opacity >= 1.0) {
			mycelium[i].classList.remove("revealMycelium")
		}
	}
	setTimeout(revealMycelium, getOpacityTimeout())
}

function growMycelium() {
	var mycelium = document.getElementsByClassName("growMycelium")
	for (var i=mycelium.length - 1; i >= 0; i--) {
		var parts = mycelium[i].src.split("size-")
		var currentSize = parseInt(parts[1][0]) + 1
		if (currentSize <= maxSize) {
			var newSrc = parts[0] + "size-" + currentSize + parts[1].slice(1)
			mycelium[i].src = newSrc
		} else {
			mycelium[i].classList.remove("growMycelium")
		}
	}
	setTimeout(growMycelium, getSizeTimeout())
}

chrome.storage.sync.get({
	enabled: false,
	url: "",
	opacitySpeed: 50,
	sizeSpeed: 50
}, function(items) {
	if (items.enabled) {
		opacitySpeed = (101 - items.opacitySpeed) / 10;
		sizeSpeed = 101 - items.sizeSpeed;
		setInterval(insistWithMycelium, 3000);
		setTimeout(revealMycelium, getOpacityTimeout())
		setTimeout(growMycelium, getSizeTimeout())
		myceliumEVERYTHING();
		getURL();
	}
});