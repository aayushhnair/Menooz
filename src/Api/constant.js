import images from '../assets/images';
import strings from '../i18n/strings';
import {StackNav} from '../navigation/NavigationKeys';

const {
  Category_Vegetables_Selected,
  Category_MeatFish,
  Category_Medicine,
  Category_BabyCare,
  Category_OfficeSupplies,
  Category_Beauty,
  Category_Gym,
  DotMenu,
  Category_Pack,
  Category_EyeWear,
  Category_PetCare,
  Category_GardeningTools,
  COD,
  MasterCard,
  PayPal,
} = require('../assets/svgs');

const restaurent = [
  {
    productId: 3,
    categoryID: 0,
    productName: 'Apple Bakery',
    originalPrice: 17,
    revisedPrice: 11,
    isNew: 1,
    wight: 1,
    rating: 5,
    isFavorite: false,
    productDetails:
      'Duis aute veniam veniam qui aliquip irure duis sint magna occaecat dolore nisi culpa do. Est nisi incididunt aliquip commodo aliqua tempor.',
    imageLink: "https://freerangestock.com/sample/161954/street-view-of-bread-ahead-bakery-and-school.jpg",
  },
  {
    productId: 5,
    categoryID: 0,
    productName: 'Sri Naruvizhi Hotel',
    originalPrice: 10,
    revisedPrice: 8,
    isNew: 1,
    wight: 1,
    rating: 2,
    isFavorite: false,
    productDetails:
      'Duis aute veniam veniam qui aliquip irure duis sint magna occaecat dolore nisi culpa do. Est nisi incididunt aliquip commodo aliqua tempor.',
    imageLink: "https://media-cdn.tripadvisor.com/media/photo-s/1b/a3/a1/89/var-baguetteria-hittar.jpg",
  },
  {
    productId: 5,
    categoryID: 0,
    productName: 'Surya Hotel',
    originalPrice: 10,
    revisedPrice: 8,
    isNew: 1,
    wight: 1,
    rating: 2,
    isFavorite: false,
    productDetails:
      'Duis aute veniam veniam qui aliquip irure duis sint magna occaecat dolore nisi culpa do. Est nisi incididunt aliquip commodo aliqua tempor.',
    imageLink: "https://png.pngtree.com/background/20230526/original/pngtree-3d-rendered-cafe-house-on-street-picture-image_2744694.jpg",
  },
];

const vegetables = [

];


const MeatFish = [

];

const pack = [
  {
    productId: 0,
    categoryID: 11,
    isPopular: 0,
    size: 'Medium',
    productName: 'Medium Spices Pack',
    originalPrice: 15,
    revisedPrice: 10,
    wight: 0,
    rating: 4,
    isFavorite: false,
    productList: [MeatFish[0], MeatFish[1], vegetables[1]],
    productDetails:
      'Duis aute veniam veniam qui aliquip irure duis sint magna occaecat dolore nisi culpa do. Est nisi incididunt aliquip commodo aliqua tempor.',
    imageLink: images.pack1,
  },
  {
    productId: 1,
    categoryID: 11,
    isPopular: 0,
    size: 'Large',
    productName: 'Big Fruits Pack',
    originalPrice: 15,
    revisedPrice: 10,
    wight: 0,
    rating: 4,
    isFavorite: false,
    productList: [MeatFish[0], MeatFish[1], vegetables[1]],
    productDetails:
      'Duis aute veniam veniam qui aliquip irure duis sint magna occaecat dolore nisi culpa do. Est nisi incididunt aliquip commodo aliqua tempor.',
    imageLink: images.pack2,
  },
  {
    productId: 2,
    categoryID: 11,
    isPopular: 1,
    size: 'Small',
    productName: 'Small Bundle Pack',
    originalPrice: 30,
    revisedPrice: 10,
    wight: 0,
    rating: 5,
    isFavorite: false,
    productList: [MeatFish[2], vegetables[2], vegetables[3], vegetables[1]],
    productDetails:
      'Duis aute veniam veniam qui aliquip irure duis sint magna occaecat dolore nisi culpa do. Est nisi incididunt aliquip commodo aliqua tempor.',
    imageLink: images.pack3,
  },
  {
    productId: 3,
    categoryID: 11,
    isPopular: 1,
    size: 'Medium',
    productName: 'Small Fruits Pack',
    originalPrice: 15,
    revisedPrice: 10,
    wight: 0,
    rating: 5,
    isFavorite: false,
    productList: [MeatFish[0], MeatFish[1], vegetables[1]],
    productDetails:
      'Duis aute veniam veniam qui aliquip irure duis sint magna occaecat dolore nisi culpa do. Est nisi incididunt aliquip commodo aliqua tempor.',
    imageLink: images.pack4,
  },
];

