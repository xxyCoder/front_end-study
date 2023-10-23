/* eslint-disable eslint-plugin/require-meta-fixable */
/* eslint-disable eslint-plugin/no-unused-placeholders */
/* eslint-disable eslint-plugin/require-meta-type */
/* eslint-disable no-unused-vars */
/* eslint-disable eslint-plugin/prefer-message-ids */
/**
 * @fileoverview no var keyword
 * @author xxyCoder
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "no var keyword",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    messages: {
      "unexpected": "不能使用{{ type }}关键字"
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    console.log("context", context);
    const sourceCode = context.sourceCode;
    return {
      VariableDeclaration(node) {
        if (node.kind === "var") {
          context.report({
            node,
            data: { type: "var" },
            messageId: "unexpected",
            fix(fixer) {
              const varToken = sourceCode.getFirstToken(node, { filter: t => t.value === "var" });
              return fixer.replaceText(varToken, "let");
            }
          })
        }
      }
    };
  },
};
