import { test, run, is } from '@mizchi/test';
import { Err, Ok } from 'ts-results';

const buildTagId = (value) => {
    return value;
};
const isMain$1 = require.main === module;
if (process.env.NODE_ENV === "test") {
    test("test1", () => {
    });
    run({ isMain: isMain$1 });
}

const buildBookmarkId = (value) => {
    if (value === "") {
        return Err({ type: "DomainError", msg: "事前条件: bookmarkIdが入ってない" });
    }
    return Ok(value);
};
const buildBookmark = (value) => {
    try {
        new URL(value.siteUrl);
    }
    catch (err) {
        if (err instanceof TypeError) {
            return Err({ type: "DomainError", msg: `事前条件: siteUrlがURLの構造ではない ${value.siteUrl}` });
        }
    }
    const idResult = buildBookmarkId(value.id);
    if (idResult.err) {
        return idResult;
    }
    return Ok({
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
    test("buildBookmarkがsiteUrl起因でDomainErrorを返すこと", () => {
        const actual = buildBookmark(Object.assign(Object.assign({}, validBookmark), { siteUrl: "invalidUrl" }));
        is(actual.err, true);
        actual.err && is(actual.val.type, "DomainError");
    });
    test("buildBookmarkがid起因でDomainErrorを返すこと", () => {
        const actual = buildBookmark(Object.assign(Object.assign({}, validBookmark), { id: "" }));
        is(actual.err, true);
        actual.err && is(actual.val.type, "DomainError");
    });
    test("titleが空の場合、buildBookmarkの結果でtitleがurlになっていること", () => {
        const actual = buildBookmark(Object.assign(Object.assign({}, validBookmark), { title: "" }));
        is(actual.ok, true);
        actual.ok && is(actual.val.title, validBookmark.siteUrl);
    });
    test("buildBookmarkでBookmarkが生成できること", () => {
        const actual = buildBookmark(validBookmark);
        is(actual.ok, true);
        actual.ok && is(actual.val, validBookmark);
    });
    run({ isMain });
}

export { buildBookmark, buildBookmarkId, buildTagId };
