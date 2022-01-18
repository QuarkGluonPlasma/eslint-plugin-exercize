 module.exports = {
     meta: {
         docs: {
             description: "enforce consistent brace style for blocks"
         },

         fixable: true,
 
         messages: {
             braceError: '大括号格式不对',
             spaceError: '大括号前缺少空格'
         }
     },
 
     create(context) {
        const sourceCode = context.getSourceCode();
         return {
            BlockStatement(node) {
                const firstToken = sourceCode.getFirstToken(node);
                const beforFirstToken = sourceCode.getTokenBefore(node);

                if (firstToken.loc.start.line !== beforFirstToken.loc.start.line) {
                    context.report({
                        node,
                        loc: firstToken.loc,
                        messageId: 'braceError',
                        fix: fixer => {
                            return fixer.replaceTextRange([beforFirstToken.range[1], firstToken.range[0]], ' ');
                        }
                    });
                } else if (firstToken.loc.start.column === beforFirstToken.loc.start.column + 1){
                    context.report({
                        node,
                        loc: firstToken.loc,
                        messageId: 'spaceError',
                        fix: fixer => {
                            return fixer.replaceTextRange([beforFirstToken.range[1], firstToken.range[0]], ' ');
                        }
                    });
                }
            }
        }
    }
 };