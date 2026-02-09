export interface CoursePost {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
}

export interface CourseContent {
  intro: string;
  sections: {
    title: string;
    content: string;
  }[];
  author: {
    name: string;
    description: string;
  };
  comments: {
    id: number;
    userName: string;
    timestamp: string;
    comment: string;
    avatar?: string;
  }[];
}

export const coursePosts: CoursePost[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop',
    category: 'Cat',
    title: 'Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do',
    description: 'Dive into the curious world of cat behavior, exploring why cats knead, purr, and chase imaginary prey. This article helps pet owners decode their feline\'s actions and understand their unique personalities.',
    author: 'Thompson P.',
    date: '11 September 2024',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800&h=600&fit=crop',
    category: 'Categories cat',
    title: 'The Fascinating World of Cats: Why We Love Our Furry Friends',
    description: 'Cats have captivated human hearts for thousands of years. Whether lounging in a sunny spot or playfully chasing a string, these furry companions bring warmth and joy to our lives.',
    author: 'Thompson P.',
    date: '11 September 2024',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    category: 'Inspiration',
    title: 'Finding Motivation: How to Stay Inspired Through Life\'s Challenges',
    description: 'This article explores strategies to maintain motivation when faced with personal or professional challenges. From setting small goals to practicing mindfulness and self-care, discover ways to keep moving forward.',
    author: 'Thompson P.',
    date: '11 September 2024',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&h=600&fit=crop',
    category: 'Cat',
    title: 'The Science of the Cat\'s Purr: How It Benefits Cats and Humans Alike',
    description: 'Discover the fascinating science behind the cat\'s purr, including its potential healing properties for both cats and humans. Learn how this unique sound is produced and why it matters.',
    author: 'Thompson P.',
    date: '11 September 2024',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&h=600&fit=crop',
    category: 'General',
    title: 'The Art of Cat Photography: Capturing Your Feline\'s Best Moments',
    description: 'Learn professional tips and tricks for photographing cats, from lighting techniques to capturing their playful personalities. Make your cat the star of every photo.',
    author: 'Thompson P.',
    date: '11 September 2024',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&h=600&fit=crop',
    category: 'Cat',
    title: 'Caring for Senior Cats: A Guide to Their Golden Years',
    description: 'As cats age, their needs change. This comprehensive guide covers everything you need to know about caring for senior cats, from diet adjustments to health monitoring.',
    author: 'Thompson P.',
    date: '11 September 2024',
  },
];

export const courseContents: Record<number, CourseContent> = {
  2: {
    intro: 'Cats have captivated human hearts for thousands of years. Whether lounging in a sunny spot or playfully chasing a string, these furry companions bring warmth and joy to our lives. But what is it about cats that makes them such beloved pets? In this article, we\'ll explore their independent nature, playful personalities, health benefits for their owners, and the deep historical bond we share with them.',
    sections: [
      {
        title: '1. Independent Yet Affectionate',
        content: 'Cats are often perceived as aloof or independent creatures, and while it\'s true they enjoy their alone time, they are also capable of forming deep emotional bonds with their owners. Unlike dogs, who are often eager to please, cats tend to show affection on their own terms. This unique combination of independence and love is part of what makes them so intriguing.\n\nThe way a cat rubs against your leg, slow-blinks at you, or curls up on your lap is their way of saying "I love you." Understanding and appreciating these subtle signs of affection can greatly enhance the bond between a cat and its owner.',
      },
      {
        title: '2. Playful Personalities',
        content: 'Any cat owner will tell you that playtime is a crucial part of a cat\'s day. From chasing laser pointers to pouncing on feather toys, cats are natural hunters and need play to satisfy their instincts. This playful behavior isn\'t just entertaining for owners—it\'s essential for a cat\'s physical and mental well-being.\n\nToys and interactive games stimulate a cat\'s mind and help prevent boredom, which can lead to destructive behaviors. Regular play sessions also provide exercise, keeping your feline fit and healthy.',
      },
      {
        title: '3. Health Benefits of Owning a Cat',
        content: 'Did you know that owning a cat can be good for your health? Studies have shown that cat owners tend to have lower stress levels and reduced risk of heart disease. The soothing sound of a cat\'s purr has been linked to lower blood pressure and can even promote healing in bones and tissues.\n\nCats also provide companionship that can help alleviate feelings of loneliness and depression. Their presence alone can bring comfort and joy, making them ideal pets for people of all ages.',
      },
      {
        title: '4. A History with Humans',
        content: 'Cats have been companions to humans for over 9,000 years. Originally domesticated in the Near East, they were valued for their ability to hunt pests and protect grain stores. Over time, cats became revered in many cultures, most notably in ancient Egypt, where they were considered sacred animals.\n\nToday, cats continue to hold a special place in our hearts and homes. Whether as internet celebrities or cherished pets, they remain one of the most popular animals in the world, and their bond with humans shows no signs of weakening.',
      },
    ],
    author: {
      name: 'Chompoo22',
      description: 'I am a content creator. Enjoy writing about cats, I have 3 cats. I live in Bangkok, Thailand',
    },
    comments: [
      {
        id: 1,
        userName: 'Jacob Lash',
        timestamp: '12 September 2024 at 18:38',
        comment: 'I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.',
      },
      {
        id: 2,
        userName: 'Emily Rose',
        timestamp: '12 September 2024 at 19:15',
        comment: 'Great read! My cats definitely show affection in their own unique way.',
      },
      {
        id: 3,
        userName: 'Robert Morino',
        timestamp: '13 September 2024 at 08:22',
        comment: 'Very cool article. I had no idea the history of cats went back so far. Makes me appreciate my furry friend even more.',
      },
    ],
  },
};
