// Brew Haven frontend interactions
const cart = [];
const countEl = document.getElementById('count');
const totalEl = document.getElementById('total');
const toast = document.getElementById('toast');

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove('show'), 2400);
}
function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  countEl.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
  totalEl.textContent = `₹${total}`;
}

document.querySelectorAll('.add').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    const found = cart.find(item => item.name === name);
    if (found) found.qty += 1;
    else cart.push({name, price, qty: 1});
    updateCart();
    notify(`${name} added to your cart`);
  });
});

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.menu-item').forEach(card => {
      card.classList.toggle('d-none', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

document.getElementById('viewCart').addEventListener('click', () => {
  if (!cart.length) return notify('Your cart is empty. Add a drink first!');
  const lines = cart.map(item => `${item.name} × ${item.qty}`).join(', ');
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  notify(`${lines}. Total: ₹${total}`);
});

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('formNote').textContent =
    'Thanks for your message! This demo form is not connected to a server yet.';
  event.target.reset();
});
document.getElementById('year').textContent = new Date().getFullYear();
updateCart();
