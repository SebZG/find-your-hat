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
      this.playing;
      this.turn = 0;
      this.holesAdded = 0;
      this.maxHoles; // Set the maximum number of holes to add
      this.turnsToAddHole; // Set the number of turns after which a hole is added
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

   addHole() {
      // Generate a random location for the hole
      const holeLocation = {
         y: Math.floor(Math.random() * this.field.length),
         x: Math.floor(Math.random() * this.field[0].length),
      };
      // Make sure the hole is not at the starting position
      while (holeLocation.x === this.X && holeLocation.y === this.Y) {
         holeLocation.y = Math.floor(Math.random() * this.field.length);
         holeLocation.x = Math.floor(Math.random() * this.field[0].length);
      }
      this.field[holeLocation.y][holeLocation.x] = hole;
   }

   play() {
      this.chooseMode();
      this.playing = true;

      // Generate random starting position
      this.Y = Math.floor(Math.random() * (this.field.length - 1)) + 1;
      this.X = Math.floor(Math.random() * (this.field[0].length - 1)) + 1;
      this.field[this.Y][this.X] = pathCharacter;

      while (this.playing) {
         this.print();
         this.whichWay();
         if (!this.isInBounds()) {
            console.log('Out of bounds!');
            this.playing = false;
            break;
         } else if (this.isHole()) {
            console.log('You fell down a hole!');
            this.playing = false;
            break;
         } else if (this.isHat()) {
            console.log('You found your hat!');
            this.playing = false;
            break;
         }
         // Update the current location on the map
         this.field[this.Y][this.X] = pathCharacter;

         // Add a hole after certain turns
         if (this.holesAdded < this.maxHoles && this.turn % this.turnsToAddHole === 0) {
            this.addHole();
            this.holesAdded++;
         }

         this.turn++;
      }
   }

   print() {
      this.field.map(row =>
         console.log(row.join(''))
      ).join('\n');
   }

   chooseMode() {
      const answer = prompt('Choose mode (Easy, Medium or Hard): ').toUpperCase();
      switch (answer) {
         case 'EASY':
            this.field = Field.generateField(10, 10, 0.1);
            this.turnsToAddHole = 5;
            this.maxHoles = 5;
            break;
         case 'MEDIUM':
            this.field = Field.generateField(10, 10, 0.2);
            this.turnsToAddHole = 3;
            this.maxHoles = 7;
            break;
         case 'HARD':
            this.field = Field.generateField(10, 10, 0.3);
            this.turnsToAddHole = 2;
            this.maxHoles = 10;
            break;
         default:
            console.log('Enter Easy, Medium or Hard: ');
            this.chooseMode();
            break;
      }
   }

   whichWay() {
      const answer = prompt('Which way? (U, D, L or R): ').toUpperCase();
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
            console.log('Enter U, D, L or R: ');
            this.whichWay();
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

const myfield = new Field();

myfield.play();
