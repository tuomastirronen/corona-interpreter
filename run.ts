import { Lexer } from './lexer'
import { Parser } from './parser'
import { Interpreter } from './interpreter'

let lexer = new Lexer('(INCOME_STATEMENT[5, CURRENT] + INCOME_STATEMENT[11, CURRENT]) / INCOME_STATEMENT[5, PREVIOUS]')
let tokens = lexer.tokenize()

console.log(tokens)

let parser = new Parser(tokens)
let ast = parser.parse()

console.log(ast)

let interpreter = new Interpreter(ast)
let result = interpreter.interpret()

console.log(result)