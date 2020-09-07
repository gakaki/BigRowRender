import * as React from "react"
import type { Column } from './ColumnView'
import { useState, useRef, MutableRefObject, CSSProperties } from 'react';
import ColumnView, { Cells } from './ColumnView';

export interface RowRendererParams {
  index: number
  style: React.CSSProperties
}

export interface ScrollListProps {
  width:number
  height: number
  rowHeight: number
  rows: any[]
  columns:Column[]
  rowRenderer?: (params: RowRendererParams) => any
  headerRenderer?: (params: {
    // index: number
    // style: React.CSSProperties
  }) => any
}

export const ScrollList: React.FC<ScrollListProps> = (props) => {

  const [scrollTop,setScrollTop] = useState(0)   //ScrollListState

  const { width, height , rowHeight, rows, columns, rowRenderer, headerRenderer  } = props

  const columnDefaultWidth = 140

  const calculateListWidth = (column:Column[]):number => {
    let width = 0
    for(let column of columns){
      width += column.width || columnDefaultWidth
      // console.log(column.width,width);
    }
    return width
  }

  const innerScrollTotalWidth = calculateListWidth(columns)
  const containerWidth        = width || innerScrollTotalWidth - 200

  const defaultHeaderRender = () => {
    return (<></>
      // <div className="item header bg_color_mi" style={{
      //   width:containerWidth,
      //   overflowX:"scroll"
      // }}>
      //   <div style={{width:innerScrollTotalWidth}}>
      //     {
      //       columns.map((cell, index) => {
      //         return (
      //           <div key={cell.id} className={getColumnClassNames(cell,true)}  style={getColumnStyle(cell)}>
      //             {cell.name}
      //           </div>
      //         )
      //       })
      //     }
      //   </div>
      // </div>
    )
  }

  const getColumnClassNames = (column:Column):string => {
    let classes = "rowCell ";
    classes += (column.fixed == "left" || column.fixed == "right") ? "sticky":""
    return classes;
  }

  const getColumnStyle = (column:Column):CSSProperties => {
    let columnWidth = column.width || columnDefaultWidth
    let css:CSSProperties = {
      width:columnWidth
    }
    if(column.fixed == "left"){
      css["left"] = 0
    }
    if(column.fixed == "right"){
      css["right"] = 0
    }
    return css
  }

  const defaultRowRender = (params:RowRendererParams) => {
    const row = rows[params.index]
    // console.log(rows,params)
    return (
      <div data-row-id={row.id} key={row.id} style={params.style} className="item">
        {
          columns.map((cell, index) => {
            return (
              <div className={getColumnClassNames(cell)}  key={cell.id} style={getColumnStyle(cell)} >
                <ColumnView
                  row={row}
                  column={cell}
                />
              </div>
            )
          })
        }
      </div>
    );
  }

  //最后决定头部渲染方法
  const finalHeaderRender = headerRenderer ? headerRenderer : defaultHeaderRender
  const finalRowRender = rowRenderer ? rowRenderer : defaultRowRender

  let scrollingContainer =  useRef<HTMLDivElement | null>(null)

  const limit = ():number => {
    return Math.ceil(height / rowHeight)
  }

  const onScroll = (e: React.UIEvent<any>) => {
    // @ts-ignore
    if (e.target == scrollingContainer) {
      const { scrollTop } = e.target as any
      setScrollTop(scrollTop)
    }
  }

  const renderDisplayContent = () => {
    // Math.round()         四舍五入的取整
    // Math.ceil()            向上取整，如Math.cell(0.3) = 1 、又如Math.ceil(Math.random() * 10) 返回1~10
    // Math.floor()           向下取整，如Math.floor(0.3) = 0、又如Math.floor(Math.random() * 10)返回0~9

    const startIndex = Math.floor(scrollTop / rowHeight)
    const endIndex = Math.min(startIndex + limit(), rows.length - 1)

    const content = []
    for (let i = startIndex; i <= endIndex; i++) {
      content.push(
        finalRowRender({
          index: i,
          style: {
            height: rowHeight + "px",
            lineHeight: rowHeight + "px",
            left: 0,
            right: 0,
            position: "absolute",
            top: i * rowHeight
            // transform: `translate3d( 0px, 3px, 0px )`
          }
        })
      )
    }
    return content
  }


  return (
      <div className="list">
        {finalHeaderRender({})}
        <div
          style={{
            overflowX: "scroll",
            overflowY: "scroll",
            width:containerWidth,
            height
          }}
          onScroll={onScroll}
          ref={(container) => (
            // @ts-ignore
            scrollingContainer = container as HTMLDivElement
          )}
        >
            {/*header*/}
            <div className="header" style={{
              width:innerScrollTotalWidth,
              position: "sticky",
              top:0
            }}>
              {
                columns.map((cell, index) => {
                  return (
                    <div  key={cell.id} className={getColumnClassNames(cell)}  style={getColumnStyle(cell)}>
                      {cell.name}
                    </div>
                  )
                })
              }
            </div>
            {/*body*/}
            <div
              style={{
                height: rows.length * rowHeight,
                width:innerScrollTotalWidth,
                position: "relative"
              }}
            >
              {renderDisplayContent()}
            </div>
        </div>
      </div>
  )
}
