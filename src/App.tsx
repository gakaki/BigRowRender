import './App.css'

import React, {
  useState, useEffect, useMemo, createContext, useContext, ChangeEvent, useRef, MouseEvent, useCallback, CSSProperties,
} from 'react';

import { ScrollList } from './ScrollList'
import type { Column } from './ColumnView'
import moment from 'moment'
import faker from 'faker'
// const rows:Row[] = [
//   { id: "row123", cells: { col123: "Login", col234: "Design the login flow", col345: "8/11/2020" }},
//   { id: "row234", cells: { col123: "Signup", col234: "Design the signup flow", col345: "8/20/2020" }},
//   { id: "row345", cells: { col123: "Homepage", col234: "Design the homepage", col345: "8/13/2020" }},
//   { id: "row456", cells: { col123: "Settings", col234: "Design the settings", col345: "9/18/2020" }},
// ]

//    { title: '姓名', dataIndex: 'name', key: 'name', fixed: 'left', width: 100 },
const columns:Column[] = [
  { id: "col123", name: "标题", type: "TEXT" ,fixed:'left' },
  { id: "col234", name: "描述", type: "TEXT" ,width:450},
  { id: "col345", name: "日期", type: "DATETIME" },
  { id: "success", name: "操作", type: "CHECKBOX" ,fixed:'right',width:100},
]



const rowCount = 50000
let rows  = Array(rowCount).fill(rowCount).map((val, idx) => {
  let id_str = `row${idx}`
  return {
    id: id_str,
    cells:{
      col123: faker.name.jobDescriptor(),
      col234: faker.lorem.sentence(4, 8),
      col345: moment(faker.date.future()).format('M/D/YYYY'),
      success: faker.random.boolean()
    }
  }
});

// console.log(rows)
function App() {

  return (
    <div className="App" >
        <h3>
          <a target="_blank" href="" >Github</a>
        </h3>
        <ScrollList
          width={600}
          height={736}
          rowHeight={40}
          rows={rows}
          columns={columns}
        />

      {/*table布局放弃*/}
      {/*<div style={{ width: '800px' , display: "none"}} >*/}
      {/*  <Table*/}
      {/*    data={data}*/}
      {/*    columns={columns}*/}
      {/*    height={30}*/}
      {/*    // scroll={{y: 400}}*/}
      {/*    // activeIndex={index}*/}
      {/*    // onRowClick={handleRowClick}*/}
      {/*  />*/}
      {/*</div>*/}

    </div>
  );
}

export default App;
