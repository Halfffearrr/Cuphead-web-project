/**
 * storyData.js - 故事数据配置
 * 集中管理故事书内容
 */

export const storyData = [
  {
    id: 1,
    title: "Inkwell Isle",
    text: "Once upon a time, in a magical place called Inkwell Isle, there were two brothers named Cuphead and Mugman. They lived without a care under the watchful eye of the wise Elder Kettle.",
    image: "/src/assets/images/story/Screenshot 2025-12-02 132404.jpg",
    fallbackImage: "https://placehold.co/600x400/f4e4bc/5d4037?text=Inkwell+Isle",
    caption: "Elder Kettle's Cottage"
  },
  {
    id: 2,
    title: "The Casino",
    text: "One day they wandered far from home and ended up on the wrong side of the tracks and entered the Devil's Casino.",
    image: "/src/assets/images/story/Screenshot 2025-12-02 132436.jpg",
    fallbackImage: "https://placehold.co/600x400/4a3b32/fff?text=The+Casino",
    caption: "The Wrong Side of the Tracks"
  },
  {
    id: 3,
    title: "A Winning Streak",
    text: '"Hot Dawg!" exclaimed King Dice. "These fellas can\'t lose!" Even the Devil himself came down to watch the show.',
    image: "/src/assets/images/story/Screenshot 2025-12-02 132448.jpg",
    fallbackImage: "https://placehold.co/600x400/221111/f4e4bc?text=Winning+Streak",
    caption: "The Table is Hot!"
  },
  {
    id: 4,
    title: "Snake Eyes",
    text: '"Win one more roll, and the loot is yours!" the Devil boomed. "But lose, and I take your souls!" Cuphead rolled the dice... SNAKE EYES!',
    image: "/src/assets/images/story/Screenshot 2025-12-02 132504.jpg",
    fallbackImage: "https://placehold.co/600x400/000000/d32f2f?text=Snake+Eyes",
    caption: "The Fatal Roll"
  },
  {
    id: 5,
    title: "The Deal",
    text: 'The brothers begged for their lives. "There must be another way!" The Devil grinned. "Collect the contracts of my runaway debtors by midnight, and I might let you keep your heads!"',
    image: "/src/assets/images/story/Screenshot 2025-12-02 132539.jpg",
    fallbackImage: "https://placehold.co/600x400/5d4037/fff?text=The+Deal",
    caption: "A Deal with the Devil"
  }
];

/**
 * 获取故事总数
 */
export function getStoryCount() {
  return storyData.length;
}

/**
 * 根据索引获取故事
 * @param {number} index - 故事索引
 */
export function getStoryByIndex(index) {
  return storyData[index] || null;
}

export default storyData;
