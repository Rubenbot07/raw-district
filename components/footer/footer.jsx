import { InstagramIcon } from '@/components/icons/instagram-icon';
import { LinkedinIcon } from '@/components/icons/linkedin-icon';
import { CircleDollarSign } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const Footer = () => {
  const t = useTranslations("Footer");
  const tAriaLabel = useTranslations("AriaLabel");

  const footerLinks = [
    { label: t("copyright"), href: "/" },
    { label: t("trackOrder"), href: "/" },
    { label: t("privacyPolicy"), href: "/" },
    { label: t("shippingPolicy"), href: "/" },
    { label: t("faqs"), href: "/" },
    { label: t("exchangesReturns"), href: "/" },
    { label: t("termsConditions"), href: "/" },
    { label: t("about"), href: "/" },
    { label: t("contact"), href: "/" },
    { label: t("instagram"), href: "https://www.instagram.com/rubenbot77/" },
    { label: t("linkedin"), href: "https://www.linkedin.com/in/ruben-dario-botero-mazo-383573364" }
  ];

  return (
    <footer className="w-full flex flex-col items-start border-t gap-16 p-16" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">{t("title")}</h2>

      <div className="flex flex-col md:flex-row w-full gap-y-8 items-start">
        {/* Marca y redes */}
        <div className="flex flex-col w-1/2 items-start justify-center gap-2">
          <div>
            <h1 className="text-xl font-bold">RAWDISTRIC</h1>
          </div>
          <div className="flex gap-4 p-4" aria-label={tAriaLabel("socialMediaLinks")}>
            <Link href="https://www.instagram.com/rubenbot77/" aria-label="RAWDISTRIC on Instagram">
              <InstagramIcon width={20} height={20} strokeWidth={1.8} aria-hidden="true" />
            </Link>
            <Link href="https://www.linkedin.com/in/ruben-dario-botero-mazo-383573364" aria-label="RAWDISTRIC on LinkedIn">
              <LinkedinIcon width={20} height={20} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Contacto */}
        <address className="flex flex-col gap-2 w-1/2 not-italic text-sm" aria-label={tAriaLabel("companyContactInfo")}>
          <h3 className="font-medium text-3xl">{t("contact")}</h3>
          <ul className="text-sm space-y-1">
            <li>RAWDISTRIC</li>
            <li>NIT: 000 000 000</li>
            <li><a href="https://wa.me/3006870774" target="_blank" className="hover:underline">+57 300 687 0774</a></li>
            <li><a href="mailto:support@rawdistic.com" className="hover:underline">support@rawdistic.com</a></li>
            <li>Dosquebradas, Colombia</li>
          </ul>
        </address>
      </div>

      {/* Links generales */}
      <nav aria-label={tAriaLabel("footerNav")} className="w-full">
        <ul className="flex flex-wrap gap-4 text-xs">
          {footerLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.href} className="hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Pagos y garantía */}
      <div className="flex w-full justify-end items-center gap-2">
        <div>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAA7VBMVEX////t6vLLxd6go9CGmcXWz+CCh8FKhMsAitwAnegArvYAvP8Av/8Ajt5Ifsbe2ulSZLIAtvwAwP8Awv8AlOJXbLbj3+uDfrYATbYAw/83br9JcMEAdckAqfIAxv8Aa8qNibxtbLCnqdBUesEAccsAnOgAhdYAW7fo6/UAfdOem8V1ebastNZDQpyTlMNJU6XL0OZVXqrx9/yIlskuMprBvdVDRKEAY7k5esl9i8KjpsoAUq0Atf1ui8soPZ4ANqp7mtKitdyHhbNdb7EAAH26y+Z1bqwAAIUAAHEwW65kj8oAAGsAIZA+OJIqHojeo/tKAAABXElEQVR4AcXRhYHCMAAF0I9LwhVS3B2quLs7+49zaXEW4LVxT/BTFqvNztmsFnxxOF1uj5dQSrwe35/TgRfB7wtQA2NM5EkgGArjLhJlMV4lEnc8EU+mCGOxdCYLU86aLxRLnnLFLwCo8oKUqfhlxRwnmLtRrRqg14wqCwfUdR5k3DSa1YYAQXuuJguI4M6Za8EQquNOR9taxSenCkO400UvJfVtTbzTB2gOuxWpglGMsnFmMGnl1VsXQUVnGnVTMT1CN0AISc8gID9fwNDJQx8zXqthKYmEUE+8A2DFI7UOtdujhIiSDss6xXgriUfqaG5UFdn81sP7s9TaAuhrI0/E8WgVhr2j54teY1xqJ4PL7cvUaI6lDv3gsWwOI9J6C1PkdC6TGLu9CqNMjLnPp1sbV7/s9yOpFDB5y6P1XqvjpZO77vf79W63W+/315wVn5rhfHbJZfPhJn7oH8WJK4f0iacgAAAAAElFTkSuQmCC"
            alt="Mercado Pago Logo"
          />
        </div>
        <div>
          <CircleDollarSign size={22} strokeWidth={1.5} aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
};