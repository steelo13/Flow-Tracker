
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
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&h=200&q=80',
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
  },
  {
    id: '4',
    title: 'Reproductive Health 101',
    category: 'Reproductive Health',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&h=200&q=80',
    readTime: '6 min read',
    content: `Understanding your reproductive health is the foundation of overall well-being. It is not just about pregnancy or menstruation; it encompasses the complete physical, mental, and social well-being of your reproductive system. Here is a comprehensive guide to what you should know.

1. The Anatomy of Health
Your reproductive system involves complex interactions between your ovaries, fallopian tubes, uterus, and vagina, regulated by hormones like estrogen and progesterone. Knowing your anatomy empowers you to spot irregularities. For instance, discharge is normal, but changes in color, odor, or consistency can indicate infections like yeast or bacterial vaginosis.

2. Cycle Regularity
A "normal" cycle isn't always 28 days. Cycles ranging from 21 to 35 days are considered healthy. However, consistency matters. Irregular periods can be a sign of conditions like Polycystic Ovary Syndrome (PCOS), thyroid issues, or extreme stress. Tracking your cycle isn't just for family planning; it is a vital sign of your general health.

3. Pain Signals
While mild cramping is common, debilitating pain is not normal. Conditions like Endometriosis and Fibroids often go undiagnosed for years because women are told their pain is "part of being a woman." If your period pain stops you from daily activities, it warrants a conversation with a healthcare provider.

4. Preventive Care
Regular check-ups are crucial. Pap smears screen for cervical cancer, often caused by HPV. Breast exams, both self-exams and clinical ones, detect early abnormalities. STD testing is also a critical component of reproductive health, regardless of relationship status.

5. Mental Health Connection
Your hormones deeply influence your mood. Premenstrual Dysphoric Disorder (PMDD) is a severe form of PMS that requires medical attention. Understanding the link between your cycle and your mental state can help you manage symptoms effectively.

Taking charge of your reproductive health means listening to your body, tracking your symptoms, and advocating for yourself in medical settings. It is a lifelong journey of learning and care.`
  },
  {
    id: '5',
    title: 'Sex & Relationships: Intimacy and Your Cycle',
    category: 'Sex & Relationships',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&h=200&q=80',
    readTime: '5 min read',
    content: `Intimacy changes throughout the month, and that is perfectly natural. Your menstrual cycle dictates a hormonal rhythm that influences your libido, energy, and emotional needs. Syncing your relationship with your cycle can lead to deeper connection and better understanding.

1. The Follicular Phase: New Energy
After your period ends, estrogen starts to rise. This is often when women feel most energetic, confident, and open to connection. It is a great time for date nights, trying new things in the bedroom, and having important relationship conversations. You are likely to feel more social and flirtatious during this window.

2. Ovulation: Peak Desire
Nature is clever. Right around ovulation, testosterone spikes alongside estrogen. For many women, this results in the highest libido of the month. Biologically, your body is primed for reproduction, making physical intimacy more appealing and often more pleasurable. Pheromones are also at their peak, making you subconsciously more attractive to your partner.

3. The Luteal Phase: Turning Inward
As progesterone rises after ovulation, your energy may dip. You might desire more emotional intimacy—cuddling, deep talks, and comfort—rather than high-energy activities. This is the "nesting" phase. Understanding this shift helps avoid conflict; you aren't "losing interest," your body is simply shifting gears towards rest and nurturing.

4. Menstruation: Comfort and Care
During your period, desire varies wildly. Some women experience increased arousal due to pelvic congestion (increased blood flow), while others want zero physical touch. Open communication is key here. Partners can support this phase with non-sexual intimacy: massages, hot water bottles, and simply being present.

5. Communication Tools
Using a cycle tracker app (like this one!) and sharing it with your partner can demystify these changes. Instead of guessing why you are feeling distant or hyper-affectionate, you can point to where you are in your cycle.

Embracing these seasonal shifts in your body allows you to navigate intimacy with grace, reducing pressure and increasing genuine connection.`
  },
  {
    id: '6',
    title: 'Pregnancy: The First Trimester Guide',
    category: 'Pregnancy',
    imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=400&h=200&q=80',
    readTime: '5 min read',
    content: `The first trimester of pregnancy (Weeks 1-12) is a time of incredible transformation. While your baby bump might not be showing yet, your body is working overtime to create a life support system. Here is what to expect physically and emotionally.

1. The Hormone Surge
Human Chorionic Gonadotropin (hCG) is the hormone responsible for that positive line on the test. It rises rapidly, triggering estrogen and progesterone production. This cocktail supports the baby but causes the hallmark symptoms: nausea ("morning sickness"), fatigue, and breast tenderness.

2. Nausea and Fatigue
Morning sickness can strike at any time of day. It is caused by low blood sugar and hormonal shifts. Eating small, frequent meals with protein and complex carbs helps. Fatigue in the first trimester is unlike any other tired—it is bone-deep exhaustion. Your body is growing a placenta, which is a massive energy drain. Listen to your body and sleep when you can.

3. Emotional Rollercoaster
Joy, anxiety, fear, and excitement often coexist. It is normal to feel overwhelmed. The reality of parenthood is setting in, and hormonal mood swings can amplify these feelings. Ensure you have a support system to talk to.

4. Critical Development
By week 6, the baby's heart is beating. By week 8, fingers and toes form. By week 12, the fetus is fully formed, just tiny. This rapid development is why prenatal vitamins with Folic Acid are non-negotiable—they prevent neural tube defects which happen in these very early weeks.

5. Red Flags
While spotting can be normal (implantation bleeding), heavy bleeding or severe cramping requires immediate medical attention to rule out ectopic pregnancy or miscarriage. Always trust your instincts and call your doctor if something feels "off."

The first trimester is often a quiet struggle, as many choose not to share news until the 12-week mark. Be gentle with yourself. You are doing the invisible, hard work of creating life.`
  },
  {
    id: '7',
    title: 'Nutrition: Eating for Hormonal Balance',
    category: 'Nutrition',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&h=200&q=80',
    readTime: '4 min read',
    content: `Food is information for your cells. What you eat directly impacts your hormone production, cycle regularity, and symptom severity. "Cycle syncing" your nutrition involves eating foods that support your body's changing needs throughout the month.

1. Menstrual Phase (Days 1-5): Replenish Iron
You are losing blood, and with it, iron. Focus on iron-rich foods like red meat, lentils, spinach, and kidney beans. Pair these with Vitamin C (oranges, peppers) to boost absorption. Warm, comforting stews and soups are easier to digest during this time when energy is low.

2. Follicular Phase (Days 6-14): Fresh and Light
As estrogen rises, you have more energy. Focus on fermented foods like kimchi and yogurt to support gut health, which is crucial for metabolizing estrogen. Fresh salads, lean proteins like chicken, and seeds (flax and pumpkin) are excellent choices to fuel this high-energy phase.

3. Ovulatory Phase (Days 15-17): Anti-Inflammatory
Estrogen is at its peak. To help your liver process this surplus, eat cruciferous vegetables like broccoli, kale, and brussels sprouts. Berries and turmeric are great anti-inflammatory additions to help with the slight swelling or bloating that can accompany ovulation.

4. Luteal Phase (Days 18-28): Stabilize Blood Sugar
This is when cravings hit. Progesterone is dominant, raising your metabolism but also destabilizing blood sugar. Focus on complex carbs: sweet potatoes, brown rice, and oats. Magnesium-rich foods like dark chocolate, avocados, and bananas help combat water retention and mood dips. Avoid excess salt and caffeine to reduce PMS severity.

5. Hydration
Water is the unsung hero of hormonal balance. Dehydration increases cortisol (stress hormone) levels, which can disrupt ovulation. Aim for at least 2 liters a day, more if you are active.

By viewing food as fuel for your hormones, you can reduce PMS symptoms and maintain steadier energy levels all month long.`
  },
  {
    id: '8',
    title: 'Fitness: Syncing Workouts to Your Cycle',
    category: 'Fitness',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&h=200&q=80',
    readTime: '5 min read',
    content: `Pushing for a personal best (PB) during every workout isn't always biologically optimal. Your menstrual cycle affects your strength, endurance, and injury risk. tailoring your exercise intensity to your phase can yield better results and prevent burnout.

1. Menstruation: Rest and Restore
Your hormones are at their lowest levels. Energy is likely low.
- Best Activities: Walking, Yin Yoga, gentle stretching, or complete rest.
- Why: High-intensity work now can increase cortisol, potentially prolonging inflammation. Respect the need for recovery.

2. Follicular Phase: Build Strength
Estrogen is rising, and with it, your pain tolerance and muscle recovery speed. Your body is primed to build muscle.
- Best Activities: Heavy weightlifting, HIIT (High-Intensity Interval Training), boxing, sprinting.
- Why: Your body accesses stored carbohydrates (glycogen) more efficiently now, fueling high-power activities.

3. Ovulation: Peak Performance
You are at your physiological peak. Energy and strength are high.
- Best Activities: Attempting PRs (Personal Records), intense spin classes, competitive sports.
- Why: Testosterone provides an extra kick of strength. *Caution*: Estrogen can make ligaments slightly laxer (looser), so be mindful of form to prevent knee injuries (ACL tears are statistically more common in this phase).

4. Luteal Phase: Endurance and Maintenance
Progesterone rises, raising your body temperature and heart rate. Exercise feels harder than usual.
- Best Activities: LISS (Low-Intensity Steady State cardio), Pilates, moderate strength training with lower weights and higher reps.
- Why: Your body switches to burning fat for fuel more easily than carbs. Long, slow runs or hikes feel better than sprints. As you approach your period, scale back intensity to reduce stress on the body.

Listening to your body isn't about being "lazy"; it is about working with your physiology rather than against it. This approach leads to sustainable fitness and hormonal health.`
  }
];
