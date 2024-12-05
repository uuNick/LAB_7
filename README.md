GET:

Получение мебели с пагинацией (по умолчанию):
http://localhost:8000/api/furnitureModel

Получение контрактов с пагинацией (по умолчанию):
http://localhost:8000/api/contract

Получение продаж с пагинацей (по умолчанию):
http://localhost:8000/api/sale

Получение покупателей с пагинацей (по умолчанию):
http://localhost:8000/api/buyer

Получение покупателей с пагинацией (заданные параметры):
http://localhost:8000/api/buyer/?page=1&limit=30

Получение всех покупателей:
http://localhost:8000/api/buyer/withoutPag

Получение отсортированных покупателей(по имени и с пагинацией по умолчанию):
http://localhost:8000/api/buyer/sorted

Получение отсортированных покупателей(по имени и с пагинацией с параметрами):
http://localhost:8000/api/buyer/sorted/?page=1&limit=30

Получение отфильтрованной мебели по цене:
http://localhost:8000/api/furnitureModel/filtered?price_from=100&price_to=500 

Получение покупателей с параметром поиска:
http://localhost:8000/api/buyer/search?search=Streich

Получение покупателя по ID:
http://localhost:8000/api/buyer/2

Получение фотографии мебели по имени файла:
http://localhost:8000/api/furnitureModel/images/table_1.jpg



POST

Создание покупателя:
http://localhost:8000/api/buyer

{
    "buyer_name": "Test",
    "buyer_address": "Test address",
    "buyer_phone": "12345678912"
}

DEL
Удаление покупателя:
http://localhost:8000/api/buyer/21

PUT
Обновление покупателя
http://localhost:8000/api/buyer/1

{
    "buyer_name": "Streich",
    "buyer_address": "7196 Genesis Unions",
    "buyer_phone": "1-219-280-1625"
}

