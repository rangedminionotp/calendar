window.addEventListener('DOMContentLoaded', function(e) {
  const picker = new Picker('picker');
  picker.setCurrentDate();
  document.getElementById('prev').addEventListener('click', function(e) {
    picker.arrowPrev();
  });
  document.getElementById('next').addEventListener('click', function(e) {
    picker.arrowNext();
  });
  document.getElementById('display').addEventListener('click', function(e) {
    picker.setTodayDate();
  });
  // https://bobbyhadz.com/blog/javascript-addeventlistener-queryselectorall#:~:text=To%20add%20an%20event%20listener,each%20element%20in%20the%20collection.
  // how to add event listener to every element with same class
  const allDays = document.querySelectorAll('.currDay, .nextMonth, .prevMonth');
  allDays.forEach(day => {
    day.addEventListener('click', function(e) {
      if (day.className == 'currDay') {
        picker.currDayChange(e.target);
      } else if (day.className == 'prevMonth') {
        picker.prevGreyClick(e.target);
      } else if (day.className == 'nextMonth') {
        picker.nextGreyClick(e.target);
      }
    });
  });
});

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

class Picker {
  /**
   * Create a date picker
   * @param {string} containerId id of a node the Picker will be a child of
  */
  constructor(containerId) {
    this.containerId = containerId;
    const curr = new Date();
    this.dd = curr.getDate();
    this.mm = curr.getMonth();
    this.yyyy = curr.getFullYear();
    this.todayG = [this.dd, this.mm, this.yyyy];
    this.today = -1;
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
  */
  setDate() {
    // modify display
    // this.clearToday(today);
    document.getElementById('currentMonth').innerText = month[this.mm];
    document.getElementById('currentYear').innerText = this.yyyy;
    // https://bobbyhadz.com/blog/javascript-get-number-of-days-in-month
    // how to get number of days in month
    const curMMdays = new Date(this.yyyy, this.mm+1, 0).getDate();
    // https://bobbyhadz.com/blog/javascript-get-first-day-of-month#:~:text=To%20get%20the%20first%20day,first%20day%20of%20the%20month.
    const firstDay = new Date(this.yyyy, this.mm, 1).getDay();
    // https://bobbyhadz.com/blog/javascript-get-last-day-of-month
    // const lastDay = new Date(yyyy, mm+1, 0).getDay();
    // var lastDay = new Date(yyyy, mm+1, 0);
    const lastIndex = curMMdays+firstDay;
    // mm = 1
    // last month = 12
    // next month = 2
    const lastMMdays = new Date(this.yyyy, this.mm, 0).getDate();
    // const nextMMdays = new Date(yyyy, mm+2, 0).getDate();
    // set current month days
    let j = 1;
    // document.write(dd, mm, yyyy, today, flag);
    for (let i = firstDay; i < lastIndex; i++) {
      const element = document.getElementById('d'+i);
      element.innerText = j;
      // element.classList.remove('currDay', 'prevMonth', 'nextMonth');
      element.className = 'currDay';
      if (j == this.todayG[0] && this.mm == this.todayG[1] && this.yyyy == this.todayG[2]) {
        element.id = 'today';
        this.today = i;
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
    bgPicker.style.backgroundImage = `url('${monthlyPics[this.mm]}')`;
  }
  /**
   * set date
   */
  setCurrentDate() {
    // https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    // how to get current date
    this.setDate();
  }

  /**
   *
   * clear today cell
   */
  clearToday() {
    const element = document.getElementById('today');
    if (element) {
      element.id = 'd'+this.today;
    }
  }

  /**
   * function to set month to prev month
   */
  arrowPrev() {
    if (this.mm == 0) {
      this.yyyy--;
      this.mm = 12;
    }
    this.mm--;
    this.clearToday();
    this.setDate();
  }

  /**
   * function to set month to nex month
   */
  arrowNext() {
    if (this.mm == 11) {
      this.yyyy++;
      this.mm = -1;
    }
    this.mm++;
    this.clearToday();
    this.setDate();
  }

  /**
   *
   * @param {element} prev event element
   */
  prevGreyClick(prev) {
    // document.write('hi');
    // document.write(prev.textContent);
    // document.write(values[0] , values[1] , values[2]);
    this.clearToday();
    if (this.mm == 0) {
      this.yyyy--;
      this.mm = 12;
    }
    this.mm--;
    const content = prev.textContent;
    this.todayG[0] = this.dd = content;
    this.todayG[1] = this.mm;
    this.todayG[2] = this.yyyy;
    this.setDate();
  }

  /**
   *
   * @param {element} next event element
   */
  nextGreyClick(next) {
    this.clearToday();
    if (this.mm == 11) {
      this.yyyy++;
      this.mm = -1;
    }
    this.mm++;
    const content = next.textContent;
    this.todayG[0] = this.dd = content;
    this.todayG[1] = this.mm;
    this.todayG[2] = this.yyyy;
    this.setDate();
  }

  /**
   *
   * @param {element} curr event element
   */
  currDayChange(curr) {
    this.clearToday();
    const content = curr.textContent;
    this.todayG[0] = this.dd = content;
    this.todayG[1] = this.mm;
    this.todayG[2] = this.yyyy;
    
    this.setDate();
  }

  /**
   *
   */
  setTodayDate() {
    this.clearToday();
    this.dd = this.todayG[0];
    this.mm = this.todayG[1];
    this.yyyy = this.todayG[2];
    this.setDate();
  }
}
// To satisfy linter rules
new Picker();
