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

export async function getListOfUsersIDS(): Promise<number[]> {
  const someVariable = [...(await User.findAll({ attributes: ["tlgID"] }))].map(
    (user) => user.tlgID
  );
  return someVariable;
}

export async function getListOfUsers(): Promise<User[]> {
  const foundUsers = await User.findAll();
  if (foundUsers) return foundUsers;
}

export async function findRefreshToken(refreshToken: string): Promise<User> {
  const foundUser = await User.findOne({ where: { refreshToken } });
  if (foundUser) return foundUser;
}
