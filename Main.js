const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.locationX = 0;
    this.locationY = 0;
  }

  print() {
    const stringToPrint = this.field.map(row => {
      return row.join('');}).join('\n');
      console.log(stringToPrint);
  }

  inField() {
    if (
      this.locationX < this.field[0].length && 
      this.locationY < this.field.length &&
      this.locationX >= 0 &&
      this.locationY >= 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  runGame() {
    let playing = true;
    while (playing) {
      this.print();
      this.whichWay();
      if (!this.inField()) {
        console.log('You went outside the field, you cheated, you lose.');
        playing = false;
        break;
      }
      if (this.field[this.locationX][this.locationY] === hat) {
        console.log('Congratulations, you found your long lost hat, you might be the next Indiana Jones, my god, I am impressed.')
        playing = false;
        break;
      }
      if (this.field[this.locationX][this.locationY] === hole) {
        console.log('Oh no, you fell down a large hole, your leg might be broken but you can try standing on it.');
        playing = false;
        break;
      }
      this.field[this.locationX][this.locationY] = pathCharacter;
    }
  }

  whichWay() {
    const direction = prompt('Which way my friend??? ');
    switch (direction) {
      case 'w' : 
        this.locationX -= 1;
        break;
      case 's' : 
        this.locationX += 1;
        break;
      case 'a' :
        this.locationY -= 1;
        break;
      case 'd' :
        this.locationY += 1;
        break;
      default:
        console.log('Please enter a valid direction, a is left, w is up, d is right, s is down ');
        this.whichWay();
        break;
    }
  }
    
    static generateField(h,w,percent = 0.2) {
      let field = new Array(h).fill(0).map(el => new Array(w));
      for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
          const prob = Math.random();
          field[i][j] = prob > percent ? fieldCharacter : hole;
        }}
      const hatLocation = {
        x: Math.floor(Math.random()*w),
        y: Math.floor(Math.random()*h)
      };
      while (hatLocation.x === 0 && hatLocation.y === 0) {
        hatLocation.x = Math.floor(Math.random()*w);
        hatLocation.y = Math.floor(Math.random()*h);
        break;
      }
      field[hatLocation.x][hatLocation.y] = hat;
      field[0][0] = pathCharacter;
      return field;
    }
}

const myfield = new Field(Field.generateField(5,5));

myfield.runGame();





