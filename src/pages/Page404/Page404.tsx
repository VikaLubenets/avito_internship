import './Page404.scss';

export default function Page404() {
  return (
    <div className='page__404'>
      <h1 className='text__warning'>Page not found</h1>
      <p className='text__warning'>{`(please check the URL)`}</p>
    </div>
  );
}
