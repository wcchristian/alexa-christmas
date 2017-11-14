/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en': {
        translation: {
            PHRASES: [
                {lang: 'Irish', phrase: 'Nollaig Shona Dhuit'},
                {lang: 'Italian', phrase: 'Buon Natale'},
                {lang: 'Japanese', phrase: 'Meri Kurisumasu'},
                {lang: 'Navajo', phrase: 'Nizhonigo Keshmish'},
                {lang: 'Norwegian', phrase: 'God Jul or Gledelig Jul'},
                {lang: 'Spanish', phrase: 'Feliz Navidad'},
                {lang: 'Swedish', phrase: 'God Jul'},
                {lang: 'Danish', phrase: 'Glædelig Jul'}
            ],
            SKILL_NAME: 'Merry Christmas',
            GREETING_MESSAGE: "Merry Christmas in",
            IS: "is",
            HELP_MESSAGE: 'You can say tell me Merry Christmas, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What would you like for',
            STOP_MESSAGE: 'Merry Christmas!',
        },
    }
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetGreeting');
    },
    'GetNewGreetingIntent': function () {
        this.emit('GetGreeting');
    },
    'GetGreeting': function () {
        const phraseArray = this.t('PHRASES');
        const phraseIndex = Math.floor(Math.random() * phraseArray.length);
        const randomPhrase = phraseArray[phraseIndex];

        // Create speech output
        const speechOutput = this.t('GREETING_MESSAGE') + ' ' + randomPhrase.lang +' '+ this.t('IS') +' '+ randomPhrase.phrase;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomPhrase.phrase);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
