import { Token, TokenType } from './token';
import { Node, BinOpNode, ConstantNode, UnaryOpNode, FunctionNode } from './ast';

export class Parser {
  tokens: Token[]
  position: number
  currentToken: Token

  constructor(tokens: Token[]) {
    this.tokens = tokens
    this.position = -1
    this.currentToken = null
    this.next()
  }

  next() {
    this.position += 1
    if (this.position < this.tokens.length) {
      this.currentToken = this.tokens[this.position]
    }
  }

  parse(): Node {
    return this.expr()
  }

  factor(): Node {
    let token = this.currentToken
    if ([TokenType.PLUS, TokenType.MINUS].indexOf(token.type) > -1) {
      this.next()
      let factor = this.factor()
      return new UnaryOpNode(token, factor)
    } else if ([TokenType.CONST].indexOf(token.type) > -1) {
      this.next()
      return new ConstantNode(token)
    } else if ([TokenType.FUNC].indexOf(token.type) > -1) {
      return this.func(token)
    } else if (token.type == TokenType.LPAREN) {
      this.next()
      let expr = this.expr()
      if (this.currentToken.type == TokenType.RPAREN) {
        this.next()
        return expr
      } else {
        throw new Error(`Syntax error. Expected ${TokenType.RPAREN}, got ${this.currentToken.type}`)
      }
    } else {
      throw new Error(`Syntax error. Expected ${[TokenType.PLUS, TokenType.MINUS, TokenType.FUNC, TokenType.CONST, TokenType.LPAREN]}, got ${this.currentToken.type}`)
    }
  }

  term(): Node {
    let left = this.factor()

    while ([TokenType.MUL, TokenType.DIV, TokenType.LT, TokenType.GT, TokenType.EQ].indexOf(this.currentToken.type) > -1) {
      let opToken = this.currentToken
      this.next()
      let right = this.factor()
      left = new BinOpNode(opToken, left, right)
    }

    return left
  }

  expr(): Node {
    let left = this.term()

    while ([TokenType.PLUS, TokenType.MINUS].indexOf(this.currentToken.type) > -1) {
      let opToken = this.currentToken
      this.next()
      let right = this.term()
      left = new BinOpNode(opToken, left, right)
    }

    return left
  }

  func(functionToken: Token): Node {
    this.next()
    let parameters = this.parameters()
    return new FunctionNode(functionToken, parameters)
  }

  parameters(): ConstantNode[] {
    let parameters = []
    this.next()

    while ([TokenType.CONST, TokenType.FUNC, TokenType.LPAREN].indexOf(this.currentToken.type) > -1) {
      parameters.push(this.expr())
      this.next()
    }
    return parameters
  }
}