const popularPack = pack.filter(item => item.isPopular);
const newItem = restaurent;
// const newItem = restaurent.concat(MeatFish).filter(item => item.isNew);
const category = [
  {
    categoryID: 0,
    categoryname: 'Nearest Menooz',
    categoryIcon: <Category_Vegetables_Selected />,
    product: vegetables,
  },
];
const MyFavoriteList = [
  {
    productId: 0,
    categoryID: 0,
    productName: 'Oreo Biscut',
    originalPrice: 10,
    revisedPrice: 8,
    isNew: 1,
    wight: 1,
    rating: 5,
    isFavorite: true,
    productDetails:
      'Duis aute veniam veniam qui aliquip irure duis sint magna occaecat dolore nisi culpa do. Est nisi incididunt aliquip commodo aliqua tempor.',
    imageLink: images.oreo,
  },
  {
    productId: 1,
    categoryID: 0,
    productName: 'Sulphurfree Bura',
    originalPrice: 15,
    revisedPrice: 10,
    isNew: 1,
    wight: 1,
    rating: 5,
    isFavorite: true,
    productDetails:
      'Duis aute veniam veniam qui aliquip irure duis sint magna occaecat dolore nisi culpa do. Est nisi incididunt aliquip commodo aliqua tempor.',
    imageLink: images.bura,
  },
  {
    productId: 2,
    categoryID: 0,
    productName: 'Caulifiower ',
    originalPrice: 14,
    revisedPrice: 9,
    isNew: 1,
    wight: 1,
    rating: 5,
    isFavorite: true,
    productDetails:
      'Duis aute veniam veniam qui aliquip irure duis sint magna occaecat dolore nisi culpa do. Est nisi incididunt aliquip commodo aliqua tempor.',
    imageLink: images.cauliflower,
  },
  {
    productId: 3,
    categoryID: 0,
    productName: 'Tomato',
    originalPrice: 10,
    revisedPrice: 5,
    isNew: 1,
    wight: 1,
    rating: 5,
    isFavorite: true,
    productDetails:
      'Duis aute veniam veniam qui aliquip irure duis sint magna occaecat dolore nisi culpa do. Est nisi incididunt aliquip commodo aliqua tempor.',
    imageLink: images.tomato,
  },
  {
    productId: 4,
    categoryID: 0,
    productName: 'Girl Guide Biscuits',
    originalPrice: 30,
    revisedPrice: 18,
    isNew: 1,
    wight: 1,
    rating: 5,
    isFavorite: true,
    productDetails:
      'Duis aute veniam veniam qui aliquip irure duis sint magna occaecat dolore nisi culpa do. Est nisi incididunt aliquip commodo aliqua tempor.',
    imageLink: images.GirlsGuideBiscuit,
  },
  {
    productId: 5,
    categoryID: 0,
    productName: "Arnott's",
    originalPrice: 20,
    revisedPrice: 15,
    isNew: 1,
    wight: 1,
    rating: 5,
    isFavorite: true,
    productDetails:
      'Duis aute veniam veniam qui aliquip irure duis sint magna occaecat dolore nisi culpa do. Est nisi incididunt aliquip commodo aliqua tempor.',
    imageLink: images.arnotts,
  },
  {
    productId: 6,
    categoryID: 0,
    productName: 'Potato',
    originalPrice: 10,
    revisedPrice: 8,
    isNew: 1,
    wight: 1,
    rating: 5,
    isFavorite: true,
    productDetails:
      'Duis aute veniam veniam qui aliquip irure duis sint magna occaecat dolore nisi culpa do. Est nisi incididunt aliquip commodo aliqua tempor.',
    imageLink: images.potato,
  },
];
const Address = [
  {
    addressId: 0,
    addressName: 'Home Address',
    address: 'B-1/2, Sector-18, Rohini, Delhi-110089',
    isDefault: true,
    contactNo: '9876543210',
  },
  {
    addressId: 1,
    addressName: 'Office Address',
    address: 'H-1/2, Sector-14, Rohini, Delhi-110089',
    isDefault: false,
    contactNo: '9876543210',
  },
  {
    addressId: 2,
    addressName: 'Relative Address',
    address: 'H-1/2, Sector-13, Rohini, Delhi-000007',
    isDefault: false,
    contactNo: '9876543210',
  },
];

