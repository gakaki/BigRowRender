import React, { useRef, useState } from 'react';
import InlineEdit from './Editable';

export type Cells = {
  [key: string]: any
  // [index:string] : any
}
export  interface Row {
  id:string
  cells:Cells
}

export interface Column {
  id:string
  name: string
  type: "TEXT" | "DATETIME" | "CHECKBOX"
  fixed?: 'left' | 'right'
  width?: number
  // dataIndex?: string
  // key?: keyof ValueType
  // align?: "right" | "left" | "center" | "justify" | "char"
  // format?: (val: any) => React.ReactElement
  // render?: (row: ValueType, idx: number) => React.ReactElement
  // columns?: ColumnType<ValueType>[]
  // rowSpan?: number
  // colSpan?: number
  // filter?: () => React.ReactElement
}

export  interface ColumnViewProps<T> {
  row:Row
  column: Column
}
export default function ColumnView <T>(props: ColumnViewProps<T>): React.ReactElement {
  const { row,column} = props
  const [content, setContent] = useState((row.cells as Cells)[column.id])

  const VText     = <>
    <InlineEdit
      text={content}
      placeholder="修改内容"
      type="input"
      >
      <input
        type="text"
        className=""
        value={content}
        onChange={e => {
          let editValue = e.target.value as string
          (row.cells as Cells)[column.id] = editValue
          setContent(editValue)
        }}
      />
    </InlineEdit>
  </>
  const VDateTime = <> { content }</>

  const VCheckBox = <> { <input onChange={()=>{}} type="checkbox" checked={ content } />}</>

  // if(column.type == "CHECKBOX"){
  //   console.log(cell);
  // }
  const Views = {
    "TEXT":VText,
    "DATETIME":VDateTime,
    "CHECKBOX":VCheckBox
  }
  return column.type && Views[column.type]
}
