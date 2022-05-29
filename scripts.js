const barAmounts = document.querySelectorAll('.bar-amount');
const barAmountTexts = document.querySelectorAll('.bar-amount-text');
const days = document.querySelectorAll('.day');

// Date
const daysArr = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const today = new Date().getDay();

// JSON
const loadJson = async () => {
  const response = await fetch('./data.json');

  if(response.status !== 200) {
    throw new Error('Could not fetch data!');
  }

  const data = await response.json();

  return data;
};

loadJson()
  .then(data => {
    for(let i = 0; i < data.length; i++) {
      barAmounts[i].style.height = `${data[i].amount * 0.135}rem`;
      if(daysArr[today] === data[i].day) {
        barAmounts[i].classList.add('today');
      }

      barAmountTexts[i].innerHTML = `$${data[i].amount}`;
      days[i].innerHTML = data[i].day;
    }
  })
  .catch(err => console.log('Rejected:', err.message));

// Events
for(let i = 0; i < barAmountTexts.length; i++) {
  barAmounts[i].addEventListener('mouseenter', () => {
    barAmountTexts[i].classList.add('show');
  });

  barAmounts[i].addEventListener('mouseleave', () => {
    barAmountTexts[i].classList.remove('show');
  });
}