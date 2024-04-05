import './Page404.scss';

export default function Page404() {
  return (
    <div className="page-404">
      <h1 className="text-warning">Page not found</h1>
      <p className="text-warning">{`(please check the URL)`}</p>
    </div>
  );
}