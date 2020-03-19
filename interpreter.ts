import { Node, ConstantNode, BinOpNode, UnaryOpNode, FunctionNode } from './ast'
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
    if (node instanceof FunctionNode) {
      return this.call(node)
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
        case TokenType.LT:
          return this.eval(node.left) < this.eval(node.right)
        case TokenType.GT:
          return this.eval(node.left) > this.eval(node.right)
        case TokenType.EQ:
          return this.eval(node.left) == this.eval(node.right)
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

  call(node: FunctionNode) {
    switch (node.token.value) {
      case 'IF':
        return this.if(node)
      case 'AVG':
        return this.avg(node)
      case 'LOOKUP':
        return this.lookup(node)
      default:
        return 0
    }
  }

  if(node: FunctionNode) {
    let expression = this.eval(node.parameters[0])
    if (expression) {
      return this.eval(node.parameters[1])
    }
    return this.eval(node.parameters[2])
  }

  avg(node: FunctionNode) {
    let sum = 0
    for (let parameter of node.parameters) {
      sum += this.eval(parameter)
    }
    return sum / node.parameters.length
  }

  lookup(node: FunctionNode) {
    let source = this.eval(node.parameters[0])
    let key = this.eval(node.parameters[1])
    let period = this.eval(node.parameters[2])
    return data[source][key][period]
  }
}
