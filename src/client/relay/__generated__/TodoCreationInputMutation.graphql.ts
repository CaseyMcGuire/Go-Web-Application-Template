/**
 * @generated SignedSource<<871a3cc8a23db6140dccfd0f89c12c18>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CreateTodoInput = {
  complete?: boolean | null | undefined;
  text: string;
  userID?: string | null | undefined;
};
export type TodoCreationInputMutation$variables = {
  input?: CreateTodoInput | null | undefined;
};
export type TodoCreationInputMutation$data = {
  readonly createTodo: {
    readonly id: string;
  } | null | undefined;
};
export type TodoCreationInputMutation = {
  response: TodoCreationInputMutation$data;
  variables: TodoCreationInputMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Todo",
    "kind": "LinkedField",
    "name": "createTodo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TodoCreationInputMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TodoCreationInputMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "dda425bf072e566292725fac72858302",
    "id": null,
    "metadata": {},
    "name": "TodoCreationInputMutation",
    "operationKind": "mutation",
    "text": "mutation TodoCreationInputMutation(\n  $input: CreateTodoInput\n) {\n  createTodo(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "b1dc923bba4e9c13a127abc1131934a7";

export default node;
