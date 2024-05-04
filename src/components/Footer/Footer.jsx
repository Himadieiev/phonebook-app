import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <p className={css.text}>
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
    </footer>
  );
};

export default Footer;
