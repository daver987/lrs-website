export interface Tour {
  title: string
  body: string
  image: string
  altText: string
}

export const ourTours = [
  {
    title: 'Niagara Falls',
    body: 'Niagara Falls is home to one of the most majestic and awe-inspiring sites in the world. The falls are a spectacle of beauty that shakes the earth with their roar. Anyone who visits Toronto should take the time to explore all that this fantastic site has to offer. We can help you get there.',
    image: 'niagara-falls',
    altText: 'Niagara-Falls',
  },
  {
    title: 'Niagara Winery Tour',
    body:
      'For those who are looking for an incredible day, we offer wine tours in Niagara. We have worked with some' +
      ' of the best wineries in the region and provide exclusive tours that offer one-of-a-kind experiences and' +
      ' memories.',
    image: 'Night-On-The-Town',
    altText: 'Niagara-Wine-Tour',
  },
  {
    title: 'Toronto city tour',
    body: 'For anyone who is looking for more than just the typical ride, we offer Toronto city tours. When you take a tour with us, you will be sure to see all the best attractions and landmarks that Toronto has to offer.',
    image: 'toronto',
    altText: 'Toronto=Tours',
  },
  {
    title: 'custom tours',
    body: ' If you are looking for a more intimate experience, we can create a custom tour for your group or family. Whether it is a bachelor party, bachelorette party, or any other special occasion, we offer transportation for all of these occasions and more',
    image: 'intercity-travel-1',
    altText: 'Custom-Tour-Services',
  },
] as Tour[]
