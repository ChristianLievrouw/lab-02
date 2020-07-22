'use strict';

$(() => {
  const getAjax = { method: 'get', dataType: 'json'};
  $.ajax('./data/page-1.json', getAjax)
    .then((data) => {
      const arrayOfCreatures = data;
      arrayOfCreatures.forEach((creature) => {
        Creature.all.push(new Creature(creature));
      });
    })
    .then(() => {
      renderCreature();
    });
});

function Creature(creature) {
  this.title = creature.title;
  this.img_url = creature.image_url;
  this.description = creature.description;
  this.horns = creature.horns;
}

Creature.all = [];

Creature.prototype.render = function () {
  let $template = $('.template').clone();
  $template.removeClass('template');
  $template.find('.title').text(this.title);
  $template.find('.creature-image').attr('src', this.img_url);
  $template.find('.creature-image').attr('alt', this.title);
  $template.find('.description').text(this.description);
  return $template;
}

function renderCreature() {
  Creature.all.forEach(creature => {
    $('#photo-template').append(creature.render())
  });
  $('.template').remove();
}

