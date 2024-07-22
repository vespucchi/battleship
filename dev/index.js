/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index-style.css":
/*!*****************************!*\
  !*** ./src/index-style.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-style.css */ "./src/index-style.css");
/* harmony import */ var _modules_player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/player.js */ "./src/modules/player.js");
/* harmony import */ var _modules_ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/ship.js */ "./src/modules/ship.js");
/* eslint-disable import/extensions */




// create players
const p1 = (0,_modules_player_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
const p2 = (0,_modules_player_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

p1.board.placeShip(0, 0, 0, 0);
p1.board.placeShip(4, 0, 8, 4);
p1.board.placeShip(2, 0, 5, 4);
p1.board.placeShip(1, 1, 3, 9);
p1.board.placeShip(3, 1, 2, 0);

p2.board.placeShip(0, 0, 0, 0);
p2.board.placeShip(4, 0, 8, 4);
p2.board.placeShip(2, 0, 5, 4);
p2.board.placeShip(1, 1, 3, 9);
p2.board.placeShip(3, 1, 2, 0);

const boards = document.querySelectorAll('.board');
const renderBoards = () => {
    boards.forEach((el, index) => {
        const board = el;
        board.textContent = '';
        if (index === 0) {
            for (let i = 0; i < 10; i += 1) {
                for (let j = 0; j < 10; j += 1) {
                    const cell = document.createElement('div');
                    cell.classList.add('board-cell');
                    if (p1.board.getCellStatus(i, j) === 'M') cell.classList.add('missed');
                    else if (p1.board.getCellStatus(i, j) === 'H') cell.classList.add('hit');
                    else if (p1.board.getGrid(i, j) === null) cell.classList.toggle('empty');
                    board.append(cell);
                }
            }
        } else {
            for (let i = 0; i < 10; i += 1) {
                for (let j = 0; j < 10; j += 1) {
                    const cell = document.createElement('div');
                    cell.classList.add('board-cell');
                    if (p2.board.getCellStatus(i, j) === 'M') cell.classList.add('missed');
                    else if (p2.board.getCellStatus(i, j) === 'H') cell.classList.add('hit');
                    cell.dataset.indexY = `${i}`;
                    cell.dataset.indexX = `${j}`;
                    board.append(cell);
                }
            }
        }
    });
};

// execute random PC shot
const executePcShot = () => {
    let y;
    let x;
    for (; ;) {
        y = Math.floor(Math.random() * 10);
        x = Math.floor(Math.random() * 10);
        if (p1.board.getCellStatus(y, x) === null) break;
    }
    if (p1.board.receiveAttack(y, x)) {
        const shipIndex = p1.board.getGrid(y, x);
        console.log(y, x);
        console.log(shipIndex);
        console.log(p1.board.isShipSunk(shipIndex));
        console.log(p1.board.isGameOver());
    }

    renderBoards();
};

// handle board clicks
const enemyBoard = document.querySelector('.right-board');
enemyBoard.addEventListener('click', (event) => {
    const y = event.target.dataset.indexY;
    const x = event.target.dataset.indexX;

    // check whether cell was already attacked
    if (p2.board.getCellStatus(y, x) !== null) return;

    // execute the player shot
    if (p2.board.receiveAttack(y, x)) {
        const shipIndex = p2.board.getGrid(y, x);
        console.log(shipIndex);
        console.log(p2.board.isShipSunk(shipIndex));
        console.log(p2.board.isGameOver());
    }

    // execute random PC shot
    executePcShot();
});

renderBoards();


/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/modules/ship.js");
/* eslint-disable import/extensions */


const gameboard = () => {
    let grid = [];

    // create grid
    for (let y = 0; y < 10; y += 1) {
        grid[y] = [];
        for (let x = 0; x < 10; x += 1) {
            grid[y][x] = null;
        }
    }

    const ships = [];
    const placedShips = [null, null, null, null, null];
    const receivedShots = [...grid];

    // create ships
    ships.push((0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(5));
    ships.push((0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(4));
    ships.push((0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(3));
    ships.push((0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(3));
    ships.push((0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2));

    // place ships on the grid
    const placeShip = (shipIndex, axis, y, x) => {
        if (shipIndex > 4 || shipIndex < 0) return false;
        if (placedShips[shipIndex] === true) return false;

        const gridCopy = JSON.parse(JSON.stringify(grid));
        let shipLength = ships[shipIndex].length();

        shipLength -= 1;
        if (axis === 0) {
            while (shipLength !== -1) {
                if (x + shipLength > 9 || grid[y][x + shipLength] !== null) {
                    return false;
                }
                gridCopy[y][x + shipLength] = shipIndex;
                shipLength -= 1;
            }
        } else {
            while (shipLength !== -1) {
                if (y + shipLength > 9 || grid[y + shipLength][x] !== null) {
                    return false;
                }
                gridCopy[y + shipLength][x] = shipIndex;
                shipLength -= 1;
            }
        }
        placedShips[shipIndex] = true;
        grid = gridCopy;
        return true;
    };

    // check whether game is over
    const isGameOver = (shipArray) => {
        if (shipArray) {
            return !shipArray.filter((el) => el.isSunk() === false).length;
        }
        return !ships.filter((el) => el.isSunk() === false).length;
    };

    // check whether ship is sunk
    const isShipSunk = (shipElement) => ships[shipElement].isSunk();

    // register attacks
    const receiveAttack = (y, x) => {
        if (receivedShots[y][x] === null) {
            if (grid[y][x] !== null) {
                const shipIndex = grid[y][x];
                ships[shipIndex].hit();
                receivedShots[y][x] = 'H';

                return true;
            }
            receivedShots[y][x] = 'M';
        }

        return false;
    };

    const getGrid = (y, x) => {
        if (y === undefined || x === undefined) return grid;
        return grid[y][x];
    };

    const getCellStatus = (y, x) => receivedShots[y][x];

    return {
        getGrid,
        getCellStatus,
        placeShip,
        receiveAttack,
        isShipSunk,
        isGameOver,
    };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameboard);


/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/modules/gameboard.js");
/* eslint-disable import/extensions */


const player = (_type) => {
    const type = _type;
    const board = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

    const playerType = () => type;

    return { playerType, board };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);


/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const ship = (len) => {
    const shipLength = len;
    let hitCount = 0;

    const length = () => shipLength;

    const hit = () => {
        hitCount += 1;
        return hitCount;
    };

    const isSunk = () => hitCount === shipLength;

    return { length, hit, isSunk };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ship);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"styles": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["styles"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFakRBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LXN0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9leHRlbnNpb25zICovXG5pbXBvcnQgJy4vaW5kZXgtc3R5bGUuY3NzJztcbmltcG9ydCBwbGF5ZXIgZnJvbSAnLi9tb2R1bGVzL3BsYXllci5qcyc7XG5pbXBvcnQgc2hpcCBmcm9tICcuL21vZHVsZXMvc2hpcC5qcyc7XG5cbi8vIGNyZWF0ZSBwbGF5ZXJzXG5jb25zdCBwMSA9IHBsYXllcigpO1xuY29uc3QgcDIgPSBwbGF5ZXIoKTtcblxucDEuYm9hcmQucGxhY2VTaGlwKDAsIDAsIDAsIDApO1xucDEuYm9hcmQucGxhY2VTaGlwKDQsIDAsIDgsIDQpO1xucDEuYm9hcmQucGxhY2VTaGlwKDIsIDAsIDUsIDQpO1xucDEuYm9hcmQucGxhY2VTaGlwKDEsIDEsIDMsIDkpO1xucDEuYm9hcmQucGxhY2VTaGlwKDMsIDEsIDIsIDApO1xuXG5wMi5ib2FyZC5wbGFjZVNoaXAoMCwgMCwgMCwgMCk7XG5wMi5ib2FyZC5wbGFjZVNoaXAoNCwgMCwgOCwgNCk7XG5wMi5ib2FyZC5wbGFjZVNoaXAoMiwgMCwgNSwgNCk7XG5wMi5ib2FyZC5wbGFjZVNoaXAoMSwgMSwgMywgOSk7XG5wMi5ib2FyZC5wbGFjZVNoaXAoMywgMSwgMiwgMCk7XG5cbmNvbnN0IGJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZCcpO1xuY29uc3QgcmVuZGVyQm9hcmRzID0gKCkgPT4ge1xuICAgIGJvYXJkcy5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgYm9hcmQgPSBlbDtcbiAgICAgICAgYm9hcmQudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2JvYXJkLWNlbGwnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAxLmJvYXJkLmdldENlbGxTdGF0dXMoaSwgaikgPT09ICdNJykgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocDEuYm9hcmQuZ2V0Q2VsbFN0YXR1cyhpLCBqKSA9PT0gJ0gnKSBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwMS5ib2FyZC5nZXRHcmlkKGksIGopID09PSBudWxsKSBjZWxsLmNsYXNzTGlzdC50b2dnbGUoJ2VtcHR5Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJvYXJkLmFwcGVuZChjZWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2JvYXJkLWNlbGwnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAyLmJvYXJkLmdldENlbGxTdGF0dXMoaSwgaikgPT09ICdNJykgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocDIuYm9hcmQuZ2V0Q2VsbFN0YXR1cyhpLCBqKSA9PT0gJ0gnKSBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQuaW5kZXhZID0gYCR7aX1gO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQuaW5kZXhYID0gYCR7an1gO1xuICAgICAgICAgICAgICAgICAgICBib2FyZC5hcHBlbmQoY2VsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG4vLyBleGVjdXRlIHJhbmRvbSBQQyBzaG90XG5jb25zdCBleGVjdXRlUGNTaG90ID0gKCkgPT4ge1xuICAgIGxldCB5O1xuICAgIGxldCB4O1xuICAgIGZvciAoOyA7KSB7XG4gICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIGlmIChwMS5ib2FyZC5nZXRDZWxsU3RhdHVzKHksIHgpID09PSBudWxsKSBicmVhaztcbiAgICB9XG4gICAgaWYgKHAxLmJvYXJkLnJlY2VpdmVBdHRhY2soeSwgeCkpIHtcbiAgICAgICAgY29uc3Qgc2hpcEluZGV4ID0gcDEuYm9hcmQuZ2V0R3JpZCh5LCB4KTtcbiAgICAgICAgY29uc29sZS5sb2coeSwgeCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXBJbmRleCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHAxLmJvYXJkLmlzU2hpcFN1bmsoc2hpcEluZGV4KSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHAxLmJvYXJkLmlzR2FtZU92ZXIoKSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQm9hcmRzKCk7XG59O1xuXG4vLyBoYW5kbGUgYm9hcmQgY2xpY2tzXG5jb25zdCBlbmVteUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZ2h0LWJvYXJkJyk7XG5lbmVteUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgeSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmluZGV4WTtcbiAgICBjb25zdCB4ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuaW5kZXhYO1xuXG4gICAgLy8gY2hlY2sgd2hldGhlciBjZWxsIHdhcyBhbHJlYWR5IGF0dGFja2VkXG4gICAgaWYgKHAyLmJvYXJkLmdldENlbGxTdGF0dXMoeSwgeCkgIT09IG51bGwpIHJldHVybjtcblxuICAgIC8vIGV4ZWN1dGUgdGhlIHBsYXllciBzaG90XG4gICAgaWYgKHAyLmJvYXJkLnJlY2VpdmVBdHRhY2soeSwgeCkpIHtcbiAgICAgICAgY29uc3Qgc2hpcEluZGV4ID0gcDIuYm9hcmQuZ2V0R3JpZCh5LCB4KTtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcEluZGV4KTtcbiAgICAgICAgY29uc29sZS5sb2cocDIuYm9hcmQuaXNTaGlwU3VuayhzaGlwSW5kZXgpKTtcbiAgICAgICAgY29uc29sZS5sb2cocDIuYm9hcmQuaXNHYW1lT3ZlcigpKTtcbiAgICB9XG5cbiAgICAvLyBleGVjdXRlIHJhbmRvbSBQQyBzaG90XG4gICAgZXhlY3V0ZVBjU2hvdCgpO1xufSk7XG5cbnJlbmRlckJvYXJkcygpO1xuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L2V4dGVuc2lvbnMgKi9cbmltcG9ydCBzaGlwIGZyb20gJy4vc2hpcC5qcyc7XG5cbmNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcbiAgICBsZXQgZ3JpZCA9IFtdO1xuXG4gICAgLy8gY3JlYXRlIGdyaWRcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5ICs9IDEpIHtcbiAgICAgICAgZ3JpZFt5XSA9IFtdO1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4ICs9IDEpIHtcbiAgICAgICAgICAgIGdyaWRbeV1beF0gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc2hpcHMgPSBbXTtcbiAgICBjb25zdCBwbGFjZWRTaGlwcyA9IFtudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsXTtcbiAgICBjb25zdCByZWNlaXZlZFNob3RzID0gWy4uLmdyaWRdO1xuXG4gICAgLy8gY3JlYXRlIHNoaXBzXG4gICAgc2hpcHMucHVzaChzaGlwKDUpKTtcbiAgICBzaGlwcy5wdXNoKHNoaXAoNCkpO1xuICAgIHNoaXBzLnB1c2goc2hpcCgzKSk7XG4gICAgc2hpcHMucHVzaChzaGlwKDMpKTtcbiAgICBzaGlwcy5wdXNoKHNoaXAoMikpO1xuXG4gICAgLy8gcGxhY2Ugc2hpcHMgb24gdGhlIGdyaWRcbiAgICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcEluZGV4LCBheGlzLCB5LCB4KSA9PiB7XG4gICAgICAgIGlmIChzaGlwSW5kZXggPiA0IHx8IHNoaXBJbmRleCA8IDApIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHBsYWNlZFNoaXBzW3NoaXBJbmRleF0gPT09IHRydWUpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBjb25zdCBncmlkQ29weSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZ3JpZCkpO1xuICAgICAgICBsZXQgc2hpcExlbmd0aCA9IHNoaXBzW3NoaXBJbmRleF0ubGVuZ3RoKCk7XG5cbiAgICAgICAgc2hpcExlbmd0aCAtPSAxO1xuICAgICAgICBpZiAoYXhpcyA9PT0gMCkge1xuICAgICAgICAgICAgd2hpbGUgKHNoaXBMZW5ndGggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKHggKyBzaGlwTGVuZ3RoID4gOSB8fCBncmlkW3ldW3ggKyBzaGlwTGVuZ3RoXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGdyaWRDb3B5W3ldW3ggKyBzaGlwTGVuZ3RoXSA9IHNoaXBJbmRleDtcbiAgICAgICAgICAgICAgICBzaGlwTGVuZ3RoIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aGlsZSAoc2hpcExlbmd0aCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoeSArIHNoaXBMZW5ndGggPiA5IHx8IGdyaWRbeSArIHNoaXBMZW5ndGhdW3hdICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZ3JpZENvcHlbeSArIHNoaXBMZW5ndGhdW3hdID0gc2hpcEluZGV4O1xuICAgICAgICAgICAgICAgIHNoaXBMZW5ndGggLT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwbGFjZWRTaGlwc1tzaGlwSW5kZXhdID0gdHJ1ZTtcbiAgICAgICAgZ3JpZCA9IGdyaWRDb3B5O1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLy8gY2hlY2sgd2hldGhlciBnYW1lIGlzIG92ZXJcbiAgICBjb25zdCBpc0dhbWVPdmVyID0gKHNoaXBBcnJheSkgPT4ge1xuICAgICAgICBpZiAoc2hpcEFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gIXNoaXBBcnJheS5maWx0ZXIoKGVsKSA9PiBlbC5pc1N1bmsoKSA9PT0gZmFsc2UpLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gIXNoaXBzLmZpbHRlcigoZWwpID0+IGVsLmlzU3VuaygpID09PSBmYWxzZSkubGVuZ3RoO1xuICAgIH07XG5cbiAgICAvLyBjaGVjayB3aGV0aGVyIHNoaXAgaXMgc3Vua1xuICAgIGNvbnN0IGlzU2hpcFN1bmsgPSAoc2hpcEVsZW1lbnQpID0+IHNoaXBzW3NoaXBFbGVtZW50XS5pc1N1bmsoKTtcblxuICAgIC8vIHJlZ2lzdGVyIGF0dGFja3NcbiAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHksIHgpID0+IHtcbiAgICAgICAgaWYgKHJlY2VpdmVkU2hvdHNbeV1beF0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChncmlkW3ldW3hdICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hpcEluZGV4ID0gZ3JpZFt5XVt4XTtcbiAgICAgICAgICAgICAgICBzaGlwc1tzaGlwSW5kZXhdLmhpdCgpO1xuICAgICAgICAgICAgICAgIHJlY2VpdmVkU2hvdHNbeV1beF0gPSAnSCc7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlY2VpdmVkU2hvdHNbeV1beF0gPSAnTSc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIGNvbnN0IGdldEdyaWQgPSAoeSwgeCkgPT4ge1xuICAgICAgICBpZiAoeSA9PT0gdW5kZWZpbmVkIHx8IHggPT09IHVuZGVmaW5lZCkgcmV0dXJuIGdyaWQ7XG4gICAgICAgIHJldHVybiBncmlkW3ldW3hdO1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRDZWxsU3RhdHVzID0gKHksIHgpID0+IHJlY2VpdmVkU2hvdHNbeV1beF07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRHcmlkLFxuICAgICAgICBnZXRDZWxsU3RhdHVzLFxuICAgICAgICBwbGFjZVNoaXAsXG4gICAgICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgICAgIGlzU2hpcFN1bmssXG4gICAgICAgIGlzR2FtZU92ZXIsXG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZDtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9leHRlbnNpb25zICovXG5pbXBvcnQgZ2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkLmpzJztcblxuY29uc3QgcGxheWVyID0gKF90eXBlKSA9PiB7XG4gICAgY29uc3QgdHlwZSA9IF90eXBlO1xuICAgIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkKCk7XG5cbiAgICBjb25zdCBwbGF5ZXJUeXBlID0gKCkgPT4gdHlwZTtcblxuICAgIHJldHVybiB7IHBsYXllclR5cGUsIGJvYXJkIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGF5ZXI7XG4iLCJjb25zdCBzaGlwID0gKGxlbikgPT4ge1xuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBsZW47XG4gICAgbGV0IGhpdENvdW50ID0gMDtcblxuICAgIGNvbnN0IGxlbmd0aCA9ICgpID0+IHNoaXBMZW5ndGg7XG5cbiAgICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgICAgIGhpdENvdW50ICs9IDE7XG4gICAgICAgIHJldHVybiBoaXRDb3VudDtcbiAgICB9O1xuXG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4gaGl0Q291bnQgPT09IHNoaXBMZW5ndGg7XG5cbiAgICByZXR1cm4geyBsZW5ndGgsIGhpdCwgaXNTdW5rIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiaW5kZXhcIjogMCxcblx0XCJzdHlsZXNcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rYmF0dGxlc2hpcFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtiYXR0bGVzaGlwXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJzdHlsZXNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==