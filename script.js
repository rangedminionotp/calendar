const week = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const todayG = [-1, -1, -1];

const monthlyPics = [
  'https://media.discordapp.net/attachments/368534832197664769/1057327577875882044/january.jpeg',
  'https://bridgesnurseryschool.com/wp-content/uploads/2019/02/screen-shot-2018-01-25-at-9-54-10-am-1516892078-1.png',
  'https://media.discordapp.net/attachments/368534832197664769/1057328258506555452/march.jpg',
  'https://media.discordapp.net/attachments/368534832197664769/1057328904655868005/april.jpg',
  'https://media.discordapp.net/attachments/368534832197664769/1057331200454312066/may.jpg',
  'https://media.discordapp.net/attachments/368534832197664769/1057331791964422265/june.jpg',
  'https://media.discordapp.net/attachments/368534832197664769/1057333189447786556/july.jpg',
  'https://media.discordapp.net/attachments/368534832197664769/1057337565868466258/august.png',
  'https://media.discordapp.net/attachments/368534832197664769/1057341620770586714/september.jpg',
  'https://media.discordapp.net/attachments/368534832197664769/1057341905089872012/october.jpg',
  'https://media.discordapp.net/attachments/368534832197664769/1057344026220703794/november.jpg',
  'https://media.discordapp.net/attachments/368534832197664769/1057344654720368741/december.jpg'
];

window.addEventListener('DOMContentLoaded', function(e) {
  const picker = new Picker('picker');
  var values = picker.setCurrentDate();
  document.getElementById('prev').addEventListener('click', function(e) {
    values = picker.arrowPrev(values);
  });
  document.getElementById('next').addEventListener('click', function(e) {
    values = picker.arrowNext(values);
  });
  document.getElementById('display').addEventListener('click', function(e) {
    picker.clearToday(values);
    values = picker.setTodayDate(values);
  });
  // https://bobbyhadz.com/blog/javascript-addeventlistener-queryselectorall#:~:text=To%20add%20an%20event%20listener,each%20element%20in%20the%20collection.
  // how to add event listener to every element with same class
  const allDays = document.querySelectorAll('.currDay, .nextMonth, .prevMonth');
  allDays.forEach(day => {
    day.addEventListener('click', function(e) {
      if (day.className == 'currDay') {
        values = picker.currDayChange(e.target, values);
      } else if (day.className == 'prevMonth') {
        values = picker.prevGreyClick(e.target, values);
      } else if (day.className == 'nextMonth') {
        values = picker.nextGreyClick(e.target, values);
      }
    });
  });
});

/**
 * CSE186 Assignment 3 - Advanced
 */
class Picker {
  /**
   * Create a date picker
   * @param {string} containerId id of a node the Picker will be a child of
  */
  constructor(containerId) {
    this.containerId = containerId;
    // append picker to something...
    // create weekday column
    for (let i = 0; i < 7; i++) {
      const element = document.createElement('div');
      const weekday = document.createTextNode(week[i]);
      element.appendChild(weekday);
      element.setAttribute('id', 'w' + i);
      document.getElementById('weekdays').appendChild(element);
    }
    for (let i = 0; i < 42; i++) {
      // place day div inside of a weekly row thing
      const element = document.createElement('div');
      const manyDay = document.createTextNode('day');
      element.appendChild(manyDay);
      element.setAttribute('id', 'd' + i);
      // element.classList.add('none');
      document.getElementById('days').appendChild(element);
    }
  }
  /**
   * set date function, like the calender page
   * with prevMonth, currMonth, nextMonth
   * @param {string} dd date
   * @param {string} mm month
   * @param {string} yyyy year
   * @param {number} today index location of today
   * @return {string} return dd, mm, yyyy, today, flag
  */
  setDate(dd, mm, yyyy, today) {
    // modify display
    // this.clearToday(today);
    document.getElementById('currentMonth').innerText = month[mm];
    document.getElementById('currentYear').innerText = yyyy;
    // https://bobbyhadz.com/blog/javascript-get-number-of-days-in-month
    // how to get number of days in month
    const curMMdays = new Date(yyyy, mm+1, 0).getDate();
    // https://bobbyhadz.com/blog/javascript-get-first-day-of-month#:~:text=To%20get%20the%20first%20day,first%20day%20of%20the%20month.
    const firstDay = new Date(yyyy, mm, 1).getDay();
    // https://bobbyhadz.com/blog/javascript-get-last-day-of-month
    // const lastDay = new Date(yyyy, mm+1, 0).getDay();
    // var lastDay = new Date(yyyy, mm+1, 0);
    const lastIndex = curMMdays+firstDay;
    // mm = 1
    // last month = 12
    // next month = 2
    const lastMMdays = new Date(yyyy, mm, 0).getDate();
    // const nextMMdays = new Date(yyyy, mm+2, 0).getDate();
    // set current month days
    let j = 1;
    // document.write(dd, mm, yyyy, today, flag);
    for (let i = firstDay; i < lastIndex; i++) {
      const element = document.getElementById('d'+i);
      element.innerText = j;
      // element.classList.remove('currDay', 'prevMonth', 'nextMonth');
      element.className = 'currDay';
      if (j == todayG[0] && mm == todayG[1] && yyyy == todayG[2]) {
        element.id = 'today';
        today = i;
      }
      j++;
    }
    // set next month days (grey)
    j = 1;
    for (let i = lastIndex; i < 42; i++) {
      const element = document.getElementById('d'+i);
      element.innerText = j;
      // element.classList.remove('currDay', 'prevMonth', 'nextMonth');
      // element.classList.add('nextMonth');
      element.className = 'nextMonth';
      j++;
    }
    // set last month days (grey)
    j = 0;
    for (let i = firstDay-1; i >= 0; i--) {
      const element = document.getElementById('d'+i);
      element.innerText = lastMMdays-j;
      // element.classList.remove('currDay', 'prevMonth', 'nextMonth');
      // element.className.add('prevMonth');
      element.className = 'prevMonth';
      j++;
    }
    const bgPicker = document.getElementById('picker');
    bgPicker.style.backgroundImage = `url('${monthlyPics[mm]}')`;
    return [dd, mm, yyyy, today];
  }
  /**
   *
   * @return {string} return dd, mm, yyyy, today, flag
   */
  setCurrentDate() {
    // https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    // how to get current date
    const curr = new Date();
    const dd = curr.getDate();
    const mm = curr.getMonth();
    const yyyy = curr.getFullYear();
    todayG[0] = dd;
    todayG[1] = mm;
    todayG[2] = yyyy;
    const values = this.setDate(dd, mm, yyyy, -1);
    return values;
  }

