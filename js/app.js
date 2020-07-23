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
  $.ajax('./data/page-2.json', getAjax)
    .then((data) => {
      const arrayOfCreatures = data;
      arrayOfCreatures.forEach((creature) => {
        Creature.all.push(new Creature(creature));
      });
    })
    .then(() => {
      renderCreature();
      renderFilters();
      handleFilters();
      $('.spinner').fadeOut();
    });
});



function Creature(creature) {
  for(let key in creature){
    this[key] = creature[key];
  }
  if(Creature.allType.indexOf(this.keyword) < 0) {
    Creature.allType.push(this.keyword);
  }
}

Creature.all = [];
Creature.allType = [];

Creature.prototype.render = function () {
  const templateHTML = $('#creature-template').html();
  const renderHTML = Mustache.render(templateHTML, this);
  return renderHTML;
}

function renderCreature() {
  Creature.all.forEach(creature => {
    $('#placeholder').append(creature.render())
  });
}

function renderFilters() {
  Creature.allType.sort();
  Creature.allType.forEach(type => {
    const $option = $('<option>').text(type).attr('value', type);
    $('#type-filter').append($option);
  })
}

function handleFilters() {
  $('#type-filter').on('change', function() {
    if($(this).val() !== ''){
      $('.creature').hide();
      $(`.creature[data-type*="${$(this).val()}"]`).fadeIn();
    } else {
      $('.creature').fadeIn();
    }
  });
}

