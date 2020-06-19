const visit = require("unist-util-visit")

const escapedReactNewline = "{'\\n'}"

module.exports = ({ markdownAST, markdownNode, ...rest }, { tag = "Code" }) => {
  const newTree = visit(markdownAST, "code", node => {
    if (node.type === "code") {
      const { lang, meta, value } = node
      // Make leading spaces and trailing newlines explicit
      // Wrap the rest of the line in a span for better styling targets
      const preContent =
        value.replace(/(^ *)(.*)$/gm, (whole, whitespace, content) => {
          // Skip lines that only contain a tag that isn't self-closing
          if (/^<[^<>]*[^\/]>$/.test(content)) return whole
          const wrappedWhitespace = whitespace ? `{'${whitespace}'}` : ""
          const wrappedContent = content ? `<span>${content}</span>` : ""
          return wrappedWhitespace + wrappedContent + escapedReactNewline
        }) + escapedReactNewline
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
