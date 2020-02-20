import React from 'react';

const TreeListContext = React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  TreeListContext.displayName = 'TreeViewContext';
}

TreeListContext.displayName = 'TreeListContext';

export default TreeListContext;
