
import { Symptom, InsightArticle } from './types';

export const THEME_COLORS = {
  primary: '#ff5c8d', // Flo Pink
  primaryLight: '#ffe4ea',
  secondary: '#6b4c9a', // Deep Purple
  bg: '#f8f4fc',
  period: '#ff5c8d',
  ovulation: '#3cdbc0', // Teal
  fertile: '#b2f2e8',
};

export const MOCK_SYMPTOMS: Symptom[] = [
  { id: 'cramps', name: 'Cramps', icon: 'zap', category: 'physical' },
  { id: 'headache', name: 'Headache', icon: 'frown', category: 'physical' },
  { id: 'bloating', name: 'Bloating', icon: 'wind', category: 'physical' },
  { id: 'acne', name: 'Acne', icon: 'meh', category: 'physical' },
  { id: 'happy', name: 'Happy', icon: 'smile', category: 'mood' },
  { id: 'sad', name: 'Sad', icon: 'frown', category: 'mood' },
  { id: 'mood_swings', name: 'Mood Swings', icon: 'refresh-cw', category: 'mood' },
  { id: 'fatigue', name: 'Fatigue', icon: 'battery-low', category: 'physical' },
  { id: 'egg_white', name: 'Egg white', icon: 'droplet', category: 'discharge' },
  { id: 'sticky', name: 'Sticky', icon: 'cloud', category: 'discharge' },
];

