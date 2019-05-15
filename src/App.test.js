import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from "enzyme";
import Enzyme from "enzyme";
import App from './App';

Enzyme.configure({ adapter: new Adapter() });


let expectInputVide = (input) => {
	expect(input.html()).toContain('value=""');
}

let expectNoElements = (app) => {
   	expect(app.find('.element').exists()).toBe(false);
}

let ecrire = (texte) => {

	return {
		dans(input) {
			input.simulate("change", {
  				target: {
  					value: texte
  				}
  			});
		}
	}
}

let cliquerSur = (bouton) => {
  	bouton.simulate("click");
}



let ajouterElement = (texte, app) => {
	ecrire(texte).dans(app.find("#input"));
	cliquerSur(app.find('#valider'));
} 


describe('App', () => {
  it('affiche une todo vide', () => {
  	const app = mountApp();

    expect(app.html()).toContain("<h2>ToDoList</h2>");
    // expect(app.state().liste).toHaveLength(0);
    expectInputVide(app.find('#input'));
	expectNoElements(app);	  
  });

  it('ajouter un élément', () => {
  	const app = mountApp();

  	ajouterElement("Faire les courses", app)
  	expect(app.find('#elements').html()).toContain("Faire les courses");
  	expectInputVide(app.find('#input'));

  });

  it('retirer un élément', () => {
  	const app = mountApp();

  	ajouterElement("Faire les courses", app);
  	app.find("#elements").first().find('button').simulate('click');
  	expectNoElements(app);

  });


  it("ne pas ajouter input vide", () => {
  	const app = mountApp();

  	ajouterElement("", app);
  	expectNoElements(app);
  });


});


let mountApp = function() {
  return mount(<App />);
};