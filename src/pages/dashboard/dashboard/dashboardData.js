export const kpiCards = [
  {
    title: 'Success Rate',
    value: '65%',
    delta: '+12%',
    deltaTone: 'positive',
    iconClass: 'trend',
  },
  {
    title: 'Skills Progress',
    value: '88%',
    delta: '+8%',
    deltaTone: 'info',
    iconClass: 'target',
  },
  {
    title: 'Courses Completed',
    value: '12',
    delta: '+3 this month',
    deltaTone: 'accent',
    iconClass: 'badge',
  },
  {
    title: 'Learning Hours',
    value: '156h',
    delta: '-23 this week',
    deltaTone: 'warning',
    iconClass: 'calendar',
  },
];

export const skillRows = [
  { name: 'React', current: 85, target: 90 },
  { name: 'TypeScript', current: 70, target: 80 },
  { name: 'Node.js', current: 76, target: 84 },
  { name: 'Python', current: 63, target: 80 },
  { name: 'AWS', current: 50, target: 75 },
];

export const recommendations = [
  'Focus on AWS certification to increase job match rate by 15%.',
  'Complete 2 more TypeScript projects to reach your target skill level.',
  'Your interview success rate is high, apply to 5 more positions this week.',
];

export const monthlySeries = {
  applications: '10,122 144,118 278,112 411,104 544,96 678,88',
  interviews: '10,170 144,168 278,164 411,160 544,160 678,164',
  skillLevel: '10,156 144,152 278,148 411,144 544,136 678,130',
};

export const monthlyLabels = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
