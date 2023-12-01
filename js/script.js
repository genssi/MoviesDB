/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const movieDB = {
    movies: [
      "Логан",
      "Лига справедливости",
      "Ла-ла лэнд",
      "Одержимость",
      "Скотт Пилигрим против...",
    ],
  };

  const adsBlock = document.querySelectorAll(".promo__adv img");
  const genre = document.querySelector(".promo__genre");
  const bg = document.querySelector(".promo__bg");
  const ul = document.querySelector(".promo__interactive-list");
  const addForm = document.querySelector("form.add");
  const input = addForm.querySelector(".adding__input");
  const checkbox = addForm.querySelector("[type='checkbox']");

  const sortMovies = (movieData) => {
    movieData.movies.sort();
  };

  function makeChanges(title, bgImage) {
    title.textContent = "драма";
    bgImage.style.cssText = "background-image: url(../img/bg.jpg)";
  }

  makeChanges(genre, bg);

  function removeAdsBlock(adsData) {
    adsData.forEach((item) => {
      item.remove();
    });
  }

  removeAdsBlock(adsBlock);

  function updateMovieDB(data, parent) {
    parent.innerHTML = "";
    sortMovies(data);

    data.movies.forEach((movie, i) => {
      const li = document.createElement("li");
      li.classList.add("promo__interactive-item");
      li.textContent = `${i + 1}. ${movie}`;

      const deleteBtn = document.createElement("div");
      deleteBtn.classList.add("delete");
      li.appendChild(deleteBtn);

      parent.appendChild(li);
    });

    document.querySelectorAll(".delete").forEach((btn, i) => {
      btn.addEventListener("click", () => {
        btn.parentElement.remove(); //удаляю родительский элемент
        movieDB.movies.splice(i, 1); //вырезаю фильм из списка
        updateMovieDB(movieDB, ul); //рекурсия чтобы нумерация фильма шла привильно
      });
    });
  }

  updateMovieDB(movieDB, ul);

  addForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let newMovie = input.value.trim(); //получаю значение с инпута и удаляю лишнии пробелы
    const favorite = checkbox.checked;

    if (newMovie) {
      if (newMovie.length > 21) {
        newMovie = `${newMovie.slice(0, 22)}...`;
      };

      if (favorite) {
        console.log("Добовляем любимый фильм");
      };

      movieDB.movies.push(newMovie);
      sortMovies(movieDB);
      updateMovieDB(movieDB, ul);
    } else {
      alert("Введите название фильма");
    };

    event.target.reset();
  });
});