function makeFriendsList(friends) {
  let ul = document.createElement('ul');

  friends.forEach((item) => {
    let li = document.createElement('li');
    li.textContent = `${item.firstName} ${item.lastName}`;
    ul.append(li);
  });

  return ul;
}
