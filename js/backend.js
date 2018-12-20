'use strict';

(function () {
  var OK_CODE = 200;

  var loadURL = 'https://js.dump.academy/keksobooking/data';
  var saveURL = 'https://js.dump.academy/keksobooking';


  /**
   * Load offers data
   * @param {Function} onLoad
   * @param {Function} onError
   */
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Возникла ошибка сервера во время загрузки объявлений. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения во время загрузки объявлений.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Загрузка объявлений не успела выполниться за ' + xhr.timeout + 'мс. Проверьте соединение или попробуйте позже.');
    });

    xhr.timeout = 10000;

    xhr.open('GET', loadURL);
    xhr.send();
  };


  /**
   * Send user form data to server
   * @param {FormData} data
   * @param {Function} onLoad
   * @param {Function} onError
   */
  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Возникла ошибка сервера во время сохранения объявления. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения во время сохранения объявления.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Сохранение объявления не успело выполниться за ' + xhr.timeout + 'мс. Проверьте соединение или попробуйте позже.');
    });

    xhr.timeout = 10000;

    xhr.open('POST', saveURL);
    xhr.send(data);
  };


  window.backend = {
    load: load,
    save: save
  };
})();
