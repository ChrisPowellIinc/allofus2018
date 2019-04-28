import m from "mithril";
import Footer from "components/homefooter";
import Modal from "components/modal";

var Shell = {
  view: vnode => {
    const { children } = vnode;
    return (
      <section class="h-100">
        <Modal />
        {children}
        <Footer />
      </section>
    );
  }
};

export default Shell;
