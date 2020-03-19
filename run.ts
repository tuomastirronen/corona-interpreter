import { Lexer } from './lexer'
import { Parser } from './parser'
import { Interpreter } from './interpreter'

let formulas = [
  '400 + 20',
  'LOOKUP(A, 3999, CURRENT)',
  'LOOKUP(A, 3999, PREVIOUS)',
  'AVG(LOOKUP(A, 3999, CURRENT), LOOKUP(A, 3999, PREVIOUS)',
  `IF(AVG(LOOKUP(A, 3999, CURRENT), LOOKUP(A, 3999, PREVIOUS)) > LOOKUP(A, 3999, PREVIOUS), (LOOKUP(A, 3999, CURRENT) - LOOKUP(A, 3999, PREVIOUS)) / LOOKUP(A, 3999, PREVIOUS), 1) * 100`,
  `IF(1 > 2 & 0 < 2, 1, 0)`
]

for (let formula of formulas) {
  let lexer = new Lexer(formula)
  let tokens = lexer.tokenize()

  let parser = new Parser(tokens)
  let ast = parser.parse()

  let interpreter = new Interpreter(ast)
  let result = interpreter.interpret()

  console.log(`${formula}: ${result}`)
}
