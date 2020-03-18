export enum TokenType {
  VAR = 'VAR',
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
  name: string

  constructor(type: TokenType, value?: any, name?: string) {
    this.type = type
    this.value = value
    this.name = name
  }
}
