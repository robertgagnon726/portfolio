/**
 * @fileoverview Disallow inline usage of the sx prop.
 * Prefer styled components, or if necessary, reference a declared style object.
 */

const noInlineSxPropRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow inline usage of the sx prop in JSX',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: null,
    schema: [],
    messages: {
      noInlineSx: 'Inline sx prop is not allowed. Prefer styled components or reference a declared style object.',
    },
  },

  create(context) {
    return {
      JSXAttribute(node) {
        // We only care about attributes named "sx"
        if (node.name.name !== 'sx') {
          return;
        }

        // If the attribute value is something like sx="string", or there's no value, just ignore.
        if (!node.value || node.value.type !== 'JSXExpressionContainer') {
          return;
        }

        // Now we have sx={<some expression>}. We want to disallow inline object/array.
        const expression = node.value.expression;
        if (expression.type === 'ObjectExpression' || expression.type === 'ArrayExpression') {
          // This means sx={{ ... }} or sx={[ ... ]} – report an error
          context.report({
            node,
            messageId: 'noInlineSx',
          });
        }
      },
    };
  },
};

export default noInlineSxPropRule;
