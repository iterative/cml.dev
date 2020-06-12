const visit = require("unist-util-visit")

const escapedReactNewline = "{'\\n'}"

module.exports = ({ markdownAST, markdownNode, ...rest }, { tag = "Code" }) => {
  const newTree = visit(markdownAST, "code", node => {
    if (node.type === "code") {
      const { lang, meta, value } = node
      // Make leading spaces and trailing newlines explicit
      const preContent = value
        .replace(/^ +/gm, "{'$&'}")
        .replace(/$/gm, escapedReactNewline)
                       + escapedReactNewline
      // Wrap this new content in a component
      const transformedValue = `<${tag}${
        meta ? " " + meta : ""
      } lang="${lang}">\n${preContent}\n</${tag}>`
      Object.assign(node, {
        type: "jsx",
        value: transformedValue,
      })
    }
  })
}
