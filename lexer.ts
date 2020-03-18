import { Token, TokenType } from './token'

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const VARIABLES = ['a', 'i', 'b']

export class Lexer {
  formula: string
  position: number
  currentChar: string

  constructor(formula: string) {
    this.formula = formula
    this.position = -1
    this.currentChar = null
    this.next()
  }

  next() {
    this.position += 1
    this.currentChar = this.formula[this.position]
  }

  tokenize(): Token[] {
    let tokens: Token[] = []
    while (this.currentChar != null) {
      if (this.currentChar == ' ') {
        this.next()
      } else if ([...DIGITS].indexOf(this.currentChar) > -1) {
        tokens.push(this.constant())
      } else if ([...VARIABLES].indexOf(this.currentChar) > -1) {
        tokens.push(this.variable())
      } else if (this.currentChar == '+') {
        tokens.push(new Token(TokenType.PLUS))
        this.next()
      } else if (this.currentChar == '-') {
        tokens.push(new Token(TokenType.MINUS))
        this.next()
      } else if (this.currentChar == '*') {
        tokens.push(new Token(TokenType.MUL))
        this.next()
      } else if (this.currentChar == '/') {
        tokens.push(new Token(TokenType.DIV))
        this.next()
      } else if (this.currentChar == '(') {
        tokens.push(new Token(TokenType.LPAREN))
        this.next()
      } else if (this.currentChar == ')') {
        tokens.push(new Token(TokenType.RPAREN))
        this.next()
      } else {
        throw new Error(`Illegal character: ${this.currentChar}`)
      }
    }
    return tokens
  }

  variable(): Token {
    let name = ''
    let value = ''
    let colonCount = 0

    while (this.currentChar != null && [...VARIABLES, ...DIGITS, ':'].indexOf(this.currentChar) > -1) {
      if (colonCount > 0) {
        value += this.currentChar
      } else {
        if (this.currentChar == ':') {
          colonCount += 1
        } else {
          name += this.currentChar
        }
      }
      this.next()
    }
    return new Token(TokenType.VAR, value, name)
  }

  constant(): Token {
    let str = ''
    let dotCount = 0

    while (this.currentChar != null && [...DIGITS, '.'].indexOf(this.currentChar) > -1) {
      if (this.currentChar == '.') {
        if (dotCount < 1) {
          dotCount += 1
          str += '.'
        }
      } else {
        str += this.currentChar
      }
      this.next()
    }
    return new Token(TokenType.CONST, Number(str))
  }
}
