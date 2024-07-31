const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
   constructor(field = [[]]) {
      this.field = field;
      this.X = 0;
      this.Y = 0;
      // Set the "home" position before the game starts
      // this.field[0][0] = pathCharacter;
   }

   static generateField(height, width, percentage = 0.1) {
      const field = new Array(height).fill(0).map(el => new Array(width));
      for (let y = 0; y < height; y++) {
         for (let x = 0; x < width; x++) {
            const prob = Math.random();
            field[y][x] = prob > percentage ? fieldCharacter : hole;
         }
      }
      // Set the "hat" location
      const hatLocation = {
         x: Math.floor(Math.random() * width),
         y: Math.floor(Math.random() * height)
      };
      // Make sure the "hat" is not at the starting point
      while (hatLocation.x === 0 && hatLocation.y === 0) {
         hatLocation.x = Math.floor(Math.random() * width);
         hatLocation.y = Math.floor(Math.random() * height);
      }
      field[hatLocation.y][hatLocation.x] = hat;
      return field;
   }

   play() {
      let playing = true;
      // Generate random starting position
      this.X = Math.floor(Math.random() * (this.field[0].length - 1)) + 1;
      this.Y = Math.floor(Math.random() * (this.field.length - 1)) + 1;
      this.field[this.Y][this.X] = pathCharacter;

      while (playing) {
         this.print();
         this.ask();
         if (!this.isInBounds()) {
            console.log('Out of bounds!');
            playing = false;
            break;
         } else if (this.isHole()) {
            console.log('You fell down a hole!');
            playing = false;
            break;
         } else if (this.isHat()) {
            console.log('You found your hat!');
            playing = false;
            break;
         }
         // Update the current location on the map
         this.field[this.Y][this.X] = pathCharacter;
      }
   }

   print() {
      this.field.map(row =>
         console.log(row.join(''))
      ).join('\n');
   }

   ask() {
      const answer = prompt('Which way? ').toUpperCase();
      switch (answer) {
         case 'U':
            this.Y -= 1;
            break;
         case 'D':
            this.Y += 1;
            break;
         case 'L':
            this.X -= 1;
            break;
         case 'R':
            this.X += 1;
            break;
         default:
            console.log('Enter U, D, L or R.');
            this.ask();
            break;
      }
   }

   isInBounds() {
      return (
         this.Y >= 0 &&
         this.X >= 0 &&
         this.Y < this.field.length &&
         this.X < this.field[0].length
      );
   }
   isHole() {
      return this.field[this.Y][this.X] === hole;
   }

   isHat() {
      return this.field[this.Y][this.X] === hat;
   }
}

const myfield = new Field(Field.generateField(10, 10, 0.2));

myfield.play();
