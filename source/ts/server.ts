import {Link} from './data-details';

class Server {
  /**
   * получает данные с сервера
   * @param {function} onSuccess - действие при успешной загрузке
   * @param {function} onError - действие при ошибке
   */
  getData(onSuccess: (args?: any) => any, onError: (args?:any) => any) {
    fetch(Link.ToGetData)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Ошибка загрузки');
      }).then((data) => onSuccess(data))
      .catch(() => onError());
  }

  /**
   * отправляет данные на сервер
   * @param {function} onSuccess - действие при успешной загрузке
   * @param {function} onError - действие при ошибке
   * @param {BodyInit} body - данные для отправки
   */
  sendData(onSuccess: (args?: any) => any, onError: (args?: any) => any, body: BodyInit | null) {
    fetch(Link.ToSendData,
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
