import React, { ReactChildren, ReactNode, RefObject, useEffect, useState } from 'react';

interface EditableProps {
  text:string
  type:string
  placeholder:string
  [x:string]: any; //对付...props
}

export default function InlineEdit(props: EditableProps) : React.ReactElement {
  const { text,type,placeholder,children } = props
  const [isEditing, setEditing] = useState(false)

  useEffect(() => {
    if (children && children.current && isEditing === true) {
      children.current.focus()
    }
  }, [isEditing, children])

  const handleKeyDown = (event: { key: any; }, type: string) => {
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey];
    if (
      (type === "textarea" && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      setEditing(false);
    }
  };

  return (
    <div {...props}>
      {isEditing ? (
        <div
          onBlur={ () =>
            {
              // console.log("onblur status")
              //哎 有bug
              setEditing(false)
            }
          }
          onKeyDown={e => handleKeyDown(e, type)} >
          {children}
        </div>
      ) : (
        <div
          className={``}
          onClick={() => setEditing(true)}
        >
          <span className={""}>
            {text || placeholder || "编辑内容"}
          </span>
        </div>
      )}
    </div>
  );
}