const paymentMethodList = [
  { 
    paymentTrancsactionType: "UPI",
    paymentMethodId: 0,
    paymentMethodName: 'Pay Pal',
    paymentMethodIcon: <PayPal />,
  },
  {
    paymentTrancsactionType: "CARD",
    paymentMethodId: 1,
    paymentMethodName: 'Master Card',
    paymentMethodIcon: <MasterCard />,
  },
];
const recentSearches = [
  {
    search_id: 0,
    search_name: 'Tomato',
  },
  {
    search_id: 1,
    search_name: 'Potato',
  },
  {
    search_id: 2,
    search_name: 'Cauliflower',
  },
  {
    search_id: 3,
    search_name: 'Carat',
  },
  {
    search_id: 4,
    search_name: 'Vegetables',
  },
  {
    search_id: 5,
    search_name: 'Gourd',
  },
  {
    search_id: 6,
    search_name: 'Meat',
  },
];

const Brands = [
  {id: 1, categoryname: 'Nike'},
  {id: 2, categoryname: 'Adidas'},
  {id: 3, categoryname: 'Apple'},
  {id: 4, categoryname: 'Samsung'},
  {id: 5, categoryname: 'Google'},
  {id: 6, categoryname: 'Microsoft'},
  {id: 7, categoryname: 'Amazon'},
];

const OrderListData = [
  {
    order_id: '1583242738',
    order_date: 1643836800,
    order_status: 'Confirmed',
    productDetail: [MeatFish[0], MeatFish[1], vegetables[1]],
    total_amount: '',
    paymentMethod: 'Debit Card',
    order_confirmed_date: 1643836800,
    order_processing_date: '',
    order_shipped_date: '',
    order_delivered_date: '',
    order_canceled_date: '',
  }
];

