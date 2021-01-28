"use strict";

function save() {
	console.log("SAVE: ", document.getElementById("opacity_speed").value, document.getElementById("size_speed").value)
	chrome.storage.sync.set({
		enabled: document.getElementById("enabled").checked,
		url: document.getElementById("url").value,
		opacitySpeed: document.getElementById("opacity_speed").value,
		sizeSpeed: document.getElementById("size_speed").value
	}, function() {
		document.getElementById("submit").value = "Saved";
	});
}

function restore() {
	chrome.storage.sync.get({
		enabled: false,
		url: "",
		opacitySpeed: 80,
		sizeSpeed: 80
	}, function(items) {
		document.getElementById("enabled").checked = items.enabled;
		document.getElementById("url").value = items.url;
		document.getElementById("opacity_speed").value = items.opacitySpeed,
		document.getElementById("size_speed").value = items.sizeSpeed
	});
}

function changed() {
	document.getElementById("submit").value = "Save";
}

function enter(e) {
	if (e.keyCode === 13) {
		e.preventDefault();
		save();
	}
}

document.addEventListener("DOMContentLoaded", restore);
document.getElementById("submit").addEventListener("click", save);
document.getElementById("enabled").addEventListener("click", changed);
document.getElementById("url").addEventListener("input", changed);
document.getElementById("url").addEventListener("keydown", enter);
document.getElementById("opacity_speed").addEventListener("input", changed);
document.getElementById("size_speed").addEventListener("input", changed);
