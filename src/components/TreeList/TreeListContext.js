import React from 'react';

const TreeListContext = React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  TreeListContext.displayName = 'TreeViewContext';
}

export default TreeListContext;
