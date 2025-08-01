import { InstagramIcon } from '@/components/icons/instagram-icon';
import { LinkedinIcon } from '@/components/icons/linkedin-icon';
import { CircleDollarSign } from "lucide-react";
import Link from "next/link";
export const Footer = () => {
    const footerLinks = [
        { label: '© RAWDISTRIC SAS 2025', href: '/' },
        { label: 'Track your order', href: '/' },
        { label: 'Privacy Policy', href: '/' },
        { label: 'Shipping Policy', href: '/' },
        { label: 'Frequently Asked Questions (FAQs)', href: '/' },
        { label: 'Exchanges and Returns', href: '/' },
        { label: 'Terms & Conditions', href: '/' },
        { label: 'About', href: '/' },
        { label: 'Contact', href: '/' },
        { label: 'Instagram', href: 'https://www.instagram.com/rawdistic/' },
        { label: 'Linkedin', href: 'https://www.linkedin.com/company/rawdistic/' },
    ];
    return (
        <footer className="w-full flex flex-col items-start border-t gap-16 p-16">
            <div className="flex flex-col md:flex-row w-full gap-y-8 items-start">
                <div className="flex flex-col w-1/2 items-start justify-center gap-2 ">
                    <div>
                        <h1>RAWDISTRIC</h1>
                    </div>
                    <div className="flex gap-4 p-4">
                        <Link href={'https://www.instagram.com/rawdistic/'}>
                            <InstagramIcon width={20} height={20} strokeWidth={1.8}/>
                        </Link>
                        <Link href={'https://www.linkedin.com/company/rawdistic/'}>
                            <LinkedinIcon  width={20} height={20}/>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                    <h3 className="font-medium text-3xl">Contact</h3>
                    <ul className="text-sm">
                        <li>RAWDISTRIC</li>
                        <li>NIT: 000 000 000</li>
                        <li>+57 300 687 0774</li>
                        <li>support@rawdistic.com</li>
                        <li>Dosquebradas, Colombia</li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
                {footerLinks.map((link, index) => (
                    <Link key={index} href={link.href} className="hover:underline">
                        {link.label}
                    </Link>
                ))}
            </div>
            <div className="flex w-full justify-end items-center gap-2">
                <div>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAA7VBMVEX////t6vLLxd6go9CGmcXWz+CCh8FKhMsAitwAnegArvYAvP8Av/8Ajt5Ifsbe2ulSZLIAtvwAwP8Awv8AlOJXbLbj3+uDfrYATbYAw/83br9JcMEAdckAqfIAxv8Aa8qNibxtbLCnqdBUesEAccsAnOgAhdYAW7fo6/UAfdOem8V1ebastNZDQpyTlMNJU6XL0OZVXqrx9/yIlskuMprBvdVDRKEAY7k5esl9i8KjpsoAUq0Atf1ui8soPZ4ANqp7mtKitdyHhbNdb7EAAH26y+Z1bqwAAIUAAHEwW65kj8oAAGsAIZA+OJIqHojeo/tKAAABXElEQVR4AcXRhYHCMAAF0I9LwhVS3B2quLs7+49zaXEW4LVxT/BTFqvNztmsFnxxOF1uj5dQSrwe35/TgRfB7wtQA2NM5EkgGArjLhJlMV4lEnc8EU+mCGOxdCYLU86aLxRLnnLFLwCo8oKUqfhlxRwnmLtRrRqg14wqCwfUdR5k3DSa1YYAQXuuJguI4M6Za8EQquNOR9taxSenCkO400UvJfVtTbzTB2gOuxWpglGMsnFmMGnl1VsXQUVnGnVTMT1CN0AISc8gID9fwNDJQx8zXqthKYmEUE+8A2DFI7UOtdujhIiSDss6xXgriUfqaG5UFdn81sP7s9TaAuhrI0/E8WgVhr2j54teY1xqJ4PL7cvUaI6lDv3gsWwOI9J6C1PkdC6TGLu9CqNMjLnPp1sbV7/s9yOpFDB5y6P1XqvjpZO77vf79W63W+/315wVn5rhfHbJZfPhJn7oH8WJK4f0iacgAAAAAElFTkSuQmCC" alt="mercado pago" />
                </div>
                <div>
                    <CircleDollarSign size={22} strokeWidth={1.5}/>
                </div>
            </div>  
        </footer>
    );
};