const CouponList = [
  {
    coupon_id: 1,
    product_name: 'Tomato',
    offer_percentage: 20,
    expiry_date: 1621958400,
    offer_details: [
      'Buy 1 kg, get 20% off',
      'Applicable on purchases above $10',
      'Valid at all participating stores',
      'Not Valid With Any Other Discount And Promotion',
    ],
    coupon_code: 'A1B2C3D4E5F6',
  },
  {
    coupon_id: 2,
    product_name: 'Potato',
    offer_percentage: 15,
    expiry_date: 1621958400,
    offer_details: [
      'Buy 2 kg, get 15% off',
      'Minimum purchase of $5 required',
      'Not valid on online orders',
      'Not Valid With Any Other Discount And Promotion',
    ],
    coupon_code: 'G7H8I9J0K1L2',
  },
  {
    coupon_id: 3,
    product_name: 'Sunflower Oil',
    offer_percentage: 10,
    expiry_date: 1621958400,
    offer_details: [
      'Get 10% off on Sunflower Oil',
      'Valid at select stores only',
      'Not applicable on discounted items',
      'Not Valid With Any Other Discount And Promotion',
    ],
    coupon_code: 'M3N4O5P6Q7R8',
  },
  {
    coupon_id: 4,
    product_name: 'Tuna Fish',
    offer_percentage: 25,
    expiry_date: 1621958400,
    offer_details: [
      'Buy 1 kg, get 25% off',
      'Applicable on purchases above $15',
      'Not valid on public holidays',
      'Not Valid With Any Other Discount And Promotion',
    ],
    coupon_code: 'S9T0U1V2W3X4',
  },
  {
    coupon_id: 5,
    product_name: 'Coffee',
    offer_percentage: 10,
    expiry_date: 1621958400,
    offer_details: [
      'Buy 2 bags, get 10% off',
      'Applicable on any coffee variety',
      'Valid for in-store purchases only',
      'Not Valid With Any Other Discount And Promotion',
    ],
    coupon_code: 'Y5Z6A7B8C9D0',
  },
  {
    coupon_id: 6,
    product_name: 'Broccoli',
    offer_percentage: 30,
    expiry_date: 1621958400,
    offer_details: [
      'Buy 1 kg, get 30% off',
      'Minimum purchase of $5 required',
      'Not valid on discounted items',
      'Not Valid With Any Other Discount And Promotion',
    ],
    coupon_code: 'E1F2G3H4I5J6',
  },
  {
    coupon_id: 7,
    product_name: 'Carrots',
    offer_percentage: 15,
    expiry_date: 1621958400,
    offer_details: [
      'Buy 2 kg, get 15% off',
      'Applicable on purchases above $8',
      'Valid at all stores',
      'Not Valid With Any Other Discount And Promotion',
    ],
    coupon_code: 'K7L8M9N0O1P2',
  },
  {
    coupon_id: 8,
    product_name: 'Salmon',
    offer_percentage: 20,
    expiry_date: 1621958400,
    offer_details: [
      'Buy 1 kg, get 20% off',
      'Minimum purchase of $20 required',
      'Not valid on frozen products',
      'Not Valid With Any Other Discount And Promotion',
    ],
    coupon_code: 'Q3R4S5T6U7V8',
  },
  {
    coupon_id: 9,
    product_name: 'Cucumber',
    offer_percentage: 10,
    expiry_date: 1621958400,
    offer_details: [
      'Buy 3 kg, get 10% off',
      'Applicable on purchases above $8',
      'Valid for online orders only',
      'Not Valid With Any Other Discount And Promotion',
    ],
    coupon_code: 'W9X0Y1Z2A3B4',
  },
  {
    coupon_id: 10,
    product_name: 'Avocado',
    offer_percentage: 25,
    expiry_date: 1621958400,
    offer_details: [
      'Buy 2 avocados, get 25% off',
      'Minimum purchase of $10 required',
      'Valid at select stores',
      'Not Valid With Any Other Discount And Promotion',
    ],
    coupon_code: 'C5D6E7F8G9H0',
  },
  {
    coupon_id: 11,
    product_name: 'Eggplant',
    offer_percentage: 15,
    expiry_date: 1621958400,
    offer_details: [
      'Buy 1 kg, get 15% off',
      'Applicable on purchases above $5',
      'Valid at all participating stores',
      'Not Valid With Any Other Discount And Promotion',
    ],
    coupon_code: 'I1J2K3L4M5N6',
  },
  {
    coupon_id: 12,
    product_name: 'Lettuce',
    offer_percentage: 10,
    expiry_date: 1621958400,
    offer_details: [
      'Buy 2 lettuces, get 10% off',
      'Minimum purchase of $3 required',
      'Valid at select stores only',
      'Not Valid With Any Other Discount And Promotion',
    ],
    coupon_code: 'O7P8Q9R0S1T2',
  },
];

const deliveryAddress = [
  {
    addressId: 0,
    fullName: 'John Doe',
    addressName: 'Home Address',
    address: 'B-1/2, Sector-18, Rohini, Delhi-110089',
    isDefault: true,
    contactNo: '9876543210',
    addressLink1: 'B-1/2, Sector-18',
    addressLink2: 'DIU Road, Rohini',
    state: 'Delhi',
    city: 'Rohini',
    zipCode: '110089',
  },
  {
    addressId: 1,
    fullName: 'Jane Smith',
    addressName: 'Office Address',
    address: 'H-1/2, Sector-14, Rohini, Delhi-110089',
    isDefault: false,
    contactNo: '9876543210',
    addressLink1: 'H-1/2, Sector-14',
    addressLink2: 'Noiada Road, Rohini',
    state: 'Delhi',
    city: 'Rohini',
    zipCode: '110089',
  },
  {
    addressId: 2,
    fullName: 'Alex Johnson',
    addressName: 'Relative Address',
    address: 'H-1/2, Sector-13, Rohini, Delhi-000007',
    isDefault: false,
    contactNo: '9876543210',
    addressLink1: 'H-1/2, Sector-13',
    addressLink2: 'Rajpath Road, Rohini',
    state: 'Delhi',
    city: 'Rohini',
    zipCode: '000007',
  },
  {
    addressId: 3,
    fullName: 'Emily Wilson',
    addressName: 'Relative Address',
    address: 'H-1/2, Sector-15, Rohini, Delhi-000007',
    isDefault: false,
    contactNo: '9876543210',
    addressLink1: 'H-1/2, Sector-15',
    addressLink2: 'Indirapuram Road, Rohini',
    state: 'Delhi',
    city: 'Rohini',
    zipCode: '000007',
  },
];