  /**
   *
   * @param {string} values dd, mm, yyyy, today, flag
   */
  clearToday(values) {
    const element = document.getElementById('today');
    if (element) {
      element.id = 'd'+values[3];
    }
  }

  /**
   *
   * @param {string} values dd, mm, yyyy, today, flag
   * @return {string} dd, mm, yyyy, today, flag
   */
  arrowPrev(values) {
    // document.write(values[0] , values[1] , values[2]);
    if (values[1] == 0) {
      values[2]--;
      values[1] = 12;
    }
    this.clearToday(values);
    const value = this.setDate(values[0], values[1]-1, values[2], values[3]);
    return value;
  }

  /**
   *
   * @param {string} values dd, mm, yyyy, today, flag
   * @return {string} dd, mm, yyyy, today, flag
   */
  arrowNext(values) {
    if (values[1] == 11) {
      values[2]++;
      values[1] = -1;
    }
    this.clearToday(values);
    const value = this.setDate(values[0], values[1]+1, values[2], values[3]);
    return value;
  }

  /**
   *
   * @param {element} prev event element
   * @param {string} values dd, mm, yyyy, today, flag
   * @return {string} dd, mm, yyyy, today, flag
   */
  prevGreyClick(prev, values) {
    // document.write('hi');
    // document.write(prev.textContent);
    // document.write(values[0] , values[1] , values[2]);
    this.clearToday(values);
    if (values[1] == 0) {
      values[2]--;
      values[1] = 12;
    }
    values[1]--;
    const content = prev.textContent;
    todayG[0] = content;
    todayG[1] = values[1];
    todayG[2] = values[2];
    const value = this.setDate(content, values[1], values[2], values[3]);
    return value;
  }

  /**
   *
   * @param {element} next event element
   * @param {string} values dd, mm, yyyy, today, flag
   * @return {string}  dd, mm, yyyy, today, flag
   */
  nextGreyClick(next, values) {
    this.clearToday(values);
    if (values[1] == 11) {
      values[2]++;
      values[1] = -1;
    }
    values[1]++;
    const content = next.textContent;
    todayG[0] = content;
    todayG[1] = values[1];
    todayG[2] = values[2];
    const value = this.setDate(content, values[1], values[2], values[3]);
    return value;
  }

  /**
   *
   * @param {element} curr event element
   * @param {string} values dd, mm, yyyy, today, flag
   * @return {string} dd, mm, yyyy, today, flag
   */
  currDayChange(curr, values) {
    this.clearToday(values);
    const content = curr.textContent;
    todayG[0] = content;
    todayG[1] = values[1];
    todayG[2] = values[2];
    const value = this.setDate(content, values[1], values[2], values[3]);
    return value;
  }

  /**
   *
   * @param {string} values dd, mm, yyyy, today, flag
   * @return {string} dd, mm, yyyy, today, flag
   */
  setTodayDate(values) {
    this.clearToday(values);
    const value = this.setDate(todayG[0], todayG[1], todayG[2], values[3]);
    return value;
  }
}
// To satisfy linter rules
new Picker();
