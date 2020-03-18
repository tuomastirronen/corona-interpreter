import { Token } from './token';

export declare type Node = VariableNode | ConstantNode | BinOpNode | UnaryOpNode

export class VariableNode {
  token: Token

  constructor(token: Token) {
    this.token = token
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
