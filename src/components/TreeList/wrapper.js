import React from 'react'

export const wrap = useRedux => (props, Component) => {
  const {
    item
  } = props;
  const children = item.children;
  let key = null;
  let renderDummy = false;
  if(useRedux) {
    // if this function called - redux cheked that the children exists, so its key is the item itself
    // renderDummy should be provided by redux connect
    key = props.item;
    
  } else {
    if(children && children.length > 0 && !children[0].id) { 
      renderDummy = true; //so this function wont be called when the item is a string (and not redux)
    }
    key = item.id;
  }
  const newprops = {...props, renderDummy}
  return (
    <Component {...newprops} nodeId={key} key={key}/>
  )
}