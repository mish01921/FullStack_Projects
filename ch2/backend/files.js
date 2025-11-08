import { writeFileSync, readFileSync } from "node:fs";

const users = [
  {
    name: "Adam Ondra",
    email: "adam.ondra@climb.ing",
  },
  {
    name: "Gavrush Gavrushyan",
    email: "gavrushyan@hostmail.dum"
  }
];
const usersJson = JSON.stringify(users)
writeFileSync("backend/users.json",usersJson)
console.log(usersJson)
const readUsersJson = readFileSync("backend/users.json")
const readUsers = JSON.parse(readUsersJson)
console.log(readUsers);
