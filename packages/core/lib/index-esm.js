import { test, run } from '@mizchi/test';

const buildTagId = (value) => {
    return value;
};
const isMain = require.main === module;
if (process.env.NODE_ENV === "test") {
    test("test1", () => {
    });
    run({ isMain });
}

export { buildTagId };
