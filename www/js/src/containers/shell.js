import m from "mithril";
import Footer from "components/homefooter";
import Modal from "components/modal";

var Shell = {
  view: vnode => {
    const { children } = vnode;
    return (
      <section>
        <Modal />
        <section>{children}</section>
        <Footer />
      </section>
    );
  }
};

export default Shell;
