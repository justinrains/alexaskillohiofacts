'use strict';

var Alexa = require('alexa-sdk');
var APP_ID = undefined;

var SKILL_NAME = 'Ohio Facts';
var GET_FACT_MESSAGE = "Here is your ohio fact: ";
var HELP_MESSAGE = 'You can say tell me an ohio fact, or, you can say stop...';
var HELP_REPROMPT = 'What can I help you with?';
var STOP_MESSAGE = 'Goodbye!';

var data = [
  'The first full-time automobile service station opened in 1899 in Ohio.',
  'Life Savers candy was invented by Clarence Crane of Garrettsville, Ohio in 1912. They were touted as a “summer candy” since they didn’t melt like chocolate.',
  'It is illegal for more than five women to live in one house in Ohio.',
  'Ohio’s state flag is not a rectangle like other flags—it’s a pennant design, and it’s the only state flag in the United States with that design.',
  'By state law, no one may be arrested on a Sunday or on the Fourth of July in Ohio, which is totally awesome and definitely not enforced.',
  'The Great Serpent Mound, the largest serpent effigy in the world at a half mile long, is on a plateau overlooking Brush Creek Valley in Adams County.',
  'The first concrete street in America, which is still in use today, was poured in 1891 near the Logan County Courthouse in Bellefontaine.',
  'If a restaurant wants to serve horse meat in Ohio, they must display a sign that says, “Horse Meat Served Here.” Thank goodness for that.',
  'Ohio has the largest Amish population of any state in the nation. ',
  'The first ambulance service was established in Cincinnati in 1865.', 
  'Cleveland boasts Americas first traffic light. It began on Aug. 5, 1914.', 
  'Ermal Fraze invented the pop-top can in Kettering.', 
  'James J. Ritty, of Dayton, invented the cash register in 1879 to stop his patrons from pilfering house profits.', 
  '"Hang On Sloopy" is the official state rock song.', 
  'Cincinnati Reds were the first professional baseball team.', 
  'The Y Bridge in Zanesville was first built in 1814 to span the confluence of the Licking and Muskingum Rivers. The current bridge is the fifth construction at the same location. "Ripleys Believe It or Not" proclaimed it the only bridge in the world which you can cross and still be on the same side of the river.', 
  'Akron was the first city to use police cars.', 
  'Cincinnati had the first professional city fire department.', 
  'Akron is the rubber capital of the world.', 
  'The American Federation of Labor was founded in Columbus.', 
  'Ohio senator John Glenn became the oldest man to venture into outer space.On February 20, 1962 he was the first American to orbit the earth. In October of 1998 at age 77 he returned to the space program and traveled back into space.', 
  'Cleveland is home to the Rock and Roll Hall of Fame.', 
  'Ohio is the leading producer of greenhouse and nursery plants.', 
  'The Pro Football Hall of Fame is located in Canton.', 
  'Neil Armstrong became the first man to walk on the moon. He was from Wapakoneta.', 
  'The Wright Brothers are acknowledged as inventors of the first airplane they were from Dayton.', 
  'The popular television sit-com, "The Drew Cary Show" is set in Cleveland.', 
  'East Liverpool was the beginning point of the United States Public Land Survey. The location was the area from which a rectangular-grid land survey system was established under the Ordinance of 1785. The survey provided for administration and subdivision of land in the Old Northwest Territory. The Ordinance stipulated that all public lands were to be divided into townships six miles square.', 
  'Seven United States presidents were born in Ohio. They are: Ulysses S. Grant, Rutherford B. Hayes, James A. Garfield, Benjamin Harrison, William McKinley, William H. Taft, and Warren G. Harding.', 
  'Some well-known personalities were born in Ohio. Among them Steven Spielberg, Paul Newman, Annie Oakley, Arsenio Hall and Clark Gable.', 
  'The first full time automobile service station was opened in 1899 in Ohio.', 
  'In 1852 Ohio was the first state to enact laws protecting working women.', 
  'Ohio gave America its first hot dog in 1900. Harry M. Stevens created the popular dining dog.', 
  'Ohio became the 17th state on March 1, 1803.', 
  'East 105th Street and Euclid Avenue in Cleveland was the site of the first pedestrian button for the control of a traffic light. The boy chosen for the 1948 newsreel to demonstrate its operation was Louis Spronze.', 
  'Ohio has an area of 116,103 sq miles. It ranks 34th in state size.', 
  'Columbus is the state capital and Ohios largest city.', 
  '50% of the United States population lives within a 500 mile radius of Columbus.', 
  'Dresden is the home of the worlds largest basket. It is located at Basket Village USA.', 
  'Fostoria is the only city to be situated in three counties (Seneca, Hancock & Wood).', 
  'Ohios state flag is a pennant design. It is the only state flag of that design in the United States.', 
  'Ohio University was founded in 1804 at Athens and is recognized as the first university in Ohio and in the Northwest Territory.', 
  'Oberlin College was founded in 1833.It was the first interracial and coeducational college in the United States.', 
  'The Glacial Grooves on the north side of Kelleys Island are the largest easily accessible such grooves in the world. They were scoured into solid limestone bedrock about 18,000 years ago by the great ice sheet that covered part of North America.', 
  'Marietta was Ohios first permanent settlement. Founded in 1788 by General Rufus Putnam and named in honor of Marie Antoinette, then queen of France.', 
  'Chillicothe was Ohios first capital city.', 
  'Cleveland became the worlds first city to be lighted electrically in 1879.', 
  'Ohio is known as the Buckeye State.', 
  'Thomas A. Edison from Milan developed the incandescent light bulb, phonograph, and early motion picture camera.', 
  'John Lambert of Ohio City made Americas first automobile in 1891.', 
  'Fifty percent of the United States population lives within a 500-mile radius of Columbus, Ohio.', 
  'Charles Kettering of Loundonville invented the automobile self-starter in 1911.', 
  'Charles Goodyear of Akron developed the process of vulcanizing rubber in 1839.', 
  'Roy J. Plunkett of New Carlisle invented Teflon in 1938.', 
  'Ohio has the largest Amish population of any state in the nation.', 
  'The first full-time automobile service station opened in 1899 in Ohio.', 
  'Oberlin College, founded in 1833, was the first interracial and coeducational college in the United States.', 
  'There is an alley dedicated to drummer Dave Grohl in his hometown of Warren, Ohio.', 
  'The largest drum sticks in the world are in David Grohl Alley, each measuring 23 feet long and weighing a half-ton.', 
  'By state law, no one may be arrested on a Sunday or on the Fourth of July in Ohio, which is totally awesome and definitely not enforced.'
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        var factArr = data;
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = GET_FACT_MESSAGE + randomFact;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};

{
  "intents": [
    {
      "intent": "GetNewFactIntent"
    },
    {
      "intent": "AMAZON.HelpIntent"
    },
    {
      "intent": "AMAZON.StopIntent"
    },
    {
      "intent": "AMAZON.CancelIntent"
    }
  ]
}





