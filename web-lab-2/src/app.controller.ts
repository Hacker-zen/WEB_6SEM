import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @Render('pages/index')
  getHome() {
    const products = [
      {
        id: 1,
        image: 'samsung-tab.webp',
        alt: 'samsung tab',
        title: 'Samsung Galaxy Tab S8',
        price: '87,499p',
      },
      {
        id: 2,
        image: 'javscript.webp',
        alt: 'javascript',
        title: 'Программирование на Javascript',
        price: '540p',
      },
      {
        id: 3,
        image: 'ipad.webp',
        alt: 'ipad',
        title: 'iPad Pro 4',
        price: '220,000p',
      },
      {
        id: 4,
        image: 'huawei-pad.webp',
        alt: 'huawei tab',
        title: 'Huawei Matepad Air 8',
        price: '54,523p',
      },
      {
        id: 5,
        image: 'google.webp',
        alt: 'pixel tab',
        title: 'Google Pixel Tab 8',
        price: '60,000p',
      },
      {
        id: 6,
        image: 'dumai.webp',
        alt: 'dumai medlenno',
        title: 'думай медленно решай быстро',
        price: '987p',
      },
      {
        id: 7,
        image: 'python.webp',
        alt: 'python',
        title: 'Изучаем Python',
        price: '1600p',
      },
    ];

    const categories = [
      {
        id: 'smartphone',
        title: 'Смартфоны',
        products: [
          {
            image: 'iphone.webp',
            alt: 'iphone',
            title: 'iPhone 14 Pro Max',
            price: '160,000p',
          },
          {
            image: 'samsung.webp',
            alt: 'samsung',
            title: 'Samsung Galaxy A34',
            price: '35,000p',
          },
          {
            image: 'xiaomi.webp',
            alt: 'xiaomi',
            title: 'Xiaomi 13',
            price: '100,000p',
          },
          {
            image: 'huawei.webp',
            alt: 'huawei',
            title: 'Huawei P60 Pro',
            price: '54,000p',
          },
        ],
      },
      {
        id: 'book',
        title: 'Книги',
        products: [
          {
            image: 'Java.webp',
            alt: 'java',
            title: 'Java: Библиотека программиста',
            price: '4000p',
          },
          {
            image: 'python.webp',
            alt: 'python',
            title: 'Изучаем Python',
            price: '1600p',
          },
          {
            image: 'javscript.webp',
            alt: 'javascript',
            title: 'Программирование на Javascript',
            price: '540p',
          },
          {
            image: 'dumai.webp',
            alt: 'dumai medlenno',
            title: 'думай медленно решай быстро',
            price: '987p',
          },
        ],
      },
      {
        id: 'tablet',
        title: 'Планшеты',
        products: [
          {
            image: 'ipad.webp',
            alt: 'ipad',
            title: 'iPad Pro 4',
            price: '220,000p',
          },
          {
            image: 'google.webp',
            alt: 'pixel tab',
            title: 'Google Pixel Tab 8',
            price: '60,000p',
          },
          {
            image: 'samsung-tab.webp',
            alt: 'samsung tab',
            title: 'Samsung Galaxy Tab S8',
            price: '87,499p',
          },
          {
            image: 'huawei-pad.webp',
            alt: 'huawei tab',
            title: 'Huawei Matepad Air 8',
            price: '54,523p',
          },
        ],
      },
    ];

    const quotes = [
      {
        text: 'Жизнь — это то, что с вами происходит, пока вы строите планы.',
        author: 'Джон Леннон',
      },
      {
        text: 'Что разум человека может постигнуть и во что он может поверить, того он способен достичь.',
        author: 'Наполеон Хилл',
      },
      {
        text: 'Стремитесь не к успеху, а к ценностям, которые он дает.',
        author: 'Альберт Эйнштейн',
      },
    ];

    return { products, categories, quotes };
  }

  @Get('/index')
  @Render('pages/index')
  getIndex() {
    const products = [
      {
        id: 1,
        image: 'samsung-tab.webp',
        alt: 'samsung tab',
        title: 'Samsung Galaxy Tab S8',
        price: '87,499p',
      },
      {
        id: 2,
        image: 'javscript.webp',
        alt: 'javascript',
        title: 'Программирование на Javascript',
        price: '540p',
      },
      {
        id: 3,
        image: 'ipad.webp',
        alt: 'ipad',
        title: 'iPad Pro 4',
        price: '220,000p',
      },
      {
        id: 4,
        image: 'huawei-pad.webp',
        alt: 'huawei tab',
        title: 'Huawei Matepad Air 8',
        price: '54,523p',
      },
      {
        id: 5,
        image: 'google.webp',
        alt: 'pixel tab',
        title: 'Google Pixel Tab 8',
        price: '60,000p',
      },
      {
        id: 6,
        image: 'dumai.webp',
        alt: 'dumai medlenno',
        title: 'думай медленно решай быстро',
        price: '987p',
      },
      {
        id: 7,
        image: 'python.webp',
        alt: 'python',
        title: 'Изучаем Python',
        price: '1600p',
      },
    ];

    const categories = [
      {
        id: 'smartphone',
        title: 'Смартфоны',
        products: [
          {
            image: 'iphone.webp',
            alt: 'iphone',
            title: 'iPhone 14 Pro Max',
            price: '160,000p',
          },
          {
            image: 'samsung.webp',
            alt: 'samsung',
            title: 'Samsung Galaxy A34',
            price: '35,000p',
          },
          {
            image: 'xiaomi.webp',
            alt: 'xiaomi',
            title: 'Xiaomi 13',
            price: '100,000p',
          },
          {
            image: 'huawei.webp',
            alt: 'huawei',
            title: 'Huawei P60 Pro',
            price: '54,000p',
          },
        ],
      },
      {
        id: 'book',
        title: 'Книги',
        products: [
          {
            image: 'Java.webp',
            alt: 'java',
            title: 'Java: Библиотека программиста',
            price: '4000p',
          },
          {
            image: 'python.webp',
            alt: 'python',
            title: 'Изучаем Python',
            price: '1600p',
          },
          {
            image: 'javscript.webp',
            alt: 'javascript',
            title: 'Программирование на Javascript',
            price: '540p',
          },
          {
            image: 'dumai.webp',
            alt: 'dumai medlenno',
            title: 'думай медленно решай быстро',
            price: '987p',
          },
        ],
      },
      {
        id: 'tablet',
        title: 'Планшеты',
        products: [
          {
            image: 'ipad.webp',
            alt: 'ipad',
            title: 'iPad Pro 4',
            price: '220,000p',
          },
          {
            image: 'google.webp',
            alt: 'pixel tab',
            title: 'Google Pixel Tab 8',
            price: '60,000p',
          },
          {
            image: 'samsung-tab.webp',
            alt: 'samsung tab',
            title: 'Samsung Galaxy Tab S8',
            price: '87,499p',
          },
          {
            image: 'huawei-pad.webp',
            alt: 'huawei tab',
            title: 'Huawei Matepad Air 8',
            price: '54,523p',
          },
        ],
      },
    ];

    const quotes = [
      {
        text: 'Жизнь — это то, что с вами происходит, пока вы строите планы.',
        author: 'Джон Леннон',
      },
      {
        text: 'Что разум человека может постигнуть и во что он может поверить, того он способен достичь.',
        author: 'Наполеон Хилл',
      },
      {
        text: 'Стремитесь не к успеху, а к ценностям, которые он дает.',
        author: 'Альберт Эйнштейн',
      },
    ];

    return { products, categories, quotes };
  }

  @Get('/category')
  @Render('pages/category')
  getCategory() {
    return;
  }

  @Get('/about')
  @Render('pages/about')
  getAbout() {
    return;
  }

  @Get('/buyList')
  @Render('pages/buyList')
  getBuyList() {
    return;
  }

  @Get('/profile')
  @Render('pages/profile')
  getProfile() {
    return;
  }

  @Get('/signUp')
  @Render('pages/signUp')
  getSignUp() {
    return;
  }
}
