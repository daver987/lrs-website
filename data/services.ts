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
    aboveHeading: 'EXPERIENCE LUXURY TRAVEL',
    body: "Navigating the airport can be a stressful experience, but with High Park Livery's limousine service, it doesn't have to be. Our drivers are available around the clock to pick you up at any terminal and ensure a timely arrival for your departure flight. We also monitor your flight arrivals, guaranteeing our prompt presence regardless of flight delays or early arrivals. This attention to detail makes international travel less intimidating, as you can avoid concerns about security checks and lengthy wait times. Choose High Park Livery for a hassle-free airport experience.",
    image: 'images/airport-7.jpg',
    altText: 'Airport-Service',
    boxPosition: 'md:col-span-2 md:grid md:grid-cols-2 mb-8',
    imagePosition: 'md:col-span-1 md:col-start-2 md:self-center',
    infoPosition: 'md:col-span-1 md:col-start-1 md:row-start-1',
    infoBoxPosition: 'bg-white shadow-xl self-center dark:bg-neutral-700',
  },
  {
    title: 'POINT TO POINT',
    aboveHeading: 'ARRIVE IN STYLE AND ON TIME',
    body: "Experience unmatched convenience with our point-to-point transfer services, designed to cater to your transportation needs seamlessly. High Park Livery takes pride in offering personalized services that address the specific requirements of our clients. Our professional drivers and well-maintained vehicles ensure you arrive at your destination in style and on time, every time. Whether you're traveling for business or leisure, trust High Park Livery to deliver a superior transportation experience, prioritizing your satisfaction and comfort.",
    image: 'images/corporate-1.jpg',
    altText: 'Point-To-Point',
    boxPosition: 'md:col-span-2 md:grid md:grid-cols-2 mb-8',
    imagePosition: 'md:col-span-1 md:col-start-1 md:self-center',
    infoPosition: 'md:col-span-1 md:col-start-2 row-start-1',
    infoBoxPosition: 'bg-white shadow-xl self-center dark:bg-neutral-700',
  },
  {
    title: 'NIGHT ON THE TOWN',
    aboveHeading: 'ELEVATE YOUR NIGHT OUT',
    body: "Make any occasion unforgettable with High Park Livery's exceptional night on the town transportation services. From birthdays and bachelor/bachelorette parties to anniversaries and other special milestones, our experienced drivers are dedicated to providing a memorable and enjoyable experience. With a keen focus on both fun and safety, you can count on High Park Livery to make your night out a truly elevated experience. Relax, celebrate, and leave the driving to us as you enjoy the luxury of our top-of-the-line vehicles.",
    image: 'images/toronto-1.jpg',
    boxPosition:
      'md:col-span-1 md:col-start-1 row-start-3 md:grid md:grid-cols-1 mb-8',
    imagePosition: 'md:col-span-1 md:row-start-1 md:max-w-md md:mx-auto',
    infoPosition: 'md:self-stretch md:col-span-1 md:row-start-2',
    infoBoxPosition:
      'bg-white shadow-xl px-4 py-6 md:px-6 lg:px-8 md:mx-2 md:pt-16 md:-mt-16 dark:bg-neutral-700',
  },
  {
    title: 'HOURLY SERVICE',
    aboveHeading: 'CUSTOMIZED CHAUFFEUR SERVICES',
    body: 'Discover the flexibility and convenience of our hourly service, available with a minimum booking of two hours. Ideal for running errands, attending appointments, or providing transportation for friends and family, our hourly service is also perfect for date nights and festive occasions. High Park Livery understands that transportation needs can vary, which is why we offer tailored packages designed to maximize convenience and meet the unique requirements of our clients.',
    image: 'images/misc-2.jpg',
    altText: 'Hourly-Service',
    boxPosition:
      'md:col-span-1 md:col-start-2 md:row-start-3 md:grid md:grid-cols-1 mb-8',
    imagePosition: 'md:col-span-1 md:row-start-1 md:max-w-md md:mx-auto',
    infoPosition: 'md:col-span-1 md:row-start-2',
    infoBoxPosition:
      'bg-white shadow-xl px-4 py-6 md:px-6 lg:px-8 md:mx-2 md:pt-16 md:-mt-16 dark:bg-neutral-700',
  },
  {
    title: 'Business Transportation',
    aboveHeading: 'IMPECCABLE CORPORATE TRAVEL',
    body: 'High Park Livery is your go-to solution for all corporate car service needs. We recognize the crucial importance of punctuality and preparedness for business meetings and events. Our experienced drivers excel at adapting to any situation, going the extra mile to accommodate your needs and deliver a seamless, efficient travel experience. With High Park Livery, you can focus on your business while we take care of your transportation.',
    image: 'images/corporate-6.jpg',
    altText: 'Corporate-Travel',
    boxPosition: 'md:col-span-2 md:grid md:grid-cols-2 mb-8',
    imagePosition: 'md:col-span-1 md:col-start-2 md:self-center',
    infoPosition: 'md:col-span-1 md:col-start-1 md:row-start-1',
    infoBoxPosition: 'bg-white shadow-xl self-center dark:bg-neutral-700',
  },
  {
    title: 'Intercity Services',
    aboveHeading: 'ENJOY STRESS-FREE INTERCITY TRAVEL',
    body: "Choose High Park Livery's intercity travel service for a swift, comfortable journey between cities. Our service offers a premier alternative to trains, planes, and buses, ensuring that every aspect of your trip is taken care of. Sit back and enjoy the ride as our professional drivers navigate the roads, providing refreshing beverages and a luxurious atmosphere for your journey. With High Park Livery's intercity services, you can appreciate the difference that comes from prioritizing customer satisfaction and comfort.",
    image: 'images/corporate-7.jpg',
    altText: 'Intercity-Travel',
    boxPosition: 'md:col-span-2 md:grid md:grid-cols-2 mb-8',
    imagePosition: 'md:col-span-1 md:col-start-1 md:self-center',
    infoPosition: 'md:col-span-1 md:col-start-2 row-start-1',
    infoBoxPosition: 'bg-white shadow-xl self-center dark:bg-neutral-700',
  },
] as Service[]
