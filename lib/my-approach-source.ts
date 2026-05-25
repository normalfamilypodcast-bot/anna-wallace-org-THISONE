import 'server-only';

const MY_APPROACH: MyApproachItem[] = [
  {
    id: '1',
    title: 'Compassion First',
    description: 'No blame, only compassion for everyone involved. I stay humble knowing that people are opening their hearts, and I provide a safe space for them to do so.',
  },
  {
    id: '2',
    title: 'Genuine Curiosity',
    description: 'I approach every story with genuine interest and respect, asking questions rather than making assumptions. Every perspective has value.',
  },
  {
    id: '3',
    title: 'Growth Mindset',
    description: 'I believe we share to grow and to teach others. Every story is an opportunity to learn something about ourselves and the world around us.',
  },
  {
    id: '4',
    title: 'Clear Communication',
    description: 'I use language that people can understand and relate to—human, compassionate, with a global mindset. No jargon, just connection.',
  },
];

export async function getMyApproaches(): Promise<MyApproachItem[]> {
  return MY_APPROACH;
}
