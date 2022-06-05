import { User } from "../models/models";

export async function createNewUser(
  tlgID: number = Math.floor(Math.random() * 10000)
): Promise<User> {
  const newUser = await User.create({ tlgID: tlgID, refreshToken: "" });
  if (newUser) return newUser;
}

export async function getUser(tlgID: number): Promise<User> {
  const foundUser = await User.findOne({ where: { tlgID } });
  if (foundUser) return foundUser;
}

export async function getListOfUsers(): Promise<number[]> {
  const someVariable = [...(await User.findAll({ attributes: ["tlgID"] }))].map(
    (user) => user.tlgID
  );
  return someVariable;
}

export async function findRefreshToken(refreshToken: string): Promise<User> {
  const foundUser = await User.findOne({ where: { refreshToken } });
  if (foundUser) return foundUser;
}

export async function addExpToUser(
  userID: number,
  amount: number
): Promise<User> {
  const foundUser = await getUser(userID);
  const incrementResult = foundUser.increment("exp", { by: amount });
  return incrementResult;
}
