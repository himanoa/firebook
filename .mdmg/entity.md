# entity

## packages/core/src/models/{{pascal_case identify}}.ts

```typescript

declare const {{pascal_case identify}}IdSymbol: unique symbol

type {{pascal_case identify}}IdValue = unknown

export type {{pascal_case identify}}Id = Branded<{{pascal_case identify}}IdValue, {{pascal_case identify}}IdSymbol>

export type {{pascal_case identify}} = {
}

export const build{{pascal_case identify}}Id = (value: {{pascal_case identify}}IdValue):  {{pascal_case identify}}Id =>  {
  return value as {{pascal_case identify}}Id
}

import { test, run, is, err } from "@mizchi/test";
const isMain = require.main === module;

if (process.env.NODE_ENV === "test") {
  test("test1", () => {
  });
  run({ isMain });
}
```

