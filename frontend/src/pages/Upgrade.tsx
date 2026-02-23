import React, { useState } from 'react';
import { Check, Star, Zap, ShieldCheck, Users } from 'lucide-react';
import api from '../lib/api';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/ forever',
    description: 'Get started with core course content',
    features: [
      'All free chapters',
      'Quizzes & progress tracking',
      'Community access',
    ],
    cta: 'Current Plan',
    highlighted: false,
    disabled: true,
  },
  {
    name: 'Premium',
    price: '$9.99',
    period: '/ month',
    description: 'Unlock AI-powered assessments',
    features: [
      'Everything in Free',
      'AI-Graded Assessments',
      'Premium chapters',
      'Certificate of Completion',
    ],
    cta: 'Upgrade to Premium',
    highlighted: false,
    disabled: false,
  },
  {
    name: 'Pro',
    price: '$19.99',
    period: '/ month',
    description: 'Full adaptive learning experience',
    features: [
      'Everything in Premium',
      'Adaptive Study Paths',
      'Priority Support',
      'Early access to new features',
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
    disabled: false,
  },
  {
    name: 'Team',
    price: '$49.99',
    period: '/ month',
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Team dashboard & analytics',
      'Bulk seat management',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    highlighted: false,
    disabled: false,
  },
];

const Upgrade: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUpgrade = async (tierName: string) => {
    setLoading(tierName);
    try {
      await api.post('/users/upgrade', { tier: tierName.toLowerCase() });
      setSuccess(true);
    } catch (err) {
      console.error('Upgrade failed', err);
    } finally {
      setLoading(null);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-card border rounded-3xl p-12 text-center shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Welcome to Premium!</h1>
          <p className="text-muted-foreground mb-8 text-lg">Your account has been upgraded. You now have full access to Hybrid Intelligence features.</p>
          <a href="/" className="inline-block w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl hover:opacity-90 transition-all">
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 py-20">
      <header className="text-center mb-16">
        <span className="text-primary font-bold tracking-widest text-sm uppercase mb-4 inline-block">Pricing</span>
        <h1 className="text-5xl font-extrabold tracking-tight mb-6">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Master AI Agent Development with personalized feedback and adaptive learning paths.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-3xl p-8 flex flex-col ${
              tier.highlighted
                ? 'bg-primary text-primary-foreground shadow-2xl scale-105 relative'
                : 'bg-card border shadow-sm'
            }`}
          >
            {tier.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full">
                Most Popular
              </div>
            )}
            <h2 className="text-xl font-bold mb-1">{tier.name}</h2>
            <p className={`text-sm mb-4 ${tier.highlighted ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
              {tier.description}
            </p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black">{tier.price}</span>
              <span className={`text-sm font-medium ${tier.highlighted ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                {tier.period}
              </span>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm font-medium">
                  <Check className={`w-4 h-4 shrink-0 ${tier.highlighted ? 'text-primary-foreground/60' : 'text-primary'}`} />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => !tier.disabled && handleUpgrade(tier.name)}
              disabled={tier.disabled || loading === tier.name}
              className={`w-full py-4 rounded-2xl font-bold transition-all ${
                tier.highlighted
                  ? 'bg-background text-primary hover:bg-opacity-90 shadow-lg'
                  : tier.disabled
                    ? 'bg-secondary text-muted-foreground cursor-default'
                    : 'bg-primary text-primary-foreground hover:opacity-90'
              }`}
            >
              {loading === tier.name ? 'Processing...' : tier.cta}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-muted-foreground font-medium">
        Cancel anytime. 7-day money back guarantee on all paid plans.
      </p>
    </div>
  );
};

export default Upgrade;
