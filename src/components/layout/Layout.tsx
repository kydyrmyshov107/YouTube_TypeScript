import TodoListYouTude from "../todoLilstYouTude/TodoListYouTude";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import scss from "./Layout.module.scss";

const Layout = () => {
  return (
    <div className={scss.Layout}>
      <Header />
      <hr />
      <main>
        <TodoListYouTude />
      </main>
      <hr />
      <Footer />
    </div>
  );
};

export default Layout;
