import { useNavigate } from 'react-router-dom';
import SyntheticHero from '@/components/ui/synthetic-hero';

export default function Onboarding() {
    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen flex flex-col relative bg-black">
            <SyntheticHero
                title="CodeFixer IDE"
                description="Your intelligent coding companion. Analyze, debug, and optimize your code with advanced AI models in real-time."
                badgeText="AI Powered Debugging"
                badgeLabel="New"
                ctaButtons={[
                    {
                        text: "Get Started",
                        primary: true,
                        onClick: () => navigate('/app')
                    },
                    {
                        text: "View on GitHub",
                        href: "https://github.com/omar-h-Hashmi-rgb/web_debugger_ide"
                    }
                ]}
                microDetails={[
                    "Powered by Groq Llama 3",
                    "Real-time Analysis",
                    "Multi-language Support",
                    "Secure & Private"
                ]}
            />
        </div>
    );
}
