// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minValueWeight = document.querySelector('.minweight__input'); // минимальный вес
const maxValueWeight = document.querySelector('.maxweight__input'); // максимальный вес 

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

//массив приоритетов цветов
//let priority = ['фиолетовый', 'зеленый', 'розово-красный', 'желтый', 'светло-коричневый'];
let priorityJSON = `[
  {"color_weight": 1, "color": "фиолетовый"},
  {"color_weight": 2, "color": "зеленый"},
  {"color_weight": 3, "color": "розово-красный"},
  {"color_weight": 4, "color": "желтый"},
  {"color_weight": 5, "color": "светло-коричневый"}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);
let priority = JSON.parse(priorityJSON);

//одъединяем два массива, скрипт честно взять с интернета
const mergeByProperty = (arrays, property = "color") => {
  const arr = arrays.flatMap((item) => item); //делаем из всех массивов - один

  const obj = arr.reduce((acc, item) => {
    return { // делаем из массива - объект, чтобы повторения перезаписывались
      ...acc,
      [item[property]]: { ...acc[item[property]], ...item }
    };
  }, {});

  return Object.values(obj); //обратно преобразуем из объекта в массив
};

const result1 = mergeByProperty([fruits, priority]);
console.log(result1);
fruits = result1;
console.log(fruits);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = null; 

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    
    // пока сделаем через дивы

    //Индекс фрукта
    fruitsDivIndex = document.createElement('div');
    fruitsDivIndex.className = 'fruit__info';
    fruitsDivIndex.textContent = 'index # ' + i;

    //Название фрукта
    fruitsDivKind = document.createElement('div');
    fruitsDivKind.className = 'fruit__info';
    fruitsDivKind.textContent = 'kind: ' + fruits[i].kind;

    //Цвет по русски
    fruitsDivColor = document.createElement('div');
    fruitsDivColor.className = 'fruit__info';
    fruitsDivColor.textContent = 'color: ' + fruits[i].color;

    //Вес фрукта
    fruitsDivWeight = document.createElement('div');
    fruitsDivWeight.className = 'fruit__info';
    fruitsDivWeight.textContent = 'weight (кг): ' + fruits[i].weight;
    
    //Собираем карточку фрукта
    fruitsDivMain = document.createElement('div');
    fruitsDivMain.className = 'fruit__info';
    fruitsDivMain.appendChild(fruitsDivIndex);
    fruitsDivMain.appendChild(fruitsDivKind);
    fruitsDivMain.appendChild(fruitsDivColor);
    fruitsDivMain.appendChild(fruitsDivWeight);

    
    newElementLi = document.createElement('li');

    //Поиск цвета рамки по русскому названию
    //Надо добавяить два класса
    switch(fruits[i].color) {
     
      case 'фиолетовый': 
        newElementLi.className = 'fruit__item fruit_violet'; 
      break
      case 'зеленый': 
        newElementLi.className = 'fruit__item fruit_green'; 
      break
      case 'розово-красный': 
        newElementLi.className = 'fruit__item fruit_carmazin'; 
      break
      case 'желтый': 
        newElementLi.className = 'fruit__item fruit_yellow'; 
      break
      case 'светло-коричневый': 
        newElementLi.className = 'fruit__item fruit_lightbrown'; 
      break
      
    } 
    newElementLi.innerHTML = fruitsDivMain.innerHTML;
    fruitsList.appendChild(newElementLi); 
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  arrayOldFruits = Array.from(fruits);

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    indexFruits = getRandomInt(0,fruits.length - 1);// случайный ключ. т нуля до длина-1
    result.push(fruits[indexFruits]);//вставляем элемент из fruits в result
    fruits.splice(indexFruits, 1,);//вырезаем из fruits элемент
  }

  //Проверка Alerta при совпадении массивов, разкомментировать строку ниже
  //fruits=arrayOldFruits;

  //Сама проверка идентичности массивов старого и нового
  if (JSON.stringify(fruits) === JSON.stringify(arrayOldFruits)) {
    alert('Порядок не изменился! Перемещайте еще раз!');
  }

  // присваиваем массиву fruits полученные результаты из массива result
  fruits = result; 
};

//кнопка перемещивания
shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let result = [];
  //fruits.filter((item) => {
    // TODO: допишите функцию
    let minValue = parseInt(minValueWeight.value) || 0; //добавили присвоение по дефолту
    let maxValue = parseInt(maxValueWeight.value) || 100; //добавили присвоение по дефолту
    console.log('Минимальное число '+ minValue); //Вывод в консоль для проверки
    console.log('Максимальное число '+ maxValue);//Вывод в консоль для проверки
    
    //проверка если не число то по дефолту
    if (isNaN(minValue)) {
      minValue = 0
    };
    if (isNaN(maxValue)) {
      maxValue = 100
    };

    //проверка на минимальное и максимальное значение
    minValue = (minValue < 0) ? 0 : minValue;
    minValue = (minValue > 99) ? 99 : minValue;
    maxValue = (maxValue > 100) ? 100 : maxValue;
    maxValue = (maxValue < 1) ? 1 : maxValue;
    
    // смена если меньшее больше больщего 
    if (minValue > maxValue) { 
      minValueError = minValue;
      minValue = maxValue;
      maxValue = minValueError;
    }

   // fruits.filter((item) => {
      for (let i = 0; i < fruits.length; i++) {
        if ((fruits[i].weight >= minValue) && (fruits[i].weight <= maxValue)) {
          console.log('index '+ i);//Вывод в консоль для проверки
          console.log('fruits[index] '+ fruits[i]);//Вывод в консоль для проверки

        result.push(fruits[i]);
      }
    }

    fruits = result;  


//});
};

filterButton.addEventListener('click', () => {
  fruits = JSON.parse(fruitsJSON);
  priority = JSON.parse(priorityJSON);
  const result1 = mergeByProperty([fruits, priority]);
console.log(result1);
fruits = result1;
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки


const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  //console.log('colorA '+ arr[a].weight); //Вывод в консоль для проверки
  //console.log('colorA '+ priority[b].weight); //Вывод в консоль для проверки

  //const colorA = priority[a].weight;
  //const colorB = priority[b].weight;
  colorA=a;
  colorB=b;
  console.log('colorA '+ colorA); //Вывод в консоль для проверки
  console.log('colorB '+ colorB); //Вывод в консоль для проверки
  return colorA > colorB;

};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    const number = arr.length;
    //console.log('arr.length '+ n); //Вывод в консоль для проверки
    // внешний цикл
    for (let out_i = 0; out_i < number - 1; out_i++) {
      // внутрений цикл для перестановки элемента  в конец массива
      for (let in_i = 0; in_i < number - 1 - out_i; in_i++) {
        console.log('arr[j].color ' + arr[in_i].color +' '+ arr[in_i].color_weight); //Вывод в консоль для проверки
        console.log('arr[j + 1].color ' + arr[in_i + 1].color +' '+ arr[in_i+1].color_weight); //Вывод в консоль для проверки
        if (comparation(arr[in_i].color_weight, arr[in_i + 1].color_weight)) {
          let temp = arr[in_i + 1];
          arr[in_i + 1] = arr[in_i];
          arr[in_i] = temp;
        }
      }
    }
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});
