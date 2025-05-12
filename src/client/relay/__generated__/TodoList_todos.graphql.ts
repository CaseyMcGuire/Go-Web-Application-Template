/**
 * @generated SignedSource<<1924b6a6ac2c6756aa0cefa88934a158>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TodoList_todos$data = {
  readonly todos: ReadonlyArray<{
    readonly complete: boolean;
    readonly id: string;
    readonly text: string;
  }>;
  readonly " $fragmentType": "TodoList_todos";
};
export type TodoList_todos$key = {
  readonly " $data"?: TodoList_todos$data;
  readonly " $fragmentSpreads": FragmentRefs<"TodoList_todos">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoList_todos",
  "selections": [
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
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "86f32f16475206baa9d08a498b542d53";

export default node;
