export interface Service {
  title: string
  body: string
  image: string
  altText: string
  boxPosition: string
  imagePosition: string
  infoPosition: string
  infoBoxPosition: string
  aboveHeading: string
}

export const services = [
  {
    title: 'Airport Services',
    aboveHeading: 'TRAVEL IN COMFORT',
    body: "Spending hours at the airport can be a hassle, but with High Park Livery's limousine service, it doesn't haveto be. Our drivers are available 24/7 to pick you up at any terminal and drop you off for your departure flight. We also track your flight for arrivals, so you can be assured that we will be there for you no matter if your flight is delayed or early. This makes the process of flying internationally less daunting, as you wont have to worry about security checks and long wait times. Book with High Park Livery for a seamless airport experience.",
    image:
      'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/11372c60-0fbb-4ed7-3984-b509397a4300/1920',
    altText: 'Airport-Service',
    boxPosition: 'md:col-span-2 md:grid md:grid-cols-2 mb-8',
    imagePosition: 'md:col-span-1 md:col-start-2 md:self-center',
    infoPosition: 'md:col-span-1 md:col-start-1 md:row-start-1',
    infoBoxPosition: 'bg-white shadow-xl self-center',
  },
  {
    title: 'POINT TO POINT',
    aboveHeading: 'ALWAYS BE ON TIME',
    body: 'Point-to-point transfers are an excellent choice for anyone who wants more convenience when it comes to transportation. Many people rely on our company, and we work hard to provide them with a solution that matches up with their needs at all times. We will take care of every one of your needs and make sure that you are happy with what you get.',
    image:
      'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/6c03d826-c242-464c-3057-8328c95da100/1920',
    altText: 'Point-To-Point',
    boxPosition: 'md:col-span-2 md:grid md:grid-cols-2 mb-8',
    imagePosition: 'md:col-span-1 md:col-start-1 md:self-center',
    infoPosition: 'md:col-span-1 md:col-start-2 row-start-1',
    infoBoxPosition: 'bg-white shadow-xl self-center',
  },
  {
    title: 'NIGHT ON THE TOWN',
    aboveHeading: 'ENJOY YOURSELF',
    body: 'Whether it is a birthday, bachelor party, bachelorette party or any other special occasion, we offer transportation for all of these occasions and more. Our drivers have experience catering to those who are celebrating milestones in their lives. Not only will they go out of their way to make sure you have a great time, but they will also help to ensure that you are safe too!',
    image:
      'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/a6797e57-e8cd-4bf3-3665-13c499f90100/1920',
    boxPosition:
      'md:col-span-1 md:col-start-1 row-start-3 md:grid md:grid-cols-1 mb-8',
    imagePosition: 'md:col-span-1 md:row-start-1 md:max-w-md md:mx-auto',
    infoPosition: 'md:self-stretch md:col-span-1 md:row-start-2',
    infoBoxPosition:
      'bg-white shadow-xl px-4 py-6 md:px-6 lg:px-8 md:mx-2 md:pt-16 md:-mt-16',
  },
  {
    title: 'HOURLY SERVICE',
    aboveHeading: 'HAVE THE DRIVER WAIT',
    body: 'We offer hourly service with a minimum of two hours. Hourly car service is perfect for running errands, going to appointments, or even giving friends and family rides. Hourly service is also excellent for date nights and parties! Suppose you are unsure about what your transportation needs are. In that case, we offer packages that include everything you need to make it convenient.',
    image:
      'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/0bbff0c6-4751-4b32-278b-ef551b6a7200/1920',
    altText: 'Hourly-Service',
    boxPosition:
      'md:col-span-1 md:col-start-2 md:row-start-3 md:grid md:grid-cols-1 mb-8',
    imagePosition: 'md:col-span-1 md:row-start-1 md:max-w-md md:mx-auto',
    infoPosition: 'md:col-span-1 md:row-start-2',
    infoBoxPosition:
      'bg-white shadow-xl px-4 py-6 md:px-6 lg:px-8 md:mx-2 md:pt-16 md:-mt-16',
  },
  {
    title: 'CORPORATE TRAVEL',
    aboveHeading: 'DONT WORRY ABOUT MEETINGS',
    body: 'When you require a corporate car service, we offer the solution. We understand how crucial it is for those who work in the business world to be on time and prepared for meetings. Our drivers have years of experience and can adapt to any situation. They will also go out of their way to accommodate your needs, making the experience a great one!',
    image:
      'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/7dc32296-37c2-4bf2-e3f2-d2e2eae71900/1920',
    altText: 'Corporate-Travel',
    boxPosition: 'md:col-span-2 md:grid md:grid-cols-2 mb-8',
    imagePosition: 'md:col-span-1 md:col-start-2 md:self-center',
    infoPosition: 'md:col-span-1 md:col-start-1 md:row-start-1',
    infoBoxPosition: 'bg-white shadow-xl self-center',
  },
  {
    title: 'INTERCITY TRAVEL',
    aboveHeading: 'AVOID THE HASSLE',
    body: 'Intercity travel is a service that we offer for customers looking to get from point A to point B in the shortest possible time. If you are looking for an alternative to trains, planes, and buses, this will be an excellent solution. We take care of every single detail so that you can enjoy your trip. You will get a professional driver, freshly stocked beverages, and you will enjoy our luxurious atmosphere',
    image:
      'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/35e04a19-30b8-4ae8-d5b1-dffa5a1cc200/1920',
    altText: 'Intercity-Travel',
    boxPosition: 'md:col-span-2 md:grid md:grid-cols-2 mb-8',
    imagePosition: 'md:col-span-1 md:col-start-1 md:self-center',
    infoPosition: 'md:col-span-1 md:col-start-2 row-start-1',
    infoBoxPosition: 'bg-white shadow-xl self-center',
  },
] as Service[]
