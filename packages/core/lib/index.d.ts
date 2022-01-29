declare const TagIdSymbol: unique symbol;
declare type TagIdValue = string;
declare type TagId = Branded<TagIdValue, typeof TagIdSymbol>;
declare type Name = string;
declare type HexColorCode = string;
declare type Tag = {
    name: Name;
    color: HexColorCode;
};
declare const buildTagId: (value: TagIdValue) => TagId;

export { Tag, TagId, buildTagId };
