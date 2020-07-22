'use strict';

$(() => {
  $('#photo-template').hide();
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
      renderFilters();
      $('.spinner').fadeOut();
      $('#photo-template').fadeIn();
    });
});

function Creature(creature) {
  this.title = creature.title;
  this.img_url = creature.image_url;
  this.description = creature.description;
  this.horns = creature.horns;
  this.type = creature.keyword;
  if(Creature.allType.indexOf(this.type) < 0) {
    Creature.allType.push(this.type);
  }
}

Creature.all = [];
Creature.allType = [];

Creature.prototype.render = function () {
  let $template = $('.template').clone();
  $template.removeClass('template');
  $template.find('.title').text(this.title);
  $template.find('.creature-image').attr('src', this.img_url);
  $template.find('.creature-image').attr('alt', this.title);
  $template.find('.description').text(this.description);
  $template.attr('data-type', this.type);
  return $template;
}

function renderCreature() {
  Creature.all.forEach(creature => {
    $('#photo-template').append(creature.render())
  });
  $('.template').remove();
}

function renderFilters() {
  Creature.allType.sort();
  Creature.allType.forEach(type => {
    const $option = $('<option>').text(type).attr('value', type);
    $('#type-filter').append($option);
  })
}

