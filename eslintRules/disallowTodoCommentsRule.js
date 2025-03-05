/**
 * @fileoverview Disallow "TODO"-style comments (TODO, FIXME, BUG, HACK, XXX, etc.).
 * Can be customized to catch additional or fewer tokens.
 */

const defaultForbidden = ['TODO'];

const disallowTodoCommentsRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow TODO-like comments (TODO, FIXME, BUG, HACK, etc.)',
      category: 'Best Practices',
      recommended: false,
    },
    schema: [
      {
        type: 'object',
        properties: {
          // patterns is an array of strings that should be forbidden
          patterns: {
            type: 'array',
            items: { type: 'string' },
            default: defaultForbidden,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      forbiddenComment: 'Comments containing "{{ matched }}" are not allowed.',
    },
  },

  create(context) {
    // Retrieve user-defined config or fall back to default
    const options = context.options[0] || {};
    const forbiddenPatterns = options.patterns || defaultForbidden;

    // Build a single regex that matches any of the forbidden keywords
    // using a case-insensitive OR pattern. E.g. /(?:TODO|FIXME|BUG)/i
    const patternRegex = new RegExp(`\\b(?:${forbiddenPatterns.join('|')})\\b`, 'i');

    return {
      Program() {
        const sourceCode = context.getSourceCode();
        const allComments = sourceCode.getAllComments();

        for (const comment of allComments) {
          const match = patternRegex.exec(comment.value);
          if (match) {
            context.report({
              node: comment,
              loc: comment.loc,
              messageId: 'forbiddenComment',
              data: {
                matched: match[0],
              },
            });
          }
        }
      },
    };
  },
};

export default disallowTodoCommentsRule;
