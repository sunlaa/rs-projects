import PageCounter from '../../tracks/pagination/page-counter';
import CarLogic from '../../tracks/track/car/car-logic';
import Form from '../form/form';

export default class CreateForm extends Form {
  pageCounter: PageCounter;

  constructor(pageConter: PageCounter) {
    super();
    this.addListener('submit', this.createCar);
    this.pageCounter = pageConter;
  }

  createCar = async (e: Event) => {
    e.preventDefault();

    const data = this.getFormData();
    const { page } = this.pageCounter;
    if (data) {
      await CarLogic.createCar(`${data.name}`, `${data.color}`);
      const tracksPage = document.querySelector('.tracks-page');
      if (tracksPage) {
        tracksPage.dispatchEvent(
          new CustomEvent('change-server-data', {
            bubbles: true,
            detail: { pageNum: page + 1 },
          })
        );
      }
    }
  };
}

// PageCounter не обновляется, потому что в форму попадает счетчик из первого рендера
