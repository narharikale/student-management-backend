import { v4 as uuidv4 } from "uuid";

export const mockStudents = [
  {
    id: uuidv4(),
    name: "John Doe",
    age: 15,
    class: "10A",
    phoneNumber: "1234567890",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Jane Smith",
    age: 16,
    class: "11B",
    phoneNumber: "2345678901",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Mike Johnson",
    age: 14,
    class: "9C",
    phoneNumber: "3456789012",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Sarah Williams",
    age: 15,
    class: "10B",
    phoneNumber: "4567890123",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Tom Brown",
    age: 16,
    class: "11A",
    phoneNumber: "5678901234",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