export const INSIGHTS: InsightArticle[] = [
  {
    id: '1',
    title: 'Why do I crave chocolate before my period?',
    category: 'Nutrition',
    imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=400&h=200&q=80',
    readTime: '3 min read',
    content: `You're not imagining it—pre-period chocolate cravings are a real biological phenomenon reported by nearly half of all menstruating women. But why does this specific craving hit so hard in the days leading up to menstruation? The answer lies in a complex interplay of hormones, neurotransmitters, and nutritional needs.

1. The Serotonin Connection
One of the primary drivers is the fluctuation of neurotransmitters. During the luteal phase (the week before your period), your levels of serotonin—the "feel-good" hormone—drop significantly. Carbohydrates and sugars help boost serotonin production. Chocolate is particularly effective because it contains both sugar and fat, making it a potent comfort food that temporarily lifts your mood and combats the premenstrual blues.

2. Magnesium Deficiency
Cocoa is one of nature's best sources of magnesium. Interestingly, magnesium levels often dip during the luteal phase. Magnesium is crucial for muscle relaxation and energy production. A deficiency can contribute to cramps, fatigue, and irritability. Your body might be intuitively signaling you to consume chocolate to replenish this vital mineral. If you find yourself craving chocolate intensely, opting for dark chocolate (70% cocoa or higher) is a great strategy because it contains significantly more magnesium and less sugar than milk chocolate.

3. Hormonal Fluctuations
As estrogen and progesterone levels plummet to trigger the start of your period, your body enters a state of high metabolic demand. Your resting metabolic rate actually increases slightly before your period, meaning you burn more calories at rest. This increase in energy expenditure can lead to an increase in appetite. Combined with the emotional rollercoaster of PMS, high-calorie, palatable foods like chocolate become incredibly appealing.

How to Manage the Cravings
There is no need to fight the craving entirely. Depriving yourself often leads to bingeing later. Instead, practice mindful indulgence:
- Choose Quality: Reach for a square or two of high-quality dark chocolate.
- Pair it: Eat your chocolate with a handful of almonds or berries. The fiber and protein will help stabilize your blood sugar, preventing the "sugar crash" that often follows a sweet treat.
- Check your Diet: Ensure you are getting enough complex carbohydrates (like oats, quinoa, and sweet potatoes) and magnesium-rich foods (leafy greens, nuts, seeds) throughout the day to keep your baseline levels stable.

Understanding that your craving is a biological signal rather than a lack of willpower can help you navigate your cycle with more self-compassion.`
  },
  {
    id: '2',
    title: 'Understanding your fertile window',
    category: 'Fertility',
    imageUrl: 'https://images.unsplash.com/photo-1470163395405-d2b80e7450ed?auto=format&fit=crop&w=400&h=200&q=80',
    readTime: '5 min read',
    content: `Whether you are trying to conceive or trying to avoid pregnancy, understanding your fertile window is one of the most empowering pieces of knowledge you can have about your body. The menstrual cycle is often simplified to a 28-day loop, but the window for conception is actually quite narrow.

What is the Fertile Window?
The fertile window consists of the days in your menstrual cycle when pregnancy is possible. Technically, an egg only survives for 12 to 24 hours after it is released from the ovary (ovulation). However, sperm are much more resilient—they can survive in the female reproductive tract for up to 5 days under the right conditions.
Therefore, your fertile window is typically defined as the 5 days leading up to ovulation, plus the day of ovulation itself. This gives a total window of about 6 days.

Identifying Ovulation
Since the fertile window closes shortly after ovulation, predicting when ovulation happens is key. Here are the primary signs:
- Cervical Mucus: As you approach ovulation, rising estrogen levels change your cervical mucus. It becomes clear, slippery, and stretchy, often resembling raw egg whites. This consistency is designed to help sperm swim and survive.
- Basal Body Temperature (BBT): Your resting body temperature rises slightly (about 0.5 to 1 degree Fahrenheit) right after ovulation due to the production of progesterone. Tracking this over months can help you confirm that you are ovulating, though it tells you after the fact.
- Ovulation Pain (Mittelschmerz): Some women feel a sharp or dull ache on one side of their lower abdomen when the egg is released.
- Libido: Many women notice an increase in sex drive just before ovulation, which is nature's way of encouraging reproduction.

The Timing Myth
A common misconception is that ovulation always occurs on Day 14. This is only true for a perfect 28-day cycle. If you have a 32-day cycle, you likely ovulate around Day 18. If you have a 24-day cycle, you might ovulate as early as Day 10. This variability is why apps and trackers that rely solely on calendar math can be inaccurate for individuals with irregular cycles.

Tips for Conception
If you are trying to conceive, doctors generally recommend having intercourse every 1 to 2 days during your fertile window. You do not need to wait for the exact moment of ovulation; in fact, having sperm "waiting" in the fallopian tubes before the egg is released yields the highest pregnancy rates.

By tracking your physical symptoms alongside your calendar, you can pinpoint this golden window with much greater accuracy.`
  },
  {
    id: '3',
    title: '5 Yoga poses for cramp relief',
    category: 'Fitness',
    imageUrl: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&w=400&h=200&q=80',
    readTime: '4 min read',
    content: `Menstrual cramps (dysmenorrhea) can range from a mild annoyance to debilitating pain. While heating pads and medication are common go-to solutions, gentle movement can also provide significant relief. Yoga, in particular, combines physical stretching with deep breathing, helping to increase blood flow to the pelvic region and relax the nervous system.

Here are 5 beginner-friendly poses specifically chosen to alleviate menstrual pain:

1. Child’s Pose (Balasana)
This is a quintessential resting pose.
- How to do it: Kneel on the floor with your big toes touching and knees spread wide apart. Sit back on your heels and fold forward, resting your forehead on the mat. Extend your arms forward or rest them alongside your body.
- Why it helps: It gently stretches the lower back muscles, which often tighten up during menstruation, and compresses the abdomen slightly to offer a gentle, soothing massage to the reproductive organs.

2. Cat-Cow Stretch (Marjaryasana-Bitilasana)
- How to do it: Start on your hands and knees. Inhale as you drop your belly towards the floor and look up (Cow). Exhale as you round your spine towards the ceiling, tucking your chin (Cat). Move slowly with your breath.
- Why it helps: This dynamic movement warms up the spine and improves circulation in the pelvic area, helping to reduce stagnation and cramping.

3. Reclined Bound Angle Pose (Supta Baddha Konasana)
- How to do it: Lie on your back. Bring the soles of your feet together and let your knees fall open to the sides. You can place pillows under your knees for support. Place one hand on your heart and one on your belly.
- Why it helps: This pose opens the hips and groins, relieving tension in the pelvic floor. It is deeply restorative and signals your parasympathetic nervous system to relax, which can reduce pain perception.

4. Supine Twist (Supta Matsyendrasana)
- How to do it: Lie on your back and hug your knees into your chest. Drop both knees over to the left side while extending your right arm out to the side. Look towards your right hand. Hold for several breaths, then switch sides.
- Why it helps: Twists helps to "wring out" tension in the lower back and abdomen. They stimulate the digestive organs, which can also help with period-related bloating.

5. Legs Up the Wall (Viparita Karani)
- How to do it: Sit sideways next to a wall, then swing your legs up the wall as you lie back. Your butt should be close to the wall. Rest your arms by your sides and close your eyes.
- Why it helps: This inversion improves circulation and lymphatic drainage. It takes pressure off the lower back and legs, reducing the heavy, aching sensation that often accompanies a period.

Remember to listen to your body. During your period, the goal isn't to push for flexibility or strength, but to find ease and release tension. If a pose hurts, ease out of it.`
  }
];
