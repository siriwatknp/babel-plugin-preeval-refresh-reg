import type * as babelTypes from '@babel/core';

export default function reactRefreshSig({ types: t }: typeof babelTypes): babelTypes.PluginObj {
  return {
    visitor: {
      AssignmentExpression(nodePath) {
        const parentPath = nodePath.parentPath;
        if (
          t.isCallExpression(parentPath.node) &&
          t.isMemberExpression(parentPath.node.callee) &&
          t.isIdentifier(parentPath.node.callee.property, { name: 'forwardRef' })
        ) {
          if (
            t.isIdentifier(nodePath.node.left) &&
            nodePath.node.left.name.startsWith('_') &&
            t.isCallExpression(nodePath.node.right)
          ) {
            nodePath.replaceWith(nodePath.node.right);
          }
        }
      },
    },
  };
}
