[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->



# NestJS Users & Tasks API

### Description
A simple **NestJS + TypeORM + Swagger** project with two entities:

- **User**: Can create and manage users.
- **Task**: Each user can have multiple tasks. A task has a `status` (done or not) and a description.

This project is fully documented with **Swagger** and runs with **Docker Compose**.

---

## 📌 Features
- ⚡ **NestJS v10+** – scalable Node.js framework
- 🗄 **TypeORM** – database ORM with MySQL integration
- 📜 **Swagger** – REST API documentation (`/swagger`)
- 🐳 **Docker & docker-compose** – one command to run DB + app + phpMyAdmin
- ✅ **Validation** – powered by `class-validator` and `ValidationPipe`
- 🔐 **DTOs** – strongly typed request/response validation
- 📝 **Changelog automation** – via `standard-version`
- Create, read, update, and delete **Users**.
- Create, read, update, and delete **Tasks** linked to a user.
- **Swagger UI** for API documentation.
- **DTOs** for validation.
- Runs inside **Docker** with hot reload.

---

## ⚙️ Installation

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd nestjs-app
```

### 2. Install dependencies
```bash
yarn install
```
(or `npm install`)

### 3. Environment variables
Create a `.env` file:
```env
DB_HOST=db
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=secret
DB_DATABASE=testdb
```

---

## 🐳 Run with Docker
```bash
docker-compose up --build
```

This will start:
- NestJS app (port 3000)
- MySQL database (port 3306)
- phpMyAdmin (optional)

---

## 📚 Swagger Docs
Once running, open:
```
http://localhost:3000/api
```

---

## 🗂️ Project Structure
```
src
 ┣ users
 ┃ ┣ dto
 ┃ ┃ ┣ create-user.dto.ts
 ┃ ┃ ┗ update-user.dto.ts
 ┃ ┣ entities
 ┃ ┃ ┗ user.entity.ts
 ┃ ┣ users.controller.ts
 ┃ ┣ users.service.ts
 ┃ ┗ users.module.ts
 ┣ tasks
 ┃ ┣ dto
 ┃ ┃ ┣ create-task.dto.ts
 ┃ ┃ ┗ update-task.dto.ts
 ┃ ┣ entities
 ┃ ┃ ┗ task.entity.ts
 ┃ ┣ tasks.controller.ts
 ┃ ┣ tasks.service.ts
 ┃ ┗ tasks.module.ts
 ┗ main.ts
```

---

## 👤 User Entity
```ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
```

---

## ✅ Task Entity
```ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ default: false })
  @Column({ default: false })
  status: boolean;

  @ApiProperty()
  @Column()
  theTask: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
```

---

## 📝 Example DTOs

### Create User DTO
```ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;
}
```

### Update User DTO
```ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

### Create Task DTO
```ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  theTask: string;

  @ApiProperty({ default: false })
  status: boolean;
}
```

### Update Task DTO
```ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
```

---

## 📖 Example API Endpoints

### Users
- `POST /users` → create a user  
  **Body:**
  ```json
  {
    "name": "Mohamed Khaled"
  }
  ```

- `GET /users` → get all users

- `GET /users/:id` → get a single user

- `PATCH /users/:id` → update user  
  **Body:**
  ```json
  {
    "name": "Updated Name"
  }
  ```

- `DELETE /users/:id` → delete user

---

### Tasks
- `POST /tasks/:userId` → create a task for a user  
  **Body:**
  ```json
  {
    "theTask": "Finish NestJS project",
    "status": false
  }
  ```

- `GET /tasks` → get all tasks

- `GET /tasks/:id` → get a single task

- `PATCH /tasks/:id` → update task  
  **Body:**
  ```json
  {
    "status": true
  }
  ```

- `DELETE /tasks/:id` → delete task

---

## 🚀 Tech Stack
- **NestJS**
- **TypeORM**
- **MySQL**
- **Swagger**
- **Docker**

---

## 📌 Author
- Mohamed Khaled
