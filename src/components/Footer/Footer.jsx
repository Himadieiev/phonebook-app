import css from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <p className={css.text}>
          <span>© {currentYear} PhoneBook. </span>
          <span>Developed by </span>
          <a
            href="https://github.com/Himadieiev"
            target="_blank"
            rel="noreferrer"
            className={css.link}
          >
            Himadieiev Ruslan
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
