import userData from "../../data/JSON/users.json";
import {type UserDto } from "../../models/User/UserDto";
import { getRandomInt } from "../../utils/utils";

const userMap: Record<number, UserDto> = {};
let userCount :number = 0;
(userData as UserDto[]).forEach(user => {
  userMap[user.id] = user;
  userCount++;
});




/** Get a scheme by its ID */
export function getUserById(id: number): UserDto {
  return userMap[id];
}
/** Get a scheme by its ID */
export function getRandomUser(): UserDto {

    const r = getRandomInt(1,userCount);
    return userMap[r];
}
