# StackUp Source of Truth Document

## Project Overview
**StackUp** is a **Trello-like task management application** built using the **MERN stack**. It provides users with the ability to create, manage, and organize boards, lists, and cards in a **drag-and-drop** interface.

### **Tech Stack**
- **Frontend:** React, React DnD
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT, bcrypt
- **Hosting:** Netlify (Frontend), Heroku (Backend)

---

## **Core Features**
### **User Authentication**
- Sign up, login, and logout functionality.
- JWT-based authentication with secure password hashing.
- Authenticated API routes for protected access.

### **Board Management**
- Create, update, and delete boards.
- Boards store lists that contain cards.
- Each board is associated with an authenticated user.

### **List Management**
- Create, update, and delete lists within a board.
- Lists hold multiple cards.
- Lists can be reordered within a board.

### **Card Management**
- Create, update, and delete cards inside a list.
- Move cards between lists using drag-and-drop.
- Assign labels and due dates to cards.

---

## **Endpoints**
### **Authentication Routes**
| Method | Endpoint      | Description |
|--------|-------------|-------------|
| POST   | `/auth/register` | Register a new user |
| POST   | `/auth/login` | Authenticate user and return JWT |
| GET    | `/auth/user` | Fetch authenticated user details |

### **Board Routes**
| Method | Endpoint      | Description |
|--------|-------------|-------------|
| POST   | `/boards` | Create a new board |
| GET    | `/boards` | Get all boards for the user |
| PUT    | `/boards/:id` | Update board details |
| DELETE | `/boards/:id` | Delete a board |

### **List Routes**
| Method | Endpoint      | Description |
|--------|-------------|-------------|
| POST   | `/lists` | Create a new list inside a board |
| GET    | `/lists/:boardId` | Get lists for a specific board |
| PUT    | `/lists/:id` | Update list details |
| DELETE | `/lists/:id` | Delete a list |

### **Card Routes**
| Method | Endpoint      | Description |
|--------|-------------|-------------|
| POST   | `/cards` | Create a new card in a list |
| GET    | `/cards/:listId` | Get cards for a specific list |
| PUT    | `/cards/:id` | Update card details |
| DELETE | `/cards/:id` | Delete a card |

---

## **Deployment**
### **Backend Deployment (Heroku)**

https://stackup-237e7834c5e7.herokuapp.com

### **Frontend Deployment (Netlify)**

https://mystackup.netlify.app

---

## **Future Enhancements**
- **User Collaboration:** Share boards with other users.
- **Notifications:** Email or push notifications for task updates.
- **Activity Logger:** Track actions and display activity to users.
- **Offline Mode:** Allow users to make changes while offline and sync later.

---

## **Conclusion**
This document serves as the **source of truth** for the StackUp project, providing all necessary details about its architecture, API structure, development workflow, and deployment process. Developers should reference this document to ensure consistency and maintainability throughout the project lifecycle.
