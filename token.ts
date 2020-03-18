export enum TokenType {
  DATA = 'DATA',
  CONST = 'CONST',
  PLUS = 'PLUS',
  MINUS = 'MINUS',
  MUL = 'MUL',
  DIV = 'DIV',
  LPAREN = 'LPAREN',
  RPAREN = 'RPAREN'
}

export class Token {
  type: TokenType
  value: any

  constructor(type: TokenType, value?: any) {
    this.type = type
    this.value = value
  }
}
