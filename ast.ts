import { Token } from './token';

export declare type Node = DataNode | ConstantNode | BinOpNode | UnaryOpNode

export class DataNode {
  token: Token
  source: string
  key: number
  period: 'CURRENT' | 'YTD' | 'PREVIOUS' | 'LFY'

  constructor(token: Token) {
    this.token = token
    this.source = token.value.split('[')[0]
    let params = token.value.match(/(?<=\[)(.*?)(?=\])/)[0]

    this.key = +params.split(',')[0]
    this.period = params.split(',')[1].trim()
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
