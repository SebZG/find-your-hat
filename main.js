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
      this.field[0][0] = pathCharacter;
   }

   print() {
      this.field.forEach(row =>
         console.log(row.join('')))
         .join("\n");
   }

   ask() {
      const answer = prompt("Which way? ").toUpperCase();
      switch (answer) {
         case "U":
            this.Y -= 1;
            break;
         case "D":
            this.Y += 1;
            break;
         case "L":
            this.X -= 1;
            break;
         case "R":
            this.X += 1;
            break;
         default:
            console.log("Enter U, D, L or R");
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

   play() {
      let playing = true;
      while (playing) {
         this.print();
         this.ask();
         if (!this.isInBounds()) {
            console.log("Out of bounds!");
            playing = false;
            break;
         } else if (this.isHole()) {
            console.log("You fell down a hole!");
            playing = false;
            break;
         } else if (this.isHat()) {
            console.log("You found your hat!");
            playing = false;
            break;
         }
         // Update the current location on the map
         this.field[this.Y][this.X] = pathCharacter;
      }
   }


}