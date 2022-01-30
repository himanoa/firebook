import { Result, Ok, Err } from "ts-results"
import { Tag } from "./Tag"
import { DomainError } from "../error"
import { test, run, is } from "@mizchi/test";

declare const BookmarkIdSymbol: unique symbol

type BookmarkIdValue = string

export type BookmarkId = Branded<BookmarkIdValue, typeof BookmarkIdSymbol>

type Title = string
type SiteUrl = String

export type Bookmark = {
  id: BookmarkId,
  title: Title,
  siteUrl: SiteUrl,
  tags: ReadonlyArray<Tag>
}

export const buildBookmarkId = (value: BookmarkIdValue): Result<BookmarkId, DomainError> =>  {
  if(value === "") {
    return Err({type: "DomainError", msg: "事前条件: bookmarkIdが入ってない"})
  }
  return Ok(value as BookmarkId)
}

export const buildBookmark = (value: { id: string, title: string, siteUrl: string,  tags: ReadonlyArray<Tag>}): Result<Bookmark, DomainError> => {
  try {
    new URL(value.siteUrl)
  } catch(err) {
    if(err instanceof TypeError) {
      return Err({type: "DomainError", msg: `事前条件: siteUrlがURLの構造ではない ${value.siteUrl}`})
    }
  }

  const idResult = buildBookmarkId(value.id)

  if(idResult.err) {
    return idResult
  }

  return Ok({
    id: idResult.val,
    siteUrl: value.siteUrl,
    title: value.title || value.siteUrl,
    tags: value.tags
  })
}

const isMain = require.main === module;

if (process.env.NODE_ENV === "test") {
  const validBookmark = {
    id: "adfasdfasdfh",
    siteUrl: "https://example.com",
    title: "foo",
    tags: []
  }
  test("buildBookmarkがsiteUrl起因でDomainErrorを返すこと", () => {
    const actual = buildBookmark({...validBookmark, siteUrl: "invalidUrl"})
    is(actual.err,true)
    actual.err && is(actual.val.type, "DomainError")
  });
  test("buildBookmarkがid起因でDomainErrorを返すこと", () => {
    const actual = buildBookmark({...validBookmark, id: ""})
    is(actual.err, true)
    actual.err && is(actual.val.type, "DomainError")
  });
  test("titleが空の場合、buildBookmarkの結果でtitleがurlになっていること", () => {
    const actual = buildBookmark({...validBookmark, title: ""})
    is(actual.ok, true)
    actual.ok && is(actual.val.title, validBookmark.siteUrl)
  });
  test("buildBookmarkでBookmarkが生成できること", () => {
    const actual = buildBookmark(validBookmark)
    is(actual.ok, true)
    actual.ok && is(actual.val, validBookmark)
  });
  run({ isMain });
}
