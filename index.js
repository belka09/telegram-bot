var TelegramBot = require('node-telegram-bot-api');
var Cron = require('cron').CronJob;
var request = require('request');

var config = {
    APPID: "d29939260bc59b9109c0121f43f43774",
    units: "metric",
    cityId: "625144",

};

var minsk = {};

var getWeather = function () {
    request.get(`https://api.openweathermap.org/data/2.5/weather?id=${config.cityId}&units=${config.units}&APPID=${config.APPID}`,
        (err, data) => {
            let error = null;
            let response = null;

            error = err;
            if (data) {
                if (data.statusCode != 200) {
                    let e = JSON.parse(data.body)
                    error = new Error(e.message);
                    error.status = e.cod;
                }
                if (data.body) {
                    response = JSON.parse(data.body);
                }
            };
            ((err, currentWeather) => {
                if (err) {
                    console.log(err);
                }
                else {
                    minsk.mainTemp = currentWeather.main.temp;
                }
            })(error, response);
        }
    );
};

getWeather();

setInterval(getWeather, 60000);

var token = '361991855:AAGD2iKkVtbyHhKbvqCEGKdE994UxejXyto';

var bot = new TelegramBot(token, {
    polling: true,
});

var Dima_Z = {
    id: '78147'
};
var Dima_Solo = {
    id: '182103356'
};
var Nadya = {
    id: '147774430'
};

var Zhenya = {
    id: '371525126'
}

var optionsMe = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {
                    text: 'Димас',
                    callback_data: '2'
                }
            ],
            [
                {
                    text: 'Надя',
                    callback_data: '3'
                }
            ],
            [
                {
                    text: 'Женя',
                    callback_data: '4'
                }
            ]
        ]
    })
};

var optionsDima = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {
                    text: 'Димон',
                    callback_data: '1'
                }
            ],
            [
                {
                    text: 'Надя',
                    callback_data: '3'
                }
            ]
        ]
    })
};
var optionsNadya = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {
                    text: 'Димка',
                    callback_data: '1'
                }
            ],
            [
                {
                    text: 'Димас',
                    callback_data: '2'
                }
            ]
        ]
    })
};

var optionsZhenya = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {
                    text: 'Димон',
                    callback_data: '1'
                }
            ]
        ]
    })
};

var optionsTime = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {
                    text: '',
                    callback_data: ''
                }
            ],
        ]
    })
}

bot.on('message', function (msg, match) {
    this.msg = msg;
    var id = msg.from.id;
    switch (msg.text === 'привет') {
        case msg.from.id == Dima_Z.id:
            // console.log(minsk.mainTemp);
            bot.sendMessage(Dima_Z.id, 'норм погода , чтобы потусить ' + minsk.mainTemp + ' по цельсию');
            bot.sendMessage(Dima_Z.id, 'привет Димон, едем на алми?', optionsMe);
            bot.on("callback_query", function (callbackQuery) {
                if (callbackQuery.data == '2') {
                    bot.sendMessage(Dima_Z.id, 'приглос отправлен Диме');
                    bot.sendMessage(Dima_Solo.id, 'Димас зовёт на алми');
                } else if (callbackQuery.data == '3') {
                    bot.sendMessage(Dima_Z.id, 'приглос отправлен Наде');
                    bot.sendMessage(Nadya.id, 'Димка Зимницкий зовёт на алми');
                } else if  (callbackQuery.data == '4'){
                    bot.sendMessage(Dima_Z.id, 'приглос отправлен Жене');
                    bot.sendMessage(Zhenya.id, 'Димас зовёт на алми');
                }
            });
            break;
        case msg.from.id == Nadya.id:
            bot.sendMessage(Nadya.id, 'привет малая, едем на алми?', optionsNadya);
            bot.on("callback_query", function (callbackQuery) {
                if (callbackQuery.data == '1') {
                    bot.sendMessage(Nadya.id, 'приглос отправлен Димке Зимницкому');
                    bot.sendMessage(Dima_Z.id, 'Надя зовёт на алми');
                } else if (callbackQuery.data == '2') {
                    bot.sendMessage(Nadya.id, 'приглос отправлен Димке Соловьеву');
                    bot.sendMessage(Dima_Solo.id, 'Надя зовёт на алми');
                }
            });
            break;
        case msg.from.id == Dima_Solo.id:
            bot.sendMessage(Dima_Solo.id, 'норм погода , чтобы потусить ' + minsk.mainTemp + ' по цельсию');
            bot.sendMessage(Dima_Solo.id, 'привет Димac, едем на алми?', optionsDima);
            bot.on("callback_query", function (callbackQuery) {
                if (callbackQuery.data == '1') {
                    bot.sendMessage(Dima_Solo.id, 'приглос отправлен Димасу');
                    bot.sendMessage(Dima_Z.id, 'Димас зовёт на алми');
                } else if (callbackQuery.data == '2') {
                    bot.sendMessage(Dima_Solo.id, 'приглос отправлен Наде');
                    bot.sendMessage(Nadya.id, 'Димка Соловьев зовёт на алми');
                }
            });
            break;
        case msg.from.id == Zhenya.id:
            bot.sendMessage(Zhenya.id, 'привет Женя, едем на алми?', optionsZhenya);
            bot.on("callback_query", function (callbackQuery) {
                if (callbackQuery.data == '1') {
                    bot.sendMessage(Zhenya.id, 'приглос отправлен Димасу');
                    bot.sendMessage(Dima_Z.id, 'Женя зовёт на алми');
                } else if (callbackQuery.data == '2') {

                }
            });
            break
        default:
            bot.sendMessage(id, 'привет ' + msg.from.first_name + ', едем на алми?', options);
    }
});