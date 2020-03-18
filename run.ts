import { Lexer } from './lexer'
import { Parser } from './parser'
import { Interpreter } from './interpreter'

let lexer = new Lexer('(a / i) * b * 365')
let tokens = lexer.tokenize()

let parser = new Parser(tokens)
let ast = parser.parse()
console.log(JSON.stringify(ast, null, 2))
// console.log(ast)

let interpreter = new Interpreter(ast)

let result = interpreter.interpret()

console.log(result)