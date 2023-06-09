Feature: Бронирование билетов

    Scenario: Юзер покупает один билет
        Given юзер находится на странице "/index.php"
        When юзер выбирает 3-й день 
        When юзер выбирает время
        When юзер выбирает 3-й ряд 5 место
        Then юзер видит сообщение Вы выбрали билеты:

    Scenario: Юзер покупает два билета
        Given юзер находится на странице "/index.php"
        When юзер выбирает 3-й день 
        When юзер выбирает время
        When юзер выбирает 3-й ряд 5,6 место
        Then юзер видит сообщение Вы выбрали билеты:
    
    Scenario: Юзер бронирует занятое место
        Given юзер находится на странице "/index.php"
        When юзер выбирает 3-й день
        When юзер выбирает время
        When юзер выбирает 3-й ряд 10 место
        When юзер нажимает Получить код бронирования
        When юзер возвращается на страницу "/index.php"
        When юзер выбирает 3-й день
        When юзер выбирает время
        When юзер повторно выбирает 3-й ряд 10 место
        Then кнопка Забронировать не активна
        
    