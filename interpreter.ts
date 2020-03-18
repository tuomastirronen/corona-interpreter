import { Node, VariableNode, ConstantNode, BinOpNode, UnaryOpNode } from './ast'
import { variables } from './variables'
import { TokenType } from './token'

export class Interpreter {
  ast: Node

  constructor(ast: Node) {
    this.ast = ast
  }

  interpret() {
    return this.eval(this.ast)
  }

  eval(node: Node) {
    if (node instanceof VariableNode) {
      return variables[node.token.value]
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
