import { Lexer } from './lexer'
import { Parser } from './parser'
import { Interpreter } from './interpreter'

let formula = '(A[3999, CURRENT] - A[3999, PREVIOUS]) / A[3999, PREVIOUS]'

let lexer = new Lexer(formula)
let tokens = lexer.tokenize()

let parser = new Parser(tokens)
let ast = parser.parse()

let fiscalYear = { id: 1, startDate: new Date('2020-01-01'), endDate: new Date('2020-12-31') }

let interpreter = new Interpreter(ast, fiscalYear)
let result = interpreter.interpret()

console.log(result)