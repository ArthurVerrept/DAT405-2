
var url = 'https://forbes400.herokuapp.com/api/forbes400?limit=100';
var data = [];
var temp =[];
var upper;
var img = [];
var current, usaWage, hunger, gdp;
var flags = [];



var words = {
  x: 0,
  y: 50,
  size: 0
};

var pic = {
  x: 0,
  y: 50,
  size: 90
};

function preload(){
  createCanvas(1280, 720)
  data = loadJSON(url)
}


function setup() {
  upper = createSlider(0, 20, 10);
  textAlign(CENTER);
  imageMode(CENTER);
  ellipseMode(CENTER);
  rectMode(CENTER);
  noStroke();

  for (var i = 0; i < 20; i++) {
    img[i] = loadImage("images/" + data[i].name + ".jpg");
  }
  for (var i = 0; i < 20; i++) {
    flags[i] = loadImage("Flags/" + data[i].country + ".png");
  }
}


function draw() {
richList();
}

function precise(x) {
  return Number.parseFloat(x).toPrecision(4);
}

function financial(x) {
return Number.parseFloat(x).toFixed(2);
}

function richList(){
  console.log(data)
  background(240);
  var r = upper.value();
  var total = 0;
  var totalLong = 0;

  var int = 0;
  fill(240);
  for (var i = 0; i < r; i++) {
      words.x = (width-80) * (i / r)+80;
      pic.x = (width-80) * (i / r)+80;
      pic.size = map(r, 0, 20, 90, 60)
        if (checkMouse(pic.x, pic.y, pic.size) == true) {
          background(240);
          fill(240,240,240, 150)
          //tint(240, 126);
          for (var x = 0; x < i; x++) {
            words.x = (width-80) * (x / r)+80;
            pic.x = (width-80) * (x / r)+80;
            pic.size = map(r, 0, 20, 90, 60)
            image(img[x], pic.x, pic.y, pic.size*0.7, pic.size*0.7);
            textSize(map(r, 0, 20, 50, 30)*0.7);
            text('#' + data[x].rank, words.x, words.y+10)
          }
          for (var x = i+1; x < r; x++) {
            words.x = (width-80) * (x / r)+80;
            pic.x = (width-80) * (x / r)+80;
            pic.size = map(r, 0, 20, 90, 60)
            image(img[x], pic.x, pic.y, pic.size*0.7, pic.size*0.7);
            textSize(map(r, 0, 20, 50, 30)*0.7);
            text('#' + data[x].rank, words.x, words.y+10)
          }
          selected();
        }
        else{
          image(img[i], pic.x, pic.y, pic.size, pic.size);
          textSize(map(r, 0, 20, 50, 30));
          text('#' + data[i].rank, words.x, words.y+10)
        }
    }

function selected(){
  if (i > r/2) {
    textAlign(RIGHT);
    fill(20)
    tint(240, 255);
    pic.x = (width-360) * (i / r)+200;
    pic.size = map(r, 0, 20, 90, 60)*4
    words.x = pic.x-map(r, 0, 25, 400, 250) + pic.size-map(r, 0, 20, 150, 100);
    image(img[i], pic.x, pic.y+200, pic.size, pic.size);
    image(flags[i], words.x-32, pic.y+ 120)
    textSize(17);
    text(data[i].country, words.x-70, pic.y+125)
    textSize(25);
    text(data[i].name + ', ' + data[i].age, words.x, words.y+170)
    fill(0, 153, 0);
    text('Net Worth: $' + financial(data[i].realTimeWorth * 1000000/1000000000) + ' BILLION', words.x, words.y+200);
    fill(20);
    textSize(20);
    text('Title: ' + data[i].title, words.x, words.y+225);
    text('Source of wealth: ' + data[i].source, words.x, words.y+250);
    i = x;
  }
  else{
    textAlign(LEFT);
    fill(20)
    tint(240, 255);
    pic.x = (width-360) * (i / r)+200;
    pic.size = map(r, 0, 20, 90, 60)*4
    words.x = pic.x + pic.size-map(r, 0, 20, 150, 100);
    image(img[i], pic.x, pic.y+200, pic.size, pic.size);
    image(flags[i], words.x+32, pic.y+120);
    textSize(17);
    text(data[i].country, words.x+70, pic.y+125)
    textSize(25);
    text(data[i].name + ', ' + data[i].age, words.x, words.y+170)
    fill(0, 153, 0);
    text('Net Worth: $' + financial(data[i].realTimeWorth * 1000000/1000000000) + ' BILLION', words.x, words.y+200);
    fill(20);
    textSize(20);
    text('Title: ' + data[i].title, words.x, words.y+225);
    text('Source of wealth: ' + data[i].source, words.x, words.y+250);
    i = x;
  }
}


  for (var i = 0; i < r; i++) {
    if (data[i].realTimeWorth != null) {
      var num = Math.round(data[i].realTimeWorth/1000);
      console.log(num)
      total += num;
      totalLong += num*1000000000;
      console.log(totalLong)
    }
    else{
      i++;
    }
  }
  fill(map(total, 0, 1300, 230, 10));
  textAlign(CENTER)
  if (total > 1000) {
    usaWage = totalLong / 49192;
    hunger = totalLong / 3000000000;
    textSize(map(total, 1000, 2000, 100, 200));
    text('TOTAL: $' + precise(total/1000) + ' TRILLION', width/2, height/1.5)
    textSize(map(mouseY, 0, height, 30, 60));
    text('$' + precise(hunger) + ' For all 3 billion in poverty', width/2, height/1.5+60);
    if (mouseY > height/2) {
      textSize(map(mouseY, height/2, height, 60, 30));
    }
    else{
      textSize(map(mouseY, 0, height/2, 30, 60));
    }
    text(Math.round(usaWage) + ' Average American yearly salaries', width/2, height/1.5+110)
    textSize(map(mouseY, 0, height, 60, 30));
    text(precise(gdp) + "% of the UK's GDP", width/2, height/1.5+170);
  }
  else{
    gdp = (totalLong/ 2622000000000)*100;
    usaWage = totalLong / 49192;
    hunger = totalLong / 3000000000;
    textSize(map(total, 0, 1000, 50, 100))
    text('TOTAL: $' + precise(total) + ' BILLION', width/2, height/1.5)
    textSize(map(mouseY, 0, height, 20, 70));
    text('$' + precise(hunger) + ' For all 3 billion in poverty', width/2, height/1.5+60)
    if (mouseY > height/2) {
      textSize(map(mouseY, height/2, height, 60, 30));
    }
    else{
      textSize(map(mouseY, 0, height/2, 30, 60));
    }
    text(Math.round(usaWage) + ' Average American yearly salaries', width/2, height/1.5+110)
    textSize(map(mouseY, 0, height, 70, 20));
    text(precise(gdp) + "% of the UK's GDP", width/2, height/1.5+170);
  }
}

function checkMouse(ynn){
  if(mouseX < pic.x + (pic.size / 2) && mouseX > pic.x - (pic.size / 2) && mouseY < pic.y + (pic.size / 2) && mouseY > pic.y - (pic.size / 2)){
    return true;
  }
  else{
    return false;
  }
}
