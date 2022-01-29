declare const TagIdSymbol: unique symbol

type TagIdValue = string

export type TagId = Branded<TagIdValue, typeof TagIdSymbol>

type Name = string
type HexColorCode = string

export type Tag = {
  name: Name,
  color: HexColorCode
}

export const buildTagId = (value: TagIdValue):  TagId =>  {
  return value as TagId
}

import { test, run, is, err } from "@mizchi/test";
const isMain = require.main === module;

if (process.env.NODE_ENV === "test") {
  test("test1", () => {
  });
  run({ isMain });
}
