import { Controller, Get, Render, Session, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { Roles } from './auth/decorators/role.decorator';
import { Role } from './user/enum/role.enum';
import { UserService } from './user/user.service';

@ApiTags('views')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userSerivce: UserService,
  ) {}
  @ApiOperation({
    summary: 'get home page',
    description: 'If you want to show home page, call this api',
  })
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

  @ApiOperation({
    summary: 'Move to home page',
    description: 'If you want to show homepage, call this api too',
  })
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

  @ApiOperation({
    summary: 'show category page',
    description: 'If you want to show category page, call this api',
  })
  @Get('/category')
  @Render('pages/category')
  getCategory() {
    return;
  }

  @ApiOperation({
    summary: 'show about page',
    description: 'If you want to show information about us, call this api',
  })
  @Get('/about')
  @Render('pages/about')
  getAbout() {
    return;
  }

  @ApiOperation({
    summary: 'show buy list page',
    description: 'If you want to show your buy list, call this api',
  })
  @Get('/buyList')
  @Render('pages/buyList')
  getBuyList() {
    return;
  }

  @ApiOperation({
    summary: 'show profile page',
    description: 'If you want to show your profile, call this api',
  })
  @Get('/profile')
  @Render('pages/profile')
  @UseGuards(new AuthGuard(), RoleGuard)
  async getProfile(@Session() session: SessionContainer) {
    const userId = session.getUserId();
    const user = await this.userSerivce.findById(userId);
    return { user };
  }

  @ApiOperation({
    summary: 'go to sign up',
    description: 'If you want to sign up new account, call this api',
  })
  @Get('/signUp')
  @Render('pages/signUp')
  getSignUp() {
    return;
  }

  @ApiOperation({
    summary: 'go to login',
    description: 'If you want to login, call this api',
  })
  @Get('/login')
  @Render('pages/login')
  getLogin() {
    return;
  }

  // @ApiOperation({
  //   summary: 'check announce from admin',
  //   description: 'Get realtime announce',
  // })
  // @Get('/announce')
  // @Render('pages/announce')
  // getAnnounce() {
  //   return;
  // }

  @ApiOperation({
    summary: 'chat',
    description: 'chat',
  })
  @Get('/chat')
  @Render('pages/chat')
  async getAnnouncement() {
    return;
  }

  @Get('/test')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard(), RoleGuard)
  @Roles(Role.user)
  async getTest(@Session() session: SessionContainer): Promise<string> {
    // TODO: magic
    return 'userId: ' + session.getUserId;
  }
}
