"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleArray = exports.getRandomIntInRange = void 0;
const lodash_1 = require("lodash");
exports.getRandomIntInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
/** Durstenfeld shuffle */
exports.shuffleArray = (array) => {
    const copyArray = lodash_1.cloneDeep(array);
    for (let i = copyArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
    }
    return copyArray;
};
//# sourceMappingURL=shuffle-array.js.map