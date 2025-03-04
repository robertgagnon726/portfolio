/**
 * @fileoverview Enforce that styled components begin with "Styled"
 */

const enforceStyledPrefixRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensure all styled component variables start with "Styled".',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: null,
    schema: [],
    messages: {
      missingPrefix: 'Styled component variable should start with "Styled".',
    },
  },

  create(context) {
    // Walk all the way down if the callee is nested call expressions (like styled(Backdrop)(...))
    function getBaseCallee(callNode) {
      let current = callNode;
      while (current && current.type === 'CallExpression') {
        current = current.callee;
      }
      return current;
    }

    return {
      VariableDeclarator(node) {
        const { init } = node;
        // If it's not a CallExpression, then it's definitely not a styled call.
        if (!init || init.type !== 'CallExpression') return;

        // Climb through any nested calls to get the underlying callee.
        const baseCallee = getBaseCallee(init);

        // Check if it's actually `styled` or `styled.something`.
        if (
          (baseCallee.type === 'Identifier' && baseCallee.name === 'styled') ||
          (baseCallee.type === 'MemberExpression' && baseCallee.object.name === 'styled')
        ) {
          const varName = node.id.name;
          if (!varName.startsWith('Styled')) {
            context.report({
              node,
              messageId: 'missingPrefix',
            });
          }
        }
      },
    };
  },
};

export default enforceStyledPrefixRule;
