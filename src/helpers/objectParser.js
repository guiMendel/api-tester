export default function parse(instance) {
  // for each type, a differente parser
  const parsers = {
    object: parseObject,
    string: (text) => `<span class="json-string">"${text}"</span>`,
    number: (n) => `<span class="json-number">${n}</span>`,
    boolean: (b) => `<span class="json-boolean">${b}</span>`,
    undefined: () => `<span class="json-null">undefined</span>`,
  }
  return parsers[typeof instance](instance)
}

function makeLine(key, value, instance) {
  if (key) {
    return `<div class="json-line"><span class="json-key">${key}</span>: ${parse(
      value,
    )}${checkIfLastKey(key, instance) ? "" : ","}</div>`
  }
  // array lines provide no keys
  else {
    return `<div class="json-line">${parse(value)}${
      checkIfLastKey(key, instance) ? "" : ","
    }</div>`
  }
}

function checkIfLastKey(key, instance) {
  return Object.keys(instance)[Object.keys(instance).length - 1] == key
}

function parseObject(instance) {
  // handles arrays
  if (Array.isArray(instance)) return parseArray(instance)

  // handles null
  if (!instance) return `<span class="json-null">null</span>`

  let json = "{"
  for (const [key, value] of Object.entries(instance)) {
    json += makeLine(key, value, instance)
  }
  json += "}"
  return json
}

function parseArray(instance) {
  let json = "["
  for (const value of instance) {
    json += makeLine(null, value, instance)
  }
  json += "]"
  return json
}
