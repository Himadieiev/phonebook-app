import Loader from 'components/Loader/Loader';

import css from './LoadingPage.module.css';

const LoadingPage = () => {
  return (
    <div className={css.loadingWrapper}>
      <Loader />
    </div>
  );
};

export default LoadingPage;
