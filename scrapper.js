const puppeteer = require('puppeteer');

async function scrapeAmazonBestsellers() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.mercadolivre.com.br/mais-vendidos');
  const product_best = [];


    const name = await page.$$eval('.dynamic-carousel__title', elements => {
        return elements.map(element => element.innerText.trim());
    });

    const category = await page.$$eval('.dynamic__carousel-title', elements => {
        return elements.map(element => element.innerText.trim());
    });

    const price = await page.$$eval('.dynamic-carousel__price', elements => {
        return elements.map(element => element.innerText.trim());
    });

    const position = await page.$$eval("span.dynamic-carousel__pill-container--text.dynamic-carousel__pill-container--text-best-seller  ", elements => {
        return elements.map(element => element.innerText.trim());
    });


 //console.log([ name, category, price, position]);

 let contador = 0;
 let ultimaposicao = 0;

  for (let i = 0; i < category.length; i++) {

    for (let j = ultimaposicao; j < name.length; j++) {
        const id_ = position[j].slice(0, 1);
        const name_ = name[j];
        const price_ = price[j];
        const category_ = category[i];

        product_best.push({id_, name_, price_, category_});

        contador++;
        if (contador == 3){
            ultimaposicao = j + 18;
            contador = 0;
            break;
        }
        
    }
  }

  await browser.close();
  return product_best;
  }



// scrapeAmazonBestsellers()
//   .then((products) => console.log(products))
//   .catch((error) => console.error('Erro ao fazer scraping:', error));

scrapeAmazonBestsellers().then((products) => console.log(products))

module.exports.scrapeAmazonBestsellers = scrapeAmazonBestsellers;