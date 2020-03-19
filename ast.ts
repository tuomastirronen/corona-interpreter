import { Token } from './token';

export declare type Node = ConstantNode | BinOpNode | UnaryOpNode

export class FunctionNode {
  token: Token
  parameters: ConstantNode[]

  constructor(token: Token, parameters: ConstantNode[]) {
    this.token = token
    this.parameters = parameters
  }
}

export class ConstantNode {
  token: Token

  constructor(token: Token) {
    this.token = token
  }
}

export class BinOpNode {
  opToken: Token
  left: Node
  right: Node

  constructor(opToken: Token, left: Node, right: Node) {
    this.opToken = opToken
    this.left = left
    this.right = right
  }
}

export class UnaryOpNode {
  opToken: Token
  node: Node

  constructor(opToken: Token, node: Node) {
    this.opToken = opToken
    this.node = node
  }
}
