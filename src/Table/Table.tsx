// import React, { useEffect, useRef, useState } from 'react'
// import ColumnView, { Cells, Column, Row } from '../ColumnView'
//
// //Table暂时放弃 Descrepated
//
// interface TableProps<T> {
//   data: Row[]
//   columns: Column[]
//   height:number
//   // lineHeight?: number
//   // selectable?: boolean
//   // onSelectedChange?: Function
//   // rowKey?: (row: T) => string
//   // scroll?: Scroll
//   // onRowClick?: (row: T, index: number) => void
//   // activeIndex?: number
// }
//
// interface Scroll {
//   x?: number
//   y?: number
// }
//
//
// export function Table <T>(props: TableProps<T>): React.ReactElement {
//   const  {data ,columns,height = 30} = props
//
//   const THRESHOLD = 15
//
//   const [start, setStart] = useState(0)
//   const [end, setEnd] = useState(THRESHOLD)
//   const [observer, setObserver] = useState<IntersectionObserver|null>(null)
//   const $bottomElement = useRef()
//   const $topElement = useRef()
//
//   const updatedList = data.slice(start, end)
//   const lastIndex = updatedList.length - 1
//
//   // 渲染时，获得头尾ref
//   const getReference = (index: number, isLastIndex: boolean) => {
//     // console.log(index,isLastIndex)
//     if (index === 0)
//       return $topElement
//     if (isLastIndex)
//       return $bottomElement
//     return null
//   }
//
//   // 交叉观察的具体回调，观察每个节点，并对实时头尾元素索引处理
//   const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
//     entries.forEach((entry, index) => {
//       const listLength = data.length
//       // 向下滚动，刷新数据
//       if (entry.isIntersecting && entry.target.id === "bottom") {
//         const maxStartIndex = listLength - 1 - THRESHOLD     // 当前头部的索引
//         const maxEndIndex = listLength - 1                   // 当前尾部的索引
//         const newEnd = (end + 10) <= maxEndIndex ? end + 10 : maxEndIndex // 下一轮增加尾部
//         const newStart = (end - 5) <= maxStartIndex ? end - 5 : maxStartIndex // 在上一轮的基础上计算头部
//         setStart(newStart)
//         setEnd(newEnd)
//       }
//       // 向上滚动，刷新数据
//       if (entry.isIntersecting && entry.target.id === "top") {
//         const newEnd = end === THRESHOLD ? THRESHOLD : (end - 10 > THRESHOLD ? end - 10 : THRESHOLD) // 向上滚动尾部元素索引不得小于15
//         let newStart = start === 0 ? 0 : (start - 10 > 0 ? start - 10 : 0) // 头部元素索引最小值为0
//         setStart(newStart)
//         setEnd(newEnd)
//       }
//     })
//   }
//
//   // 停止滚动时放弃观察
//   const resetObservation = () => {
//     // @ts-ignore
//     observer && observer.unobserve($bottomElement.current)
//     // @ts-ignore
//     observer && observer.unobserve($topElement.current)
//   }
//
//
//   const intiateScrollObserver = () => {
//     const options = {
//       root: null,
//       rootMargin: '0px',
//       threshold: 0.1
//     };
//     const Observer = new IntersectionObserver(callback, options)
//     // 分别观察开头和结尾的元素
//     if ($topElement.current) {
//       // @ts-ignore
//       Observer.observe($topElement.current);
//     }
//     if ($bottomElement.current) {
//       // @ts-ignore
//       Observer.observe($bottomElement.current);
//     }
//     // 设初始值
//     setObserver(Observer)
//   }
//
//   useEffect(() => {
//     // 定义观察
//     intiateScrollObserver();
//     return () => {
//       // 放弃观察
//       resetObservation()
//     }
//   },[end]) //因为[end] 是同步刷新，这里用一个就行了。
//
//
//   return <table  className="table">
//     <thead>
//     <tr>
//       {
//         columns.map((column, index) => {
//           return (
//             <td key={column.name}>
//               {column.name}
//             </td>
//           )
//         })
//       }
//     </tr>
//     </thead>
//     <tbody>
//     {
//       data.map((row, index) => {
//
//         const top = (height * (index + start)) + 'px'
//         const refVal = getReference(index, index === lastIndex)
//         const id = index === 0 ? 'top' : (index === lastIndex ? 'bottom' : '')
//         // console.log(height,index,start,top,refVal,id)
//
//         // @ts-ignore
//         return (<tr key={row.id} id={id} ref={refVal} style={{top}}>
//           {
//             columns.map((cell, index) => {
//               return (
//                 <td className="nowrap" key={cell.id}  style={{width:cell.width}}>
//                   <ColumnView
//                     cell={(row.cells as Cells)[cell.id]}
//                     row={row}
//                     column={cell}
//                   />
//                 </td>
//               )
//             })
//           }
//         </tr>)
//       })
//     }
//     </tbody>
//   </table>
// }
