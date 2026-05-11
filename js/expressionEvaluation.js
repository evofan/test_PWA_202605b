const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

const opsByPrecedence = ["*/", "+-"];
const num = "-?\\d+\\.?\\d*";
const space = "\\s*";

const patterns = opsByPrecedence.map((ops) => {
  return new RegExp(`(${num})${space}([${ops}])${space}(${num})`);
});

function evaluate(expression) {
  for (const pattern of patterns) {
    const found = expression.match(pattern);

    if (found) {
      const [match, a, op, b] = found;
      return evaluate(
        expression.replace(match, operations[op](Number(a), Number(b)))
      );
    }
  }

  return expression;
}