const settingData = [
  {
    id: 1,
    title: 'Language',
    route: StackNav.SelectLanguage,
  },
  {
    id: 2,
    title: 'Change Password',
    route: StackNav.ChangePassword,
  },
  {
    id: 3,
    title: 'Edit Home Address',
  },
  {
    id: 4,
    title: 'Location',
  },
  {
    id: 5,
    title: 'Change Phone Number',
    route: StackNav.ChangePhoneNumber,
  },
  {
    id: 6,
    title: strings.aboutUs,
    route: StackNav.AboutUs,
  },
  {
    id: 7,
    title: strings.faq,
    route: StackNav.Faq,
  },
  {
    id: 8,
    title: strings.termAndConditions,
    route: StackNav.TermAndConditions,
  },
  {
    id: 9,
    title: strings.help,
    route: StackNav.Help,
  },
  {
    id: 10,
    title: strings.contactUs,
    route: StackNav.ContactUs,
  },
  {
    id: 11,
    title: 'Deactivate Account',
  },
];

const languageData = [
  {
    title: 'Suggested',
    data: [{lnName: 'English(US)'}, {lnName: 'English(UK)'}],
  },
  {
    title: 'Language',
    data: [
      {
        lnName: 'English',
      },
      {
        lnName: 'Spanish',
      },
      {
        lnName: 'French',
      },
      {
        lnName: 'German',
      },
      {
        lnName: 'Italian',
      },
      {
        lnName: 'Portuguese',
      },
      {
        lnName: 'Russian',
      },
      {
        lnName: 'Turkish',
      },
      {
        lnName: 'Chinese',
      },
      {
        lnName: 'Japanese',
      },
      {
        lnName: 'Korean',
      },
      {
        lnName: 'Arabic',
      },
      {
        lnName: 'Hindi',
      },
      {
        lnName: 'Indonesian',
      },
      {
        lnName: 'Malay',
      },
      {
        lnName: 'Thai',
      },
    ],
  },
];

const faqData = [
  {
    id: 1,
    question: '1). How do I place an order?',
    answer:
      'You can place an order by following these easy steps: \n' +
      '1. Select the product you want to buy.\n' +
      '2. Add the product to your cart.\n' +
      '3. Enter your shipping address.\n' +
      '4. Choose your payment method.\n' +
      '5. Place your order.\n' +
      '6. You will receive an order confirmation message.\n' +
      '7. You will receive a message when your order is shipped.\n' +
      '8. You will receive a message when your order is delivered.\n' +
      '9. You can also track your order by going to the “My Orders” section in your account.',
  },
  {
    id: 2,
    question: '2). How do I cancel my order?',
    answer:
      'You can cancel your order by going to the “My Orders” section in your account. \n' +
      'If your order has already been shipped, you will not be able to cancel it. \n' +
      'If you have already paid for your order, you will receive a refund in your account within 7-10 business days.',
  },
];

const termsAndConditionsData = [
  {
    id: 1,
    title: '1. Introduction',
    description:
      'These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Webiste Name accessible at Website.com.\n' +
      'These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.\n' +
      'Minors or people below 18 years old are not allowed to use this Website.',
  },
  {
    id: 2,
    title: '2. Intellectual Property Rights',
    description:
      'Other than the content you own, under these Terms, Company Name and/or its licensors own all the intellectual property rights and materials contained in this Website.\n' +
      'You are granted limited license only for purposes of viewing the material contained on this Website.',
  },
  {
    id: 3,
    title: '3. Restrictions',
    description:
      'You are specifically restricted from all of the following:\n' +
      'publishing any Website material in any other media;\n' +
      'selling, sublicensing and/or otherwise commercializing any Website material;\n' +
      'publicly performing and/or showing any Website material;\n' +
      'using this Website in any way that is or may be damaging to this Website;\n' +
      'using this Website in any way that impacts user access to this Website;\n' +
      'using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;\n' +
      'engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;\n' +
      'using this Website to engage in any advertising or marketing.\n' +
      'Certain areas of this Website are restricted from being access by you and Company Name may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well.',
  },
  {
    id: 4,
    title: '4. Your Content',
    description:
      'In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant Company Name a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.\n' +
      'Your Content must be your own and must not be invading any third-party’s rights. Company Name reserves the right to remove any of Your Content from this Website at any time without notice.',
  },
];

