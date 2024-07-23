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

/***/ "./src/modules/modal-style.css":
/*!*************************************!*\
  !*** ./src/modules/modal-style.css ***!
  \*************************************/
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
/* harmony import */ var _modules_modal_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal-style.css */ "./src/modules/modal-style.css");
/* harmony import */ var _modules_player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/player.js */ "./src/modules/player.js");
/* eslint-disable import/extensions */





// game controller
const gameController = () => {
    const modal = document.querySelector('#game-over');
    const desc = modal.querySelector('.game-over-desc');
    const restartBtn = modal.querySelector('#restart');
    const player1ScoreElement = document.querySelector('.player-one-score');
    const player2ScoreElement = document.querySelector('.player-two-score');

    let scoreP1 = 0;
    let scoreP2 = 0;

    // start new round
    const startNewRound = () => {
        // create players
        const p1 = (0,_modules_player_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
        const p2 = (0,_modules_player_js__WEBPACK_IMPORTED_MODULE_2__["default"])()

        const placeShips = () => {
            // place first player ships
            for (let i = 0; i < 5; i += 1) {
                for (; ;) {
                    if (p1.board.placeShip(
                        i,
                        Math.floor(Math.random() * 2),
                        Math.floor((Math.random() * 123) % 10),
                        Math.floor((Math.random() * 987) % 10),
                    )) break;
                }
            }

            // place second player ships
            for (let i = 0; i < 5; i += 1) {
                for (; ;) {
                    if (p2.board.placeShip(
                        i,
                        Math.floor(Math.random() * 2),
                        Math.floor((Math.random() * 456) % 10),
                        Math.floor((Math.random() * 654) % 10),
                    )) break;
                }
            }
        };

        // handle game over
        const showGameOver = (winner) => {
            desc.textContent = winner === 'p1' ? 'You won :)' : 'Enemy won :(';
            modal.showModal();

            winner === 'p1' ? scoreP1 += 1 : scoreP2 += 1;
            player1ScoreElement.textContent = scoreP1;
            player2ScoreElement.textContent = scoreP2;
        };

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
                if (p1.board.isGameOver()) {
                    renderBoards();
                    showGameOver('p2');
                    return;
                }
            }

            renderBoards();
        };

        // handle enemy board clicks
        const enemyBoard = document.querySelector('.right-board');
        const handleEnemyBoardClick = (event) => {
            const y = event.target.dataset.indexY;
            const x = event.target.dataset.indexX;

            // check whether cell was already attacked
            if (p2.board.getCellStatus(y, x) !== null) return;

            // execute the player shot
            if (p2.board.receiveAttack(y, x)) {
                if (p2.board.isGameOver()) {
                    enemyBoard.removeEventListener('click', handleEnemyBoardClick);
                    event.target.classList.add('hit');
                    showGameOver('p1');
                    return;
                }
            }

            // execute random PC shot
            executePcShot();
        };

        enemyBoard.addEventListener('click', handleEnemyBoardClick);

        placeShips();
        renderBoards();
    };

    // add event listener for restart button
    restartBtn.addEventListener('click', () => {
        modal.close();
        startNewRound();
    });

    startNewRound();
};

