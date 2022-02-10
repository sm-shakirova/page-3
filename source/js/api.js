class Server {
  /**
   * получает данные с сервера
   * @param onSuccess - действие при успешной загрузке
   * @param onError - действие при ошибке
   */
  getData(onSuccess, onError) {
    fetch('https://23.javascript.pages.academy/keksobooking/data')
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Ошибка загрузки');
      }).then((data) => onSuccess(data))
      .catch(() => onError());
  }

  /**
   * отправляет данные на сервер
   * @param onSuccess - действие при успешной загрузке
   * @param onError - действие при ошибке
   * @param body - данные для отправки
   */
  sendData(onSuccess, onError, body) {
    fetch('https://23.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: body,
      },
    ).then((response) => {
      if (!response.ok)
        throw new Error('Не удалось отправить форму');
    }).then(() => onSuccess())
      .catch(() => onError());
  }
}

export {Server};
