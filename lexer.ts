import { Token, TokenType } from './token'

const WHITESPACE = [' ', '\t', '\n']
const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y']
const FUNCTIONS = ['LOOKUP', 'AVG', 'IF']

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
      if (WHITESPACE.indexOf(this.currentChar) > -1) {
        this.next()
      } else if (DIGITS.indexOf(this.currentChar) > -1) {
        tokens.push(this.number())
      } else if (LETTERS.indexOf(this.currentChar) > -1) {
        tokens.push(this.string())
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
      } else if (this.currentChar == '|') {
        tokens.push(new Token(TokenType.OR))
        this.next()
      } else if (this.currentChar == '&') {
        tokens.push(new Token(TokenType.AND))
        this.next()
      } else if (this.currentChar == '(') {
        tokens.push(new Token(TokenType.LPAREN))
        this.next()
      } else if (this.currentChar == ')') {
        tokens.push(new Token(TokenType.RPAREN))
        this.next()
      } else if (this.currentChar == ',') {
        tokens.push(new Token(TokenType.COMMA))
        this.next()
      } else if (this.currentChar == '=') {
        tokens.push(new Token(TokenType.EQ))
        this.next()
      } else if (this.currentChar == '<') {
        tokens.push(new Token(TokenType.LT))
        this.next()
      } else if (this.currentChar == '>') {
        tokens.push(new Token(TokenType.GT))
        this.next()
      } else {
        throw new Error(`Illegal character: ${this.currentChar}`)
      }
    }
    return tokens
  }

  string(): Token {
    let str = ''

    while (this.currentChar != null && [...LETTERS, '_'].indexOf(this.currentChar) > -1) {
      str += this.currentChar
      this.next()
    }
    if (FUNCTIONS.indexOf(str) > -1) {
      return new Token(TokenType.FUNC, str)
    }
    return new Token(TokenType.CONST, str)
  }

  number(): Token {
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
