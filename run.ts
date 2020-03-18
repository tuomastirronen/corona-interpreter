import { Lexer } from './lexer'
import { Parser } from './parser'
import { Interpreter } from './interpreter'

let lexer = new Lexer('(i:5 + a:3999 - i:11) / b:59')
let tokens = lexer.tokenize()

let parser = new Parser(tokens)
let ast = parser.parse()

let interpreter = new Interpreter(ast)
let result = interpreter.interpret()

console.log(result)