gameController();


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWpEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC1zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL21vZGFsLXN0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9leHRlbnNpb25zICovXG5pbXBvcnQgJy4vaW5kZXgtc3R5bGUuY3NzJztcbmltcG9ydCAnLi9tb2R1bGVzL21vZGFsLXN0eWxlLmNzcyc7XG5pbXBvcnQgcGxheWVyIGZyb20gJy4vbW9kdWxlcy9wbGF5ZXIuanMnO1xuXG5cbi8vIGdhbWUgY29udHJvbGxlclxuY29uc3QgZ2FtZUNvbnRyb2xsZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZS1vdmVyJyk7XG4gICAgY29uc3QgZGVzYyA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLW92ZXItZGVzYycpO1xuICAgIGNvbnN0IHJlc3RhcnRCdG4gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcjcmVzdGFydCcpO1xuICAgIGNvbnN0IHBsYXllcjFTY29yZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLW9uZS1zY29yZScpO1xuICAgIGNvbnN0IHBsYXllcjJTY29yZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXR3by1zY29yZScpO1xuXG4gICAgbGV0IHNjb3JlUDEgPSAwO1xuICAgIGxldCBzY29yZVAyID0gMDtcblxuICAgIC8vIHN0YXJ0IG5ldyByb3VuZFxuICAgIGNvbnN0IHN0YXJ0TmV3Um91bmQgPSAoKSA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSBwbGF5ZXJzXG4gICAgICAgIGNvbnN0IHAxID0gcGxheWVyKCk7XG4gICAgICAgIGNvbnN0IHAyID0gcGxheWVyKClcblxuICAgICAgICBjb25zdCBwbGFjZVNoaXBzID0gKCkgPT4ge1xuICAgICAgICAgICAgLy8gcGxhY2UgZmlyc3QgcGxheWVyIHNoaXBzXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGZvciAoOyA7KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwMS5ib2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMiksXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTIzKSAlIDEwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiA5ODcpICUgMTApLFxuICAgICAgICAgICAgICAgICAgICApKSBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHBsYWNlIHNlY29uZCBwbGF5ZXIgc2hpcHNcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgZm9yICg7IDspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAyLmJvYXJkLnBsYWNlU2hpcChcbiAgICAgICAgICAgICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiA0NTYpICUgMTApLFxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDY1NCkgJSAxMCksXG4gICAgICAgICAgICAgICAgICAgICkpIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBoYW5kbGUgZ2FtZSBvdmVyXG4gICAgICAgIGNvbnN0IHNob3dHYW1lT3ZlciA9ICh3aW5uZXIpID0+IHtcbiAgICAgICAgICAgIGRlc2MudGV4dENvbnRlbnQgPSB3aW5uZXIgPT09ICdwMScgPyAnWW91IHdvbiA6KScgOiAnRW5lbXkgd29uIDooJztcbiAgICAgICAgICAgIG1vZGFsLnNob3dNb2RhbCgpO1xuXG4gICAgICAgICAgICB3aW5uZXIgPT09ICdwMScgPyBzY29yZVAxICs9IDEgOiBzY29yZVAyICs9IDE7XG4gICAgICAgICAgICBwbGF5ZXIxU2NvcmVFbGVtZW50LnRleHRDb250ZW50ID0gc2NvcmVQMTtcbiAgICAgICAgICAgIHBsYXllcjJTY29yZUVsZW1lbnQudGV4dENvbnRlbnQgPSBzY29yZVAyO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZCcpO1xuICAgICAgICBjb25zdCByZW5kZXJCb2FyZHMgPSAoKSA9PiB7XG4gICAgICAgICAgICBib2FyZHMuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYm9hcmQgPSBlbDtcbiAgICAgICAgICAgICAgICBib2FyZC50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2JvYXJkLWNlbGwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocDEuYm9hcmQuZ2V0Q2VsbFN0YXR1cyhpLCBqKSA9PT0gJ00nKSBjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3NlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHAxLmJvYXJkLmdldENlbGxTdGF0dXMoaSwgaikgPT09ICdIJykgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwMS5ib2FyZC5nZXRHcmlkKGksIGopID09PSBudWxsKSBjZWxsLmNsYXNzTGlzdC50b2dnbGUoJ2VtcHR5Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9hcmQuYXBwZW5kKGNlbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdib2FyZC1jZWxsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAyLmJvYXJkLmdldENlbGxTdGF0dXMoaSwgaikgPT09ICdNJykgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwMi5ib2FyZC5nZXRDZWxsU3RhdHVzKGksIGopID09PSAnSCcpIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5kYXRhc2V0LmluZGV4WSA9IGAke2l9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQuaW5kZXhYID0gYCR7an1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvYXJkLmFwcGVuZChjZWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGV4ZWN1dGUgcmFuZG9tIFBDIHNob3RcbiAgICAgICAgY29uc3QgZXhlY3V0ZVBjU2hvdCA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCB5O1xuICAgICAgICAgICAgbGV0IHg7XG4gICAgICAgICAgICBmb3IgKDsgOykge1xuICAgICAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBpZiAocDEuYm9hcmQuZ2V0Q2VsbFN0YXR1cyh5LCB4KSA9PT0gbnVsbCkgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocDEuYm9hcmQucmVjZWl2ZUF0dGFjayh5LCB4KSkge1xuICAgICAgICAgICAgICAgIGlmIChwMS5ib2FyZC5pc0dhbWVPdmVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyQm9hcmRzKCk7XG4gICAgICAgICAgICAgICAgICAgIHNob3dHYW1lT3ZlcigncDInKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVuZGVyQm9hcmRzKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gaGFuZGxlIGVuZW15IGJvYXJkIGNsaWNrc1xuICAgICAgICBjb25zdCBlbmVteUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZ2h0LWJvYXJkJyk7XG4gICAgICAgIGNvbnN0IGhhbmRsZUVuZW15Qm9hcmRDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmluZGV4WTtcbiAgICAgICAgICAgIGNvbnN0IHggPSBldmVudC50YXJnZXQuZGF0YXNldC5pbmRleFg7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIHdoZXRoZXIgY2VsbCB3YXMgYWxyZWFkeSBhdHRhY2tlZFxuICAgICAgICAgICAgaWYgKHAyLmJvYXJkLmdldENlbGxTdGF0dXMoeSwgeCkgIT09IG51bGwpIHJldHVybjtcblxuICAgICAgICAgICAgLy8gZXhlY3V0ZSB0aGUgcGxheWVyIHNob3RcbiAgICAgICAgICAgIGlmIChwMi5ib2FyZC5yZWNlaXZlQXR0YWNrKHksIHgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHAyLmJvYXJkLmlzR2FtZU92ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICBlbmVteUJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlRW5lbXlCb2FyZENsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICAgICAgICAgICAgICBzaG93R2FtZU92ZXIoJ3AxJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGV4ZWN1dGUgcmFuZG9tIFBDIHNob3RcbiAgICAgICAgICAgIGV4ZWN1dGVQY1Nob3QoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBlbmVteUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlRW5lbXlCb2FyZENsaWNrKTtcblxuICAgICAgICBwbGFjZVNoaXBzKCk7XG4gICAgICAgIHJlbmRlckJvYXJkcygpO1xuICAgIH07XG5cbiAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXIgZm9yIHJlc3RhcnQgYnV0dG9uXG4gICAgcmVzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbW9kYWwuY2xvc2UoKTtcbiAgICAgICAgc3RhcnROZXdSb3VuZCgpO1xuICAgIH0pO1xuXG4gICAgc3RhcnROZXdSb3VuZCgpO1xufTtcblxuZ2FtZUNvbnRyb2xsZXIoKTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9leHRlbnNpb25zICovXG5pbXBvcnQgc2hpcCBmcm9tICcuL3NoaXAuanMnO1xuXG5jb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XG4gICAgbGV0IGdyaWQgPSBbXTtcblxuICAgIC8vIGNyZWF0ZSBncmlkXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSArPSAxKSB7XG4gICAgICAgIGdyaWRbeV0gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCArPSAxKSB7XG4gICAgICAgICAgICBncmlkW3ldW3hdID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNoaXBzID0gW107XG4gICAgY29uc3QgcGxhY2VkU2hpcHMgPSBbbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbF07XG4gICAgY29uc3QgcmVjZWl2ZWRTaG90cyA9IFsuLi5ncmlkXTtcblxuICAgIC8vIGNyZWF0ZSBzaGlwc1xuICAgIHNoaXBzLnB1c2goc2hpcCg1KSk7XG4gICAgc2hpcHMucHVzaChzaGlwKDQpKTtcbiAgICBzaGlwcy5wdXNoKHNoaXAoMykpO1xuICAgIHNoaXBzLnB1c2goc2hpcCgzKSk7XG4gICAgc2hpcHMucHVzaChzaGlwKDIpKTtcblxuICAgIC8vIHBsYWNlIHNoaXBzIG9uIHRoZSBncmlkXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXBJbmRleCwgYXhpcywgeSwgeCkgPT4ge1xuICAgICAgICBpZiAoc2hpcEluZGV4ID4gNCB8fCBzaGlwSW5kZXggPCAwKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChwbGFjZWRTaGlwc1tzaGlwSW5kZXhdID09PSB0cnVlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgY29uc3QgZ3JpZENvcHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGdyaWQpKTtcbiAgICAgICAgbGV0IHNoaXBMZW5ndGggPSBzaGlwc1tzaGlwSW5kZXhdLmxlbmd0aCgpO1xuXG4gICAgICAgIHNoaXBMZW5ndGggLT0gMTtcbiAgICAgICAgaWYgKGF4aXMgPT09IDApIHtcbiAgICAgICAgICAgIHdoaWxlIChzaGlwTGVuZ3RoICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGlmICh4ICsgc2hpcExlbmd0aCA+IDkgfHwgZ3JpZFt5XVt4ICsgc2hpcExlbmd0aF0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBncmlkQ29weVt5XVt4ICsgc2hpcExlbmd0aF0gPSBzaGlwSW5kZXg7XG4gICAgICAgICAgICAgICAgc2hpcExlbmd0aCAtPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2hpbGUgKHNoaXBMZW5ndGggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKHkgKyBzaGlwTGVuZ3RoID4gOSB8fCBncmlkW3kgKyBzaGlwTGVuZ3RoXVt4XSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGdyaWRDb3B5W3kgKyBzaGlwTGVuZ3RoXVt4XSA9IHNoaXBJbmRleDtcbiAgICAgICAgICAgICAgICBzaGlwTGVuZ3RoIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcGxhY2VkU2hpcHNbc2hpcEluZGV4XSA9IHRydWU7XG4gICAgICAgIGdyaWQgPSBncmlkQ29weTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIC8vIGNoZWNrIHdoZXRoZXIgZ2FtZSBpcyBvdmVyXG4gICAgY29uc3QgaXNHYW1lT3ZlciA9IChzaGlwQXJyYXkpID0+IHtcbiAgICAgICAgaWYgKHNoaXBBcnJheSkge1xuICAgICAgICAgICAgcmV0dXJuICFzaGlwQXJyYXkuZmlsdGVyKChlbCkgPT4gZWwuaXNTdW5rKCkgPT09IGZhbHNlKS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICFzaGlwcy5maWx0ZXIoKGVsKSA9PiBlbC5pc1N1bmsoKSA9PT0gZmFsc2UpLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgLy8gY2hlY2sgd2hldGhlciBzaGlwIGlzIHN1bmtcbiAgICBjb25zdCBpc1NoaXBTdW5rID0gKHNoaXBFbGVtZW50KSA9PiBzaGlwc1tzaGlwRWxlbWVudF0uaXNTdW5rKCk7XG5cbiAgICAvLyByZWdpc3RlciBhdHRhY2tzXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh5LCB4KSA9PiB7XG4gICAgICAgIGlmIChyZWNlaXZlZFNob3RzW3ldW3hdID09PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoZ3JpZFt5XVt4XSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNoaXBJbmRleCA9IGdyaWRbeV1beF07XG4gICAgICAgICAgICAgICAgc2hpcHNbc2hpcEluZGV4XS5oaXQoKTtcbiAgICAgICAgICAgICAgICByZWNlaXZlZFNob3RzW3ldW3hdID0gJ0gnO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWNlaXZlZFNob3RzW3ldW3hdID0gJ00nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRHcmlkID0gKHksIHgpID0+IHtcbiAgICAgICAgaWYgKHkgPT09IHVuZGVmaW5lZCB8fCB4ID09PSB1bmRlZmluZWQpIHJldHVybiBncmlkO1xuICAgICAgICByZXR1cm4gZ3JpZFt5XVt4XTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0Q2VsbFN0YXR1cyA9ICh5LCB4KSA9PiByZWNlaXZlZFNob3RzW3ldW3hdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0R3JpZCxcbiAgICAgICAgZ2V0Q2VsbFN0YXR1cyxcbiAgICAgICAgcGxhY2VTaGlwLFxuICAgICAgICByZWNlaXZlQXR0YWNrLFxuICAgICAgICBpc1NoaXBTdW5rLFxuICAgICAgICBpc0dhbWVPdmVyLFxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvZXh0ZW5zaW9ucyAqL1xuaW1wb3J0IGdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZC5qcyc7XG5cbmNvbnN0IHBsYXllciA9IChfdHlwZSkgPT4ge1xuICAgIGNvbnN0IHR5cGUgPSBfdHlwZTtcbiAgICBjb25zdCBib2FyZCA9IGdhbWVib2FyZCgpO1xuXG4gICAgY29uc3QgcGxheWVyVHlwZSA9ICgpID0+IHR5cGU7XG5cbiAgICByZXR1cm4geyBwbGF5ZXJUeXBlLCBib2FyZCB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyO1xuIiwiY29uc3Qgc2hpcCA9IChsZW4pID0+IHtcbiAgICBjb25zdCBzaGlwTGVuZ3RoID0gbGVuO1xuICAgIGxldCBoaXRDb3VudCA9IDA7XG5cbiAgICBjb25zdCBsZW5ndGggPSAoKSA9PiBzaGlwTGVuZ3RoO1xuXG4gICAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgICAgICBoaXRDb3VudCArPSAxO1xuICAgICAgICByZXR1cm4gaGl0Q291bnQ7XG4gICAgfTtcblxuICAgIGNvbnN0IGlzU3VuayA9ICgpID0+IGhpdENvdW50ID09PSBzaGlwTGVuZ3RoO1xuXG4gICAgcmV0dXJuIHsgbGVuZ3RoLCBoaXQsIGlzU3VuayB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImluZGV4XCI6IDAsXG5cdFwic3R5bGVzXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2JhdHRsZXNoaXBcIl0gPSBzZWxmW1wid2VicGFja0NodW5rYmF0dGxlc2hpcFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wic3R5bGVzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=