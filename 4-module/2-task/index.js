function makeDiagonalRed(table) {
  let index = 0;
  let redTable = Array.from(table.rows).map((item) => {
      item.cells[index].style.backgroundColor = 'red';
    index++;
  });
  return redTable;
}
