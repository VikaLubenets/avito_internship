# Проект "ФИЛЬМОТЕКА"

## 1. Описание

Этот проект представляет собой веб-приложение по поиску фильмов и сериалов с использованием [API Кинопоиска](https://api.kinopoisk.dev/documentation), построенное с использованием React и Redux. 

## 2. Инструкция по запуску

1. **Клонируйте репозиторий:**

    ```shell
    git clone <URL_репозитория>
    ```

2. **Перейдите в каталог проекта:**

    ```shell
    cd avito_internship
    ```

3. **Установите зависимости:**

    ```shell
    npm install
    ```

4. **Запустите проект, предварительно установив переменную окружения TOKEN:**

    ```shell
    TOKEN=<your api token> npm run start
    ```
    Примечание: если вы запускаете проект на Windows powershell используйте команду:
    ```shell
    $env:TOKEN=<your api token>; npm run start
    ```
    При возникновении проблем с установкой переменной окружения через консоль, токен можно установить добавив в проект файл .env с текстом:
    ```shell
        TOKEN=<your api token>
    ```
    
     или добавив токен вместо пустой строки в файле src/api/staggeredBaseQuery/staggeredBaseQuery.ts:
    ```shell
        const token = process.env.TOKEN || '';
    ```

## 3. Выполненные нефункциональные требования:

1. Стек технологий:
    * фронтенд фреймворк: React, версия 18
    * сборщик: Webpack
    * Node.js: 18 или выше
    * Typescript
    * Redux, RTK Query
    * пакетный менеджер: npm
    * eslint 
    * husky (для pre-commits)
    * prettier (для единого форматирования кода)
    * библиотека компонентов - react-bootstrap, библиотека иконок - lucide-react
    * jest, react-testing library - для тестирования

2. Порт:
    * 7070, т.е. проект доступен по ссылке http://localhost:7070

3. Реализован адаптивный интерфейс с использованием препроцессора SCSS (базовые переменные, миксины и брейкпоинты определены в папке src/styles/variables; стили отдельных компонентов находятся в папке с соответствующим компонентом src/components)

4. Роутинг выполнен с использованием React Router v6. Для реализации защищенного роута (для авторизованных пользователей) создан High Order Component - PrivateRoutes (src/components/PrivateRoutes);

5. При переходах по ссылкам страница не перезагружается (SPA).

## 4. Выполненные функциональные требования:

### Общие проблемы при разработке приложения и их решения:

**Проблема 1.** Управление глобальным состоянием и передачей данных между компонентами

**Решение:** Во избежание проблемы props drilling и избыточных перерендеров для управления глобальным состоянием выбрала Redux. Просто контекст не подошел, т.к. хотелось разделить объекты состояния на состояние, связанное с фильмами, с авторизацией и с пользователями, а в таком случае пришлось бы создавать несколько контекстов, что привело бы к проблемам в том случае, когда одному компоненту может потребоваться доступ к разным контекстам (компоненты имеют доступ к ближайшему провайдеру контекста). 

Redux инициализирован в папке store, типизирован в соответствии с документацией, и включает в себя 4 редьюсера: для работы с состоянием фильмов, пользователя, авторизации и запросов апи. Все типы данных также указаны в файле types.ts в папке store, включая ответы сервера согласно [API Кинопоиска](https://kinopoiskdev.readme.io/reference/moviecontroller_findonev1_4).


**Проблема 2.** Апи запросы и кеширование ответов сервера для оптимизации количества запросов на сервер и улучшения пользовательского опыта, бысрого обновления UI. 

**Решение:** Для решения этой проблемы воспользовалась опциональным пакетом Redux Toolkit - RTK Query. Все запросы описаны в файле src/api/api.ts. В основном использованы обычные хуки useQuery для загрузки данных в приложении, но для страницы поиска случайного фильма использован useLazyQuery, т.к. позволяет осуществлять запрос на сервер в контролируемом порядке (например, по клику на кнопку), а не автоматически при загрузке компонента. 

Для авторизации пользователей использован createAsyncThunk (src/auth/loginByUserName.ts).

Всего реализовано 7 запросов к апи кинопоиска для 7 разных endpoints (подробно примеры ответов сервера здесь не привожу, т.к. все они подробно типизированы и доступны в файле store/types.ts):

1. getFilmDataById для получения данных о фильме по id для страницы конкретного фильма. Ответ сервера типизирован IFilm.

2. getAllFilmsAndSeries для получения всех фильмов и сериалов (для этого по умолчанию внутри запроса в соответствии с документацией установлен query параметр type: ['movie', 'tv-series']), а также для получения фильтрованных значений коллекций фильмов в случае, если в запрос в качестве query параметров были переданы соответствующие фильмы (см. пример в компоненте MainPage). Ответ сервера типизирован - FilmSearchResponse.

3. getSearchFilms для поиска фильма по наименованию. В приложении также реализован debounce в 1 секунду при вводе строки в поиск (см. кастомный хук useDebounce в src/hooks/useDebounce.ts). Ответ сервера типизирован и совпадает с предыдущим - FilmSearchResponse.

4. getReviews запрос для получения отзывов на фильм для страницы с отдельным фильмом. Ответ сервера типизирован - ReviewResponse.

5. getPosters запрос для получения постеров фильма для страницы с отдельным фильмом. Ответ сервера типизирован - PostersResponse.

6. getSeasons запрос для получения информации о сезонах, если была открыта страница сериала. Ответ сервера типизирован - SeasonsResponse.

7. getRandomFilm для получения случайного фильма на странице поиска случайного фильма. Ответ сервера типизирован и совпадает с ответом на поиск фильма по id - IFilm.

**Дополнительно:** реализована возможность выполнения трёх попыток повторного запроса, если запрос был неудачным с помощью доп. опции retry в RTK Query (src/api/staggeredBaseQuery/staggeredBaseQuery.ts)

**Проблема 3:** Проблема настройки переменных окружения для webpack и установки их через консоль на windows powershell. 

**Решение:** на странице документации пакета dotenv был найден специальный плагин dotenv-webpack, который подтягивает переменные окружения из файла .env, а с помощью доп. настройки {systemvars: true} удалось передавать переменные окружения до запуска приложения через консоль.

**Проблема 4:** Невозможность условного запуска хуков для разных запросов данных в зависимости от наличия поискового запроса в MainPage.

**Решение:** использован доп. параметр запроса skip, который позволил по умолчанию отправлять общий запрос useGetAllFilmsAndSeriesQuery для получения всех фильмов или результат фильтрованного запроса до тех пор, пока значение  search является пустой строкой. И отправлять useGetSearchFilmsQuery для получения результатов поиска во всех случаях, когда search содержит какой-то текст.

**Проблема 5:** Кеширование данных по умолчанию в запросах RTK Query стало проблемой при реализации страницы с поиском случайного фильма, т.к. при клике на кнопку даже без параметров фильтрации пользователь должен каждый раз получать новый фильм. А с кешированием получалось так, что если запросы были сделаны внутри периода кеширования, то пользователь в ответ получал тот же самый фильм, что и в прошлый раз.

**Решение:** обнаружила дополнительный параметр, который можно передавать в запрос для отмены кеширования. Теперь каждый раз пользователь получает новый фильм.

### Реализованный функционал:


1. Страница со списком всех фильмов (MainPage):
    * Отображается список фильмов и сериалов
    * Реализована  пагинация
    * Можно выбрать количество фильмов для показа на странице (по умолчанию 10)
    * Можно отфильтровать выдачу (по году, стране и возрастному рейтингу)
    * Реализован поиск по названию фильма
    * Можно перейти на страницу фильма из выдачи
    * Фильтры и поиск сохраняются в квери параметрах url
    * Сохраняется история поиска (последние 20 запросов) в store - searchHistory.
    * При вводе нового названия появляется suggest с предложениями из ранее введенных значений
    * При вводе значений происходит фильтрация подсказок по вхождению. 
    * Поиск осуществляется не при каждом вводе символа, а в момент когда с ввода последнего символа прошла 1 секунда (debounce).


2. Страница фильма (FilmPage):
    * Отображается информация о фильме или сериале, в том числе:
        * название фильма/сериала
        * описание
        * рейтинг
        * список актёров (с пагинацией, если их больше 10); 
        * список сезонов и серий (с пагинацией, если они подразумеваются)) 
        * отзывы пользователей (с пагинацией)
        * постеры, отображение которых реализовано в виде «карусели»
    * Реализован вывод списка фильмов, похожих на текущий, в виде «карусели». По каждому элементу можно кликнуть и открыть его страницу
    * В случае, если какой-то из списков пустой (список отзывов, актёров, сезонов), реализовано отображение заглушки на подобие «нет информации о ...»
    * Реализована кнопка «назад», которая ведет на выдачу.

3. Форма логина для авторизации:

    * кнопка для авторизации находится в хэдере ("Войти").

    * Реализована авторизация и эмуляция запроса на бекенд с данными из логин формы для получения токена авторизации (см. src/auth/loginByUserName.ts). В данном случае создала просто файл в папке public с данными пользователей - usersData.json, загружаю данные из него при помощи fetch, проверяю корректность логина и пароля из него и затем сохраняю в localStorage токен и данные об авторизации в store либо выбрасываю сообщение об ошибке. 

    * Для входа в приложение можно использовать следующие данные:
        * логин - admin
        * пароль - password
    
    Либо можно добавить свой объект с данными пользователя в данный файл и протестировать функционал с ними. 

4. Страница случайного фильма (RandomFilmPage):
    * страница с рандомным поиском доступна только авторизованным пользователям (кнопка Случайный фильм в хэдере появляется только после авторизации)
    * есть возможность установить фильтры
    * есть кнопка «Случайный фильм», которая перекидывает на страницу найденного фильма


5. Страница 404 (Page404):
    * реализована заглушка на случае ошибки в url и попытки перейти на несуществующий путь.

## 5. Использованные оптимизации:

* в компонентах, которые не зависят от своих родителей (например, логин форма) использована мемоизация (memo);

* для некоторых вычислений в приложении использован хук useMemo, чтобы не производить лишние вычисления при совпадении параметров.

* для функций внутри компонентов использован useCallback для стабильности ссылок при каждом перерендере.

* использованы уникальные ключи key и условный рендеринг, чтобы реакту было проще понимать какие конкретно элементы требуется перерендерить, а какие оставить без изменения.