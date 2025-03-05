/**
 * @fileoverview Disallow inline usage of the style prop.
 * Prefer using styled components or referencing a declared style object.
 */

// There's a lot of duplication across these rules. Should consolidate this at some point.

const noInlineStylePropRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow inline usage of the style prop in JSX',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: null,
    schema: [],
    messages: {
      noInlineStyle: 'Inline style prop is not allowed. Prefer styled components or reference a declared style object.',
    },
  },

  create(context) {
    return {
      JSXAttribute(node) {
        // 1) Only care about attributes named "style".
        if (node.name.name !== 'style') {
          return;
        }

        // 2) If the attribute is style="string" or no value, skip.
        if (!node.value || node.value.type !== 'JSXExpressionContainer') {
          return;
        }

        // 3) If style is an expression container, check if it's an inline object/array.
        const expression = node.value.expression;

        // Typically you'd only see object for style,
        // but let's include array for completeness.
        if (expression.type === 'ObjectExpression' || expression.type === 'ArrayExpression') {
          context.report({
            node,
            messageId: 'noInlineStyle',
          });
        }

        // If it's referencing a variable or function (style={someVar}), that's allowed.
      },
    };
  },
};

export default noInlineStylePropRule;
