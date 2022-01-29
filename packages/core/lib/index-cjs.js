'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var test = require('@mizchi/test');

const buildTagId = (value) => {
    return value;
};
const isMain = require.main === module;
if (process.env.NODE_ENV === "test") {
    test.test("test1", () => {
    });
    test.run({ isMain });
}

exports.buildTagId = buildTagId;
