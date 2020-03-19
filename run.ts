import { Lexer } from './lexer'
import { Parser } from './parser'
import { Interpreter } from './interpreter'

let formulas = [
  '400 + 20',
  'LOOKUP(A, 3999, CURRENT)',
  'LOOKUP(A, 3999, PREVIOUS)',
  'AVG(LOOKUP(A, 3999, CURRENT), LOOKUP(A, 3999, PREVIOUS)',
  'IF(AVG(LOOKUP(A, 3999, CURRENT), LOOKUP(A, 3999, PREVIOUS)) > LOOKUP(A, 3999, PREVIOUS), (LOOKUP(A, 3999, CURRENT) - LOOKUP(A, 3999, PREVIOUS)) / LOOKUP(A, 3999, PREVIOUS), 1) * 100',
]

for (let formula of formulas) {
  let lexer = new Lexer(formula)
  let tokens = lexer.tokenize()

  // console.log(tokens)

  let parser = new Parser(tokens)
  let ast = parser.parse()

  // console.log(JSON.stringify(ast, null, 2))
  let fiscalYear = { id: 1, startDate: new Date('2020-01-01'), endDate: new Date('2020-12-31') }
  let year
  let month

  let interpreter = new Interpreter(ast, fiscalYear, year, month)
  let result = interpreter.interpret()

  console.log(result)
}
