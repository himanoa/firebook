'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var test = require('@mizchi/test');
var tsResults = require('ts-results');

const buildTagId = (value) => {
    return value;
};
const isMain$1 = require.main === module;
if (process.env.NODE_ENV === "test") {
    test.test("test1", () => {
    });
    test.run({ isMain: isMain$1 });
}

const buildBookmarkId = (value) => {
    if (value === "") {
        return tsResults.Err({ type: "DomainError", msg: "事前条件: bookmarkIdが入ってない" });
    }
    return tsResults.Ok(value);
};
const buildBookmark = (value) => {
    try {
        new URL(value.siteUrl);
    }
    catch (err) {
        if (err instanceof TypeError) {
            return tsResults.Err({ type: "DomainError", msg: `事前条件: siteUrlがURLの構造ではない ${value.siteUrl}` });
        }
    }
    const idResult = buildBookmarkId(value.id);
    if (idResult.err) {
        return idResult;
    }
    return tsResults.Ok({
        id: idResult.val,
        siteUrl: value.siteUrl,
        title: value.title || value.siteUrl,
        tags: value.tags
    });
};
const isMain = require.main === module;
if (process.env.NODE_ENV === "test") {
    const validBookmark = {
        id: "adfasdfasdfh",
        siteUrl: "https://example.com",
        title: "foo",
        tags: []
    };
    test.test("buildBookmarkがsiteUrl起因でDomainErrorを返すこと", () => {
        const actual = buildBookmark(Object.assign(Object.assign({}, validBookmark), { siteUrl: "invalidUrl" }));
        test.is(actual.err, true);
        actual.err && test.is(actual.val.type, "DomainError");
    });
    test.test("buildBookmarkがid起因でDomainErrorを返すこと", () => {
        const actual = buildBookmark(Object.assign(Object.assign({}, validBookmark), { id: "" }));
        test.is(actual.err, true);
        actual.err && test.is(actual.val.type, "DomainError");
    });
    test.test("titleが空の場合、buildBookmarkの結果でtitleがurlになっていること", () => {
        const actual = buildBookmark(Object.assign(Object.assign({}, validBookmark), { title: "" }));
        test.is(actual.ok, true);
        actual.ok && test.is(actual.val.title, validBookmark.siteUrl);
    });
    test.test("buildBookmarkでBookmarkが生成できること", () => {
        const actual = buildBookmark(validBookmark);
        test.is(actual.ok, true);
        actual.ok && test.is(actual.val, validBookmark);
    });
    test.run({ isMain });
}

exports.buildBookmark = buildBookmark;
exports.buildBookmarkId = buildBookmarkId;
exports.buildTagId = buildTagId;
