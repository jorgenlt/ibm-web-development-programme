import generateName from 'sillyname';
import superheroes from 'superheroes';


const newSillyname = generateName();

console.log(`My name is ${newSillyname}.`);

const newSuperHero = superheroes.random();

console.log(`I am ${newSuperHero}, not ${newSillyname}.`);
