/**
 * @fileoverview Enforce that styled components use callback notation for styles
 * (i.e., `styled(Component)((props) => ({ ... }))`, not `styled(Component)({ ... })` or template literals).
 */

const enforceStyledCallbackRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Ensure all styled components use the callback notation for styles (no plain objects or tagged template strings).',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: null,
    schema: [],
    messages: {
      missingCallback: 'Styled component must use callback notation for styles.',
    },
  },

  create(context) {
    /**
     * Climb down nested calls for cases like `styled(Component)(...)`.
     * Returns the base callee node (Identifier or MemberExpression).
     */
    function getBaseCallee(node) {
      let current = node;
      while (current && current.type === 'CallExpression') {
        current = current.callee;
      }
      return current;
    }

    /**
     * Check if the given node (Identifier or MemberExpression) is referencing `styled`
     */
    function isStyledCall(baseCallee) {
      return (
        (baseCallee.type === 'Identifier' && baseCallee.name === 'styled') ||
        (baseCallee.type === 'MemberExpression' && baseCallee.object && baseCallee.object.name === 'styled')
      );
    }

    return {
      VariableDeclarator(node) {
        const { init } = node;
        if (!init) return;

        // --- 1. Handle the CallExpression form ---
        // e.g.,  styled(Component)( (props) => ({ ... }) )
        if (init.type === 'CallExpression') {
          const baseCallee = getBaseCallee(init);
          if (!isStyledCall(baseCallee)) return;

          const { arguments: outerArgs } = init;
          if (outerArgs.length === 0) return; // No arguments? Just bail.

          // The last argument is presumably the style definition
          const lastArg = outerArgs[outerArgs.length - 1];

          // We want to ensure it's a function (ArrowFunction or FunctionExpression).
          if (lastArg.type !== 'ArrowFunctionExpression' && lastArg.type !== 'FunctionExpression') {
            context.report({
              node,
              messageId: 'missingCallback',
            });
          }
        }

        // --- 2. Handle the TaggedTemplateExpression form ---
        // e.g.,  styled(Component)` color: red; `
        else if (init.type === 'TaggedTemplateExpression') {
          const { tag } = init;
          // The "tag" might itself be a CallExpression (like styled(Component)),
          // so climb down to find the base, then check if that base is "styled".
          let baseTag = tag;
          while (baseTag && baseTag.type === 'CallExpression') {
            baseTag = baseTag.callee;
          }

          if (!baseTag) return;

          if (isStyledCall(baseTag)) {
            // If we've gotten here, it means the user is using a tagged template
            // e.g., styled(Component)`...`
            // So report an error: "use callback notation instead."
            context.report({
              node,
              messageId: 'missingCallback',
            });
          }
        }
      },
    };
  },
};

export default enforceStyledCallbackRule;
