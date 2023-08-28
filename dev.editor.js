/**
 * [DevEditor description]
 * @package	DevEditor v1.0.0
 * @author	Harshal Khairnar
 * @link	https://harshalkhairnar.com/
 * Copyright 2023 HitraA Technologies
 * Licensed under MIT
 * 
 * @param {NodeElement|class|id} selector
 * @param {object} settings
 * 
 */
"use strict";
function DevEditor(selector, settings) {
	let selectors = [];
	let autoInit = true;

	this.__proto__.AllowTabs = true;
	this.__proto__.AutoIndent = true;

	if ('object' === typeof selector && selector.nodeType) {
		if (selector instanceof NodeList) {
			selectors = Array.from(selector);
		} else {
			selectors.push(selector);
		}
	} else if ('string' === typeof selector) {
		let tempSelector = document.querySelectorAll(selector);
		if (tempSelector.length) {
			selectors = Array.from(tempSelector);
		}
	}

	function isBool(element) {
		return 'boolean' === typeof element;
	}

	if ('object' === typeof settings) {
		if (undefined !== settings.AutoInit) {
			if (isBool(settings.AutoInit)) {
				autoInit = settings.AutoInit;
			} else {
				throw new TypeError('AutoInit setting accepts boolean type only');
			}
		}

		if (undefined !== settings.AllowTabs) {
			if (isBool(settings.AllowTabs)) {
				this.AllowTabs = settings.AllowTabs;
			} else {
				throw new TypeError('AllowTabs setting accepts boolean type only');
			}
		}

		if (undefined !== settings.AutoIndent) {
			if (isBool(settings.AutoIndent)) {
				this.AutoIndent = settings.AutoIndent;
			} else {
				throw new TypeError('AutoIndent setting accepts boolean type only');
			}
		}
	}

	const listener = (event, element) => {
		element ??= event.target;

		if (element.type !== 'textarea') {
			throw new TypeError('Element must be textarea');
		}

		const KEY = event.key;
		const KEYCODE = event.keyCode;
		const value = element.value;
		// get caret position/selection
		const start = element.selectionStart;
		const end = element.selectionEnd;

		let tabCount = 0;
		let spaceCount = 0;

		if (this.AllowTabs && (KEY === 'Tab' || KEYCODE === 9)) { // tab was pressed
			// set textarea value to: text before caret + tab + text after caret
			element.value = `${value.substring(0, start)}\t${value.substring(end)}`;

			// put caret at right position again (add one for the tab)
			element.selectionStart = element.selectionEnd = start + 1;

			// prevent the focus lose
			event.preventDefault();
		} else if (this.AutoIndent && (KEY === 'Enter' || KEYCODE === 13)) { // enter was pressed
			// Find the start and end indices of the current line
			let lineStart = value.lastIndexOf("\n", start - 1) + 1;
			let lineEnd = value.indexOf("\n", start);

			// Handle cases where the cursor is at the beginning or end of the line
			if (lineStart === -1) {
				lineStart = 0;
			}
			if (lineEnd === -1) {
				lineEnd = value.length;
			}

			// Extract the line at the cursor position
			line = value.substring(lineStart, lineEnd);

			// Count the number of subsequent tabs at the beginning of the line
			for (let i = 0; i < line.length; i++) {
				if (line[i] === '\t') {
					tabCount++;
				} else {
					break;
				}
			}

			// Count the number of subsequent spaces at the beginning of the line
			for (let i = 0; i < line.length; i++) {
				if (line[i] === ' ') {
					spaceCount++;
				} else {
					break;
				}
			}

			if (tabCount > 0 || spaceCount > 0) {
				let tabChar;
				let charCount;
				if (tabCount > 0) {
					charCount = tabCount;
					tabChar = ''.padStart(tabCount, '\t');
				} else if (spaceCount > 0) {
					charCount = spaceCount;
					tabChar = ''.padStart(spaceCount);
				}

				// set textarea value to: text before caret + newline + tabChar + text after caret
				element.value = `${value.substring(0, start)}\n${tabChar}${value.substring(end)}`;

				// put caret at right position again (add one for the tab)
				element.selectionStart = element.selectionEnd = start + charCount + 1;
				event.preventDefault();
			}
		}
	}

	this.__proto__.start = function() {
			selectors.forEach(element => {
				element.addEventListener('keydown', listener);
				element.DevEditor = this;
			});
		},

		this.__proto__.stop = function() {
			selectors.forEach(element => {
				element.removeEventListener('keydown', listener);
			});
		};

	if (autoInit) {
		this.start();
	}

	this.version = '1.0.0';
}