const helpData = [
  {
    title: 'Top Questions',
    data: [
      'How do I return my items?',
      'How do I track my order?',
      'How do I cancel my order?',
      'How do I return my items?',
      'How can i add new delivery address?',
      'What is Grocery?',
      'How can i avail Sticker Price?',
    ],
  },
  {
    title: 'Topics',
    data: [
      'My Account',
      'My Orders',
      'My Address',
      'My Payment',
      'My Favorites',
      'My Coupons',
      'My Referrals',
      'My Settings',
    ],
  },
];

const reviewsData = [
  {
    id: 1,
    name: 'John Duew',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',

    rating: 5,
    review:
      'The item is very good, my son likes it very much and plays every day 💯💯💯',
    like: 352,
    time: '6 days ago',
  },
  {
    id: 2,
    name: 'Jane Doe',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',

    rating: 4,
    review:
      'The item is good, but it could be better. My son likes it, but he has some complaints about it.',
    like: 100,
    time: '2 days ago',
  },
  {
    id: 3,
    name: 'Bob Smith',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',

    rating: 3,
    review:
      'The item is okay, but it could be better. My son likes it, but he has some complaints about it.',
    like: 50,
    time: '1 day ago',
  },
  {
    id: 4,
    name: 'Alice Johnson',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',

    rating: 2,
    review:
      'The item is not very good. My son does not like it very much and does not play with it often.',
    like: 10,
    time: '1 hour ago',
  },
  {
    id: 5,
    name: 'Tom Hanks',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',

    rating: 1,
    review:
      'The item is terrible. My son hates it and does not play with it at all.',
    like: 1,
    time: '1 minute ago',
  },
  {
    id: 6,
    name: 'Megan Fox',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',

    rating: 5,
    review:
      'The item is very good, my son likes it very much and plays every day 💯💯💯',
    like: 352,
    time: '6 days ago',
  },
  {
    id: 7,
    name: 'Samantha Smith',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',

    rating: 4,
    review:
      'The item is good, but it could be better. My daughter likes it, but she has some complaints about it.',
    like: 200,
    time: '3 days ago',
  },
  {
    id: 8,
    name: 'David Johnson',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',

    rating: 3,
    review:
      'The item is okay, but it could be better. My daughter likes it, but she has some complaints about it.',
    like: 100,
    time: '2 days ago',
  },
  {
    id: 9,
    name: 'Emily Brown',
    image: 'https://randomuser.me/api/portraits/women/5.jpg',

    rating: 2,
    review:
      'The item is not very good. My daughter does not like it very much and does not play with it often.',
    like: 20,
    time: '1 day ago',
  },
  {
    id: 10,
    name: 'Olivia Davis',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',

    rating: 1,
    review:
      'The item is terrible. My daughter hates it and does not play with it at all.',
    like: 2,
    time: '1 hour ago',
  },
  {
    id: 11,
    name: 'Sophia Wilson',
    image: 'https://randomuser.me/api/portraits/women/7.jpg',

    rating: 5,
    review:
      'The item is very good, my daughter likes it very much and plays every day 💯💯💯',
    like: 352,
    time: '6 days ago',
  },
];

export {
  category,
  restaurent,
  vegetables,
  MeatFish,
  popularPack,
  newItem,
  MyFavoriteList,
  Address,
  paymentMethodList,
  recentSearches,
  Brands,
  OrderListData,
  CouponList,
  deliveryAddress,
  settingData,
  languageData,
  faqData,
  termsAndConditionsData,
  helpData,
  reviewsData,
};
