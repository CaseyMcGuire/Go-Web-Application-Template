/**
 * @generated SignedSource<<779e2276f291518303d4bd0890a90c65>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type IndexPageQuery$variables = Record<PropertyKey, never>;
export type IndexPageQuery$data = {
  readonly todos: ReadonlyArray<{
    readonly complete: boolean;
    readonly id: string;
    readonly text: string;
  }>;
};
export type IndexPageQuery = {
  response: IndexPageQuery$data;
  variables: IndexPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Todo",
    "kind": "LinkedField",
    "name": "todos",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "text",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "complete",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "IndexPageQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "IndexPageQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a1b9e5264957fb5ce080a2052d5d7df8",
    "id": null,
    "metadata": {},
    "name": "IndexPageQuery",
    "operationKind": "query",
    "text": "query IndexPageQuery {\n  todos {\n    id\n    text\n    complete\n  }\n}\n"
  }
};
})();

(node as any).hash = "794d01e3ab8383c95cb6b05bb49ab382";

export default node;
