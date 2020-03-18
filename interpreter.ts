import { Node, ConstantNode, BinOpNode, UnaryOpNode, DataNode } from './ast'
import { data } from './data'
import { TokenType } from './token'

export class Interpreter {
  ast: Node
  fiscalYear: any
  year: number
  month: number

  constructor(ast: Node, fiscalYear: any, year?: number, month?: number) {
    this.ast = ast
    this.fiscalYear = fiscalYear
    this.year = year
    this.month = month
  }

  interpret() {
    return this.eval(this.ast)
  }

  eval(node: Node) {
    if (node instanceof DataNode) {
      return data[node.source][node.key][node.period]
    } else if (node instanceof ConstantNode) {
      return node.token.value
    } else if (node instanceof BinOpNode) {
      switch (node.opToken.type) {
        case TokenType.PLUS:
          return this.eval(node.left) + this.eval(node.right)
        case TokenType.MINUS:
          return this.eval(node.left) - this.eval(node.right)
        case TokenType.MUL:
          return this.eval(node.left) * this.eval(node.right)
        case TokenType.DIV:
          return this.eval(node.left) / this.eval(node.right)
        default:
          throw new Error('Runtime error')
      }
    } else if (node instanceof UnaryOpNode) {
      switch (node.opToken.type) {
        case TokenType.PLUS:
          return this.eval(node)
        case TokenType.MINUS:
          return -1 * this.eval(node)
        default:
          throw new Error('Runtime error')
      }
    }
  }
}
