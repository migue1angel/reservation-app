import { BcryptAdapter } from "../../config";

export const seedData = {
  users: [
    {
      name: "Test 1",
      email: "test1@google.com",
      password: BcryptAdapter.hash("1234"),
    },
    {
      name: "Test 2",
      email: "test2@google.com",
      password: BcryptAdapter.hash("1234"),
    },
    {
      name: "Test 3",
      email: "test3@google.com",
      password: BcryptAdapter.hash("1234"),
    },
    {
      name: "Test 4",
      email: "test4@google.com",
      password: BcryptAdapter.hash("1234"),
    },
    {
      name: "Test 5",
      email: "test5@google.com",
      password: BcryptAdapter.hash("1234"),
    },
    {
      name: "Test 6",
      email: "test6@google.com",
      password: BcryptAdapter.hash("1234"),
    },
  ],
  categories: [
    { name: "Casual", code: 2 },
    { name: "Formal", code: 3 },
  ],
};
