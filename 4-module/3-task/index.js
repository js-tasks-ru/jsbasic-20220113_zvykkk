function highlight(table) {
  let tbodyRows = Array.from(table.lastElementChild.rows);
  let tableNew = tbodyRows.map((item) => {
    let cells = item.cells;

    cells[3].dataset.available == 'true' ? item.classList.add('available')
          : item.classList.add('unavailable');

    if (!cells[3].dataset.available){
      item.setAttribute('hidden', true);
    }

    cells[2].textContent == 'm' ? item.classList.add('male') : item.classList.add('female');

    if(parseInt(cells[1].textContent) < 18){
      item.style.textDecoration = 'line-through';
    }

  });
  return tableNew;
}
