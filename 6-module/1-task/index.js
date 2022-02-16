/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #rows = [];
  #parentElement = document.createElement('table');

  constructor(rows) {
    this.#rows = rows;
    this.#render();
  }

  #render() {
    this.#parentElement.innerHTML = this.#template();
    this.#parentElement.addEventListener('click', this.#removeTr);
  }

  #removeTr = (event) => {
    event.target.closest('tr').remove();
  }

  #template() {
    return `
    <table>
          <thead>
              <tr>
                  <th>Имя</th>
                  <th>Возраст</th>
                  <th>Зарплата</th>
                  <th>Город</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              ${
              this.#rows.map((item) => `
                   ${console.log(item)}
                  <tr>
                  <td>${item.name}</td>
                  <td>${item.age}</td>
                  <td>${item.salary}</td>
                  <td>${item.city}</td>
                  <td><button>X</button></td>
              </tr>`
              )}
          </tbody>
          </table>
      `;
  }

  get elem() {
    return this.#parentElement;
  }

}
