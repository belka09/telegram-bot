var TelegramBot = require('node-telegram-bot-api');
var Cron = require('cron').CronJob;
var request = require('request');

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
            bot.sendMessage(Dima_Z.id, 'привет Димон, едем на алми?', optionsMe);
            bot.on("callback_query", function (callbackQuery) {
                if (callbackQuery.data == '2') {
                    bot.sendMessage(Dima_Z.id, 'приглос отправлен Диме');
                    bot.sendMessage(Dima_Solo.id, 'Димас зовёт на алми');
                } else if (callbackQuery.data == '3') {
                    bot.sendMessage(Dima_Z.id, 'приглос отправлен Наде');
                    bot.sendMessage(Nadya.id, 'Димка Зимницкий зовёт на алми');
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
        default:
            bot.sendMessage(id, 'привет ' + msg.from.first_name + ', едем на алми?', options);
    }
});