export default function parse(instance) {
  // for each type, a differente parser
  const parsers = {
    string: (text) => `<span class="json-string">"${text}"</span>`,
    number: (n) => `<span class="json-number">${n}</span>`,
    boolean: (b) => `<span class="json-boolean">${b}</span>`,
    undefined: () => `<span class="json-null">undefined</span>`,
    object: instance
      ? parseObject
      : () => `<span class="json-null">null</span>`,
  }
  return parsers[typeof instance](instance)
}

function makeLine(key, value, printComma) {
  if (key) {
    return `<div class="json-line"><span class="json-key">${key}</span>: ${parse(
      value,
    )}${printComma ? "," : ""}</div>`
  } else {
    // array lines don't receive the key
    return `<div class="json-line">${parse(value)}${
      printComma ? "," : ""
    }</div>`
  }
}

function checkIfLastKey(key, instance) {
  return Object.keys(instance)[Object.keys(instance).length - 1] == key
}

function parseObject(instance) {
  // stores the brackets to be printed (either [] or {}) and whether to print te key
  const [leftBracket, rightBracket, printKey] = Array.isArray(instance)
    ? ["[", "]", false]
    : ["{", "}", true]

  let line = leftBracket
  for (const [key, value] of Object.entries(instance)) {
    // figures out whether to print a comma or not
    const printComma = !checkIfLastKey(key, instance)
    // only pass key if it is to be printed
    line += makeLine(printKey && key, value, printComma)
  }
  line += rightBracket

  return line
}
