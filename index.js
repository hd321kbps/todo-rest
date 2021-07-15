﻿const express = require('express');
const path = require('path');
const todoRoutes = require('./routes/todo');
const sequelize = require('./utils/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use('/api/todo', todoRoutes);

app.use((req, res, next) => {
  res.sendFile('/index.html');
});

async function start() {
  try {
    // Удаляет и создает таблицу заново
    // await sequelize.sync({force: true});
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server started http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
