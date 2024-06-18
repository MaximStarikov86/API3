// Объект изображения
var photo = {};

// Функция получения случайного изображения
const getRandomPhoto = async () => {
  
  // GET-запрос случайного изображения
  const response = await fetch('https://api.unsplash.com/photos/random', {
    method: 'GET',
    headers: {
      'Authorization': 'Client-ID O_1fW0l3WK6npXSObGTFRM5j4bG36gjFhMZHf0yK-HU',
    }
  });

  // Вызов GET-запроса случайного изображения
  await response.json().then(result => {

    // Обновление объекта изображения
    photo = result;

    // Обновление изображения на странице
    document.getElementById('photo').src = photo.urls.regular;

    // Обновление имени и фамилии фотографа на странице
    document.getElementById('userUrl').innerHTML = photo.user.name;
    document.getElementById('userUrl').href = `${photo.user.links.html}?utm_source=MyApp&utm_medium=referral`;

    // Обновление количества лайков на странице
    document.getElementById('photoLikes').innerHTML = `Likes: ${photo.likes}`;
  });
}

// Функция лайка изображения
const likePhoto = async () => {
  
  // POST-запрос лайка изображения
  const response = await fetch(`https://api.unsplash.com/photos/${photo.id}/like`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer Sz7FsnsOIWdgFCSMPVrxe-1pMnbCMBkneFfRBGCdEd4',
    }
  });

  // Вызов POST-запроса лайка изображения
  await response.json().then(result => {
    
    // Обновление количества лайков в объекте изображения
    photo.likes = result.photo.likes;

    // Обновление статуса "пользователь уже поставил лайк" в объекте изображения
    photo.liked_by_user = result.photo.liked_by_user;

    // Обновление количества лайков на странице
    document.getElementById('photoLikes').innerHTML = `Likes: ${photo.likes}`;
  });
}

// Функция загрузки страницы
window.addEventListener('load', () => {

  // Вызов функции получения случайного изображения
  getRandomPhoto()

  // Функция нажатия на кнопку лайка
  document.getElementById('likePhotoButton').addEventListener('click', () => {

    // Вызов функции лайка изображения
    likePhoto();
  });
});
