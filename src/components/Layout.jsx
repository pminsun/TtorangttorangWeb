import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <section className="root_layout">{children}</section>
      <Footer />
    </>
  );
}
