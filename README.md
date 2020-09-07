# TODO

    1 cell edit for second question
    2 scroll verically for third question
    3 virtual list scroll for fourth question

# Usage

    npm install
    npm run start

## other

    GenerateData.js using 3rd  package generate data

# Question
## Design a Table

1. Please render a grid. You can use fake data stored in a JSON. Please do not download a package or any other technology to help you with this grid. 
2. In the grid, you should be able to edit cell data. 
3. You should be able to scroll vertically. 
4. You should be able to render 50,000 rows of data. In order to do this, you need to be able to replicate grid virtualization. This is the hardest part of this test!

Here is some example data that you can use: 
```jsx

const rows = [
  { id: "row123", cells: { col123: "Login", col234: "Design the login flow", col345: "8/11/2020" }},
  { id: "row234", cells: { col123: "Signup", col234: "Design the signup flow", col345: "8/20/2020" }},
  { id: "row345", cells: { col123: "Homepage", col234: "Design the homepage", col345: "8/13/2020" }},
  { id: "row456", cells: { col123: "Settings", col234: "Design the settings", col345: "9/18/2020" }},
]

const columns = [
  { id: "col123", name: "标题", type: "TEXT" },
  { id: "col234", name: "描述", type: "TEXT" },
  { id: "col345", name: "日期", type: "DATETIME" },
]

```


# bug
    1 cell edit could not blur right
    2 header width calculate need - scroll bar width
    
# Research

### 1 the client column oriented stroage for the rows and clumn
    https://github.com/StanfordHCI/datavore
    Zeldus A client side column oriented DBMS.
    https://github.com/RogerNoble/zeldus
    


    https://github.com/search?l=JavaScript&q=column+oriented+&type=Repositories

    
    http://www.cs.umd.edu/~abadi/papers/abadiphd.pdf

    https://stratos.seas.harvard.edu/files/stratos/files/columnstoresfntdbs.pdf

    https://dataschool.com/data-modeling-101/row-vs-column-oriented-databases/

    https://www.kryogenix.org/code/browser/sorttable/

### 2 Use Canvas to Render the Excel 
    Vue canvas grid like
    https://segmentfault.com/a/1190000011494082

### 3 Use Canvas WebGL to Render the Excel


### 4 Deal the Virtual List for the Excel
    virtualized
    https://css-tricks.com/rendering-lists-using-react-virtualized/

### 5 add websorker all webassembly for the heavily cpu load operation or use webworker

    https://my.oschina.net/xhload3d/blog/812524


### 6 Deal the many rows sort for the Excel

    https://www.kryogenix.org/code/browser/sorttable/



### 7 Infinite Scroll and VirutalList
    
    using the interSectionObserver to observer the list
    https://juejin.im/post/6844903944297136135
    
    