import 'server-only';
import type { Biography } from '@/types/biography';

const biography: Biography = {
  id: 'anna-wallace',
  title: 'Hello',
  content: `
    <p>
      I'm Anna Wallace, a researcher, speaker and coach helping people rewrite the stories they tell about
      themselves, so they can build healthier relationships and happier lives.
    </p>
    <br/>
    <p>
      For twenty years I worked in politics and corporate affairs, helping organisations tell their story
      in public. Then a profound personal experience forced me to redefine mine.
    </p>
    <br/>
    <p>
      That journey led me to create A Normal Family podcast and to coaching, where I work with people at
      points of transition who want a supportive space to explore their patterns and move forward. I also
      run events and workshops including for businesses who want to facilitate employee wellness.
    </p>
    <br/>
    <p>
      What connects my work is a mission to help people understand themselves and others with compassion.
      So that they can have better relationships and happier lives.
    </p>
  `,
  image: {
    url: 'https://res.cloudinary.com/dhngfy4p6/image/upload/v1775587122/448CEC65-3B2B-4DF2-B294-1A45ACEA374E_1_105_c_qwppoj.jpg',
    alt: 'Anna Wallace',
  },
};

export async function getBiography(): Promise<Biography> {
  return biography;
}
