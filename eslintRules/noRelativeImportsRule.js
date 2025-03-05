/**
 * @fileoverview Disallow all relative imports. Forces aliases for local modules.
 */

const noRelativeImportsRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow all relative imports.',
      category: 'Stylistic Issues',
      recommended: false,
    },
    messages: {
      noRelative: 'Relative imports are not allowed. Use an alias instead.',
    },
    schema: [],
  },

  create(context) {
    /**
     * Check if a string import path starts with "./" or "../".
     */
    function isRelativePath(path) {
      // This regex: matches any import path starting with ./ or ../
      //  ^ means start of string
      //  \.{1,2} means "." or ".."
      //  \/ means "/"
      // So it catches "./something", "../something", "../../something", etc.
      return /^\.{1,2}\//.test(path);
    }

    // Helper: if the node's `source` is present and starts with a dot, report it
    function checkSourceAndReport(node) {
      if (node.source && node.source.value && isRelativePath(node.source.value)) {
        context.report({
          node,
          messageId: 'noRelative',
        });
      }
    }

    return {
      // import something from './foo';
      ImportDeclaration(node) {
        checkSourceAndReport(node);
      },

      // export { stuff } from './foo';
      ExportNamedDeclaration(node) {
        checkSourceAndReport(node);
      },

      // export * from '../foo';
      ExportAllDeclaration(node) {
        checkSourceAndReport(node);
      },
    };
  },
};

export default noRelativeImportsRule;
