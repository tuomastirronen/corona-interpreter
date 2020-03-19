export enum TokenType {
  CONST = 'CONST',
  FUNC = 'FUNC',
  PLUS = 'PLUS',
  MINUS = 'MINUS',
  MUL = 'MUL',
  DIV = 'DIV',
  AND = 'AND',
  OR = 'OR',
  LPAREN = 'LPAREN',
  RPAREN = 'RPAREN',
  COMMA = 'COMMA',
  EQ = 'EQ',
  LT = 'LT',
  GT = 'GT',
}

export class Token {
  type: TokenType
  value: any

  constructor(type: TokenType, value?: any) {
    this.type = type
    this.value = value
  